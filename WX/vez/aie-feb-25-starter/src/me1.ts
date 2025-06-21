/* 
This will have various functions you are testing while doing the tutorial. 
*/

import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import boxen from "boxen"
import chalk from "chalk"
import "dotenv/config"

export async function m1_main() {
  explainAtmosphereInGangstaRap()
}

// Query closed model from groq directly
export async function explainAtmosphereInGangstaRap() {
  try {
    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: "Explain what is atmosphere, in gangsta rap style",
    })

    console.log(chalk.bold.blue("🔥 Atmosphere, Gangsta Style:"))

    const boxedMessage = boxen(result.text, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "yellow",
    })

    console.log(chalk.greenBright(boxedMessage))
    console.log(chalk.bold.green("✔ Operation completed"))

    return result.text // Optional: return the response for reuse
  } catch (error) {
    console.error(chalk.red.bold("💥 Error:"), error.message)
    throw error
  }
}

// Query Compount Beta which also has web search
export async function compoundBetaTest() {
  try {
    const result = await generateText({
      model: groq("compound-beta"),
      messages: [
        {
          role: "user",
          content:
            "Explain the key points of the Iran-Israel War as of June 2025",
        },
      ],
    })

    console.log(chalk.bold.blue("🔥 Atmosphere, Gangsta Style:"))

    const boxedMessage = boxen(result.text, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "yellow",
    })

    console.log(chalk.greenBright(boxedMessage))
    console.log(chalk.greenBright(result.sources)) // Note if there are sources then it will be here
    console.log(chalk.bold.green("✔ Operation completed"))

    return result.text // Optional: return the response for reuse
  } catch (error) {
    console.error(chalk.red.bold("💥 Error:"), error.message)
    throw error
  }
}

// Using google gemini and search grounding

// Query Compount Beta which also has web search
export async function googleSearchGrounding() {
  try {
    const result = await generateText({
      model: groq("compound-beta"),
      messages: [
        {
          role: "user",
          content:
            "Explain the key points of the Iran-Israel War as of June 2025",
        },
      ],
    })

    console.log(chalk.bold.blue("🔥 Atmosphere, Gangsta Style:"))

    const boxedMessage = boxen(result.text, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "yellow",
    })

    console.log(chalk.greenBright(boxedMessage))
    console.log(chalk.greenBright(result.sources)) // Note if there are sources then it will be here
    console.log(chalk.bold.green("✔ Operation completed"))

    return result.text // Optional: return the response for reuse
  } catch (error) {
    console.error(chalk.red.bold("💥 Error:"), error.message)
    throw error
  }
}
