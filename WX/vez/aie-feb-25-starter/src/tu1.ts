/* 
tu1.ts - These are all the functions being written from the tutorial 
*/

// --- Imports Zone ---

import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import chalk from "chalk"
import "dotenv/config"
import { printTutorialHeader } from "./wm"

// --- Main Function Call ---

export async function t1_main() {
  t1_func1()
}

// --- Sub Function called

async function t1_func1() {
  printTutorialHeader("t1_func1", "t1_func1")

  const modelz = groq("compound-beta")
  const quez = "When was the AI engineer summit 2025"

  const result = await generateText({
    model: modelz,
    messages: [
      {
        role: "user",
        content: quez,
      },
    ],
  })
  console.log(chalk.greenBright(result.text))
}
