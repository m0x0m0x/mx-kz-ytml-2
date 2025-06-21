/* 
tu1.ts - These are all the functions being written from the tutorial 
*/

// --- Imports Zone ---

import { google } from "@ai-sdk/google"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import boxen from "boxen"
import chalk from "chalk"
import "dotenv/config"
import { printTutorialHeader, saveAsMarkdown } from "./wm"

// --- Main Function Call ---

export async function t1_main() {
  // t1_func1()
  t1_func2()
}

// --- Sub Function called

/*
Function that calls groq(compund-beta), this has web search capabiliteis via tavily 
*/
async function t1_func1() {
  printTutorialHeader("t1_func1", "t1_func1")

  const modelz = groq("compound-beta")
  const quez =
    "When was the AI engineer summit 2025, and what impact has it had in the world of AI"

  const result = await generateText({
    model: modelz,
    messages: [
      {
        role: "user",
        content: quez,
      },
    ],
  })

  // Printing the result
  const boxedMessage = boxen(result.text, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "greenBright",
    title: "groq(compound-beta)",
  })

  console.log(chalk.blueBright(boxedMessage))
  console.log(chalk.bold.green(result.sources))
}

/*
Function 2 - Using googele gemini search grounding
*/

async function t1_func2() {
  printTutorialHeader("Google Gemini which Search grounding", "t1_func1")

  const modelz = google("gemini-2.5-flash-preview-04-17", {
    useSearchGrounding: true,
  })

  const quez =
    "When was the AI engineer summit 2025, and what impact has it had in the world of AI"

  const result = await generateText({
    model: modelz,
    messages: [
      {
        role: "user",
        content: quez,
      },
    ],
  })

  // Printing the result
  const boxedMessage = boxen(result.text, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "greenBright",
    title: "google(gemini-2.5-flash-preview-04-17) - Search Grounding",
  })

  console.log(chalk.blueBright(boxedMessage))
  console.log(result.sources)

  saveAsMarkdown(result.text, {
    model: "google(gemini-2.5-flash-preview-04-17) - Search Grounding",
    sources: result.sources,
    query:
      "When was the AI engineer summit 2025, and what impact has it had in the world of AI",
    functionName: "t1_func2",
  })
}

/*
Function calling
*/

async function t1_func3() {
  printTutorialHeader("Function calling", "t1_func3")
}
