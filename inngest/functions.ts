import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/agent" },
  async ({ event, step }) => {
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

    console.log(event.data);
    return { output };
  }
);
