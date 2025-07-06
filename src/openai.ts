import { config } from "dotenv";
import { OpenAI } from "openai";

config(); // load environment variables from .env file

const openai = new OpenAI({
  apiKey: process.env.GIT_HUB_TOKEN,
  baseURL: process.env.END_POINT,
});

// this function sends a message to GTP and gets a reply

export async function askGPT(question: string): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    model: process.env.MODEL || "openai/gpt-4.1",
    messages: [{ role: "user", content: question }],
  });

  return chatCompletion.choices[0].message.content || "No response";
}
