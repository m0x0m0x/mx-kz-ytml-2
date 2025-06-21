/* 
tu1.ts - These are all the functions being written from the tutorial 
*/

// --- Imports Zone ---

import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import "dotenv/config"
import { printTutorialHeader } from "./wm"

// --- Main Function Call ---

export async function t1_main() {
  printTutorialHeader("Tu1 - Main Tutorial Function Calls", "t1_main")
}

// --- Sub Function called

export async function t1_func1() {
  printTutorialHeader("t1_func1", "t1_func1")

  const result = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        role: "user",
        content: "When was the AI engineer summit 2025",
      },
    ],
  })
}
