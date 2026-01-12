import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";

export const nextjsSandbox = inngest.createFunction(
  { id: "nextjs-sandbox" },
  { event: "test/agent" },
  async ({ event, step }) => {
    const sandbox = await Sandbox.create("luma-test-nextjs-app");

    await step.sleep("wait-a-moment", "5s");
    const codeWriterAgent = createAgent({
      name: "Code writer",
      system:
        "You are an expert frontend programmer" +
        "What prompt you will get, you will generate a nextjs component snippet out of it " +
        "example : create a butt",
      model: gemini({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
      }),
    });
    const { output } = await codeWriterAgent.run(event.data.prompt);
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    console.log(event.data);
    return { output, sandboxUrl };
  }
);
