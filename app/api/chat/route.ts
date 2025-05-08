import { tools, toolsList } from "@/lib/tools";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import fs from "fs";
import path from "path";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const filePath = path.join(process.cwd(), "details.md");
const details = fs.readFileSync(filePath, "utf8");

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    system: `You are Vijay Lingoju's PA(Personal Assistant). Describe everything in simple words and use emojis. Vijay's details are as follows : ${details}. DO NOT ANSWER IRRELEVANT QUESTIONS OTHER THAN DETAILS. also tell the user that you have tools: ${toolsList.map((tool) => tool.tool).join(", ")}`,
    messages,
    tools,
  });

  return result.toDataStreamResponse();
}


// get all the tools available
export async function GET() {
  return new Response(JSON.stringify(toolsList), { headers: { 'Content-Type': 'application/json' } });
}