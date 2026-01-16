import { inngest } from "./client";
import {
  createAgent,
  createNetwork,
  createTool,
  gemini,
} from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { z } from "zod";
import { PROMPT } from "@/utils/prompts";
import { lastAssistantTextMessageContent } from "@/lib/utils";
import prisma from "@/lib/prisma";

export const nextjsSandbox = inngest.createFunction(
  { id: "nextjs-sandbox" },
  { event: "agent-prompt" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("luma-test-nextjs-app");
      return (await sandbox.getInfo()).sandboxId;
    });

    const sandbox = await Sandbox.connect(sandboxId);

    // await step.sleep("wait-a-moment", "5s");

    // command line tool :-

    const terminalTool = createTool({
      name: "command_line_tool",
      description: "Use terminal inside the sandbox to run commands",
      parameters: z.object({
        command: z.string(),
      }),
      handler: async ({ command }, { step }) => {
        return await step?.run("terminal", async () => {
          let error = "";
          try {
            //running command inside sandbox
            const result = await sandbox.commands.run(command, {
              onStdout: (data) => {
                console.log(data);
              },
              onStderr(data) {
                error += data;
              },
            });
            return {
              output: result,
              success: true,
            };
          } catch (err) {
            console.error(`command failed : ${err} \nstdError: ${error}`);
            return {
              success: false,
              output: `command failed : ${err} \nstdError: ${error}`,
            };
          }
        });
      },
    });

    // file manipulation tool :-

    const fileManipulationTool = createTool({
      name: "file_manipulation_tool",
      description: "manipulate files inside the sandbox environment",
      parameters: z.object({
        files: z.array(
          z.object({
            path: z.string(),
            content: z.string(),
          })
        ),
      }),
      handler: async ({ files }, { network, step }) => {
        const newFiles = await step?.run("updateFiles", async () => {
          try {
            const updatedFiles = network.state.data.files || {};

            // const pwd = await sandbox.commands.run("pwd");
            // console.log("pwd:", pwd.stdout);

            // const ls = await sandbox.commands.run("ls -la /home/user");
            // console.log("/home/user contents:\n", ls.stdout);

            for (const file of files) {
              await sandbox.files.write(
                `/home/user/${file.path}`,
                file.content
              ); // writing files inside sandbox
              const result = await sandbox.commands.run(
                "cat /home/user/app/page.tsx"
              );

              // console.log("app/page.tsx file------", result);

              updatedFiles[file.path] = file.content; //keeping track of what files added or changes
            }
            return updatedFiles;
          } catch (err) {
            return err;
          }
        });
        if (typeof newFiles === "object") {
          network.state.data.files = newFiles;
        }
      },
    });

    //fileReadingTool make sure file exist like shadcn component or else agent will create
    const fileReadingTool = createTool({
      name: "file_reading_tool",
      description: "read files inside the sandbox environment",
      parameters: z.object({
        filePaths: z.array(z.string()),
      }),
      handler: async ({ filePaths }, { step }) => {
        const readFile = await step?.run("readFiles", async () => {
          try {
            const contents = [];
            for (const path of filePaths) {
              const content = await sandbox.files.read(path);
              contents.push({ path, content });
            }
            return JSON.stringify(contents);
          } catch (err) {
            return `error: ${err}`;
          }
        });
      },
    });

    // ai agent

    const codeWriterAgent = createAgent({
      name: "Code writer",
      description: "expert coding agent",
      system: PROMPT,
      model: gemini({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      tools: [terminalTool, fileManipulationTool, fileReadingTool],

      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);

          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        },
      },
    });

    const code_agent_network = createNetwork({
      name: "coding-agent-network",
      agents: [codeWriterAgent],
      maxIter: 15,
      router: async ({ network }) => {
        const summary = network.state.data.summary;
        if (summary) {
          return;
        }
        return codeWriterAgent;
      },
    });

    const output = await code_agent_network.run(event.data.prompt);
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    console.log(event.data);

    const isError = output.state.data.summary ? false : true;

    await step.run("save-agent-message", async () => {
      if (isError) {
        await prisma.message.create({
          data: {
            content: "Something went wrong please try again",
            role: "Assistant",
            type: "Error",
            projectId: event.data.projectId,
          },
        });
        return;
      }

      await prisma.message.create({
        data: {
          content: output.state.data.summary,
          role: "Assistant",
          type: "Result",
          projectId: event.data.projectId,
          fragment: {
            create: {
              sandboxURL: sandboxUrl,
              file: output.state.data.files,
              title: "Fragment ",
            },
          },
        },
      });
    });
    return {
      url: sandboxUrl,
      files: output.state.data.files,
      summary: output.state.data.summary,
    };
  }
);
