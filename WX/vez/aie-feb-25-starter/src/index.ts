import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import "dotenv/config"

const main = async () => {
  const result = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  })
}
main()
