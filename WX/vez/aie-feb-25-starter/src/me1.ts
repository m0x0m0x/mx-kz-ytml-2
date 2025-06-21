/* 
This will have various functions you are testing while doing the tutorial. 
*/

import { google } from "@ai-sdk/google"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import boxen from "boxen"
import chalk from "chalk"
import "dotenv/config"

export async function m1_main() {
  explainAtmosphereInGangstaRap()
}

///////////////////////////////////////////////////////////////
// Groq Usage
///////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////
// Googel Usage
///////////////////////////////////////////////////////////////

// Query Compount Beta which also has web search
export async function googleSearchGrounding() {
  try {
    const result = await generateText({
      model: google("gemini-1.5-flash", {
        useSearchGrounding: true,
      }),
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

// Function using the writeToMarkdown function
export async function googleSearchGroundingTwo(): Promise<string> {
  const FUNCTION_NAME = "googleSearchGroundingTwo"
  const QUERY = "Iran-Israel War June 2025"

  try {
    // 1. Generate AI response
    const result = await generateText({
      model: google("gemini-2.5-flash-preview-04-17", {
        useSearchGrounding: true,
      }),
      messages: [
        {
          role: "user",
          content: QUERY,
        },
      ],
    })

    // 2. Display console output
    console.log(chalk.bold.blue("🔥 Atmosphere, Gangsta Style:"))
    console.log(
      chalk.greenBright(
        boxen(result.text, {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "yellow",
        })
      )
    )

    if (result.sources?.length) {
      console.log(
        chalk.greenBright("Sources:\n"),
        chalk.greenBright(JSON.stringify(result.sources, null, 2))
      )
    }

    // 3. Save to markdown file
    writeToMarkdown(
      result.text,
      {
        model: "gemini-2.5-flash-preview-04-17",
        sources: result.sources || [],
        query: QUERY,
        functionName: FUNCTION_NAME,
      },
      {
        subdirectory: "middle-east-conflicts",
        headerLevel: 1,
        includeFullMetadata: true,
      }
    )

    console.log(chalk.bold.green("✔ Operation completed"))
    return result.text
  } catch (error) {
    console.error(
      chalk.red.bold("💥 Error:"),
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}
