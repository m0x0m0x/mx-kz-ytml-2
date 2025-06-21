import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import boxen from "boxen"
import chalk from "chalk"
import "dotenv/config"

const main = async () => {
  const result = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        role: "user",
        content: "When was the AI engineer summit 2025",
      },
    ],
  })

  console.log(chalk.bold.blue("Generated Recipe:"))
  const boxedMessage = boxen(result.text, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow", // Optional background color
  })
  console.log(chalk.greenBright(boxedMessage))
  console.log(chalk.bold.green("✔ Operation completed"))
}

// My function
// m1_main()
main()
