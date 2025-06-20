import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import "dotenv/config"

const { text } = await generateText({
  model: groq("gemma2-9b-it"),
  prompt: "Write a vegetarian lasagna recipe for 4 people.",
})
console.log("Hello, world!")
