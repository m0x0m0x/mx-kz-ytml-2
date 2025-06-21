import chalk from "chalk"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export interface MarkdownMetadata {
  [key: string]: any
  model?: string
  sources?: any[]
  query?: string
  timestamp?: string
  functionName?: string
}

/**
 * Writes content to a markdown file in the 'rez' directory
 * @param content - The main content to write
 * @param metadata - Additional metadata to include
 * @param filenamePrefix - Prefix for the filename
 * @param functionName - Name of the calling function for organization
 * @returns Path to the created file
 */
export const writeToMarkdown = (
  content: string,
  metadata: MarkdownMetadata = {},
  filenamePrefix: string = "output",
  functionName?: string
): string => {
  try {
    const now = new Date()
    const dateTimeString = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
    const formattedDate = now.toLocaleString()

    // Enhance metadata
    const enhancedMetadata: MarkdownMetadata = {
      ...metadata,
      timestamp: formattedDate,
      functionName: functionName || metadata.functionName,
    }

    // Prepare markdown content
    const markdownContent =
      `# ${filenamePrefix}\n\n` +
      `**Generated**: ${formattedDate}\n\n` +
      `## Content\n${content}\n\n` +
      `## Metadata\n\`\`\`json\n${JSON.stringify(
        enhancedMetadata,
        null,
        2
      )}\n\`\`\``

    // Create rez directory structure
    const rezDir = path.join(__dirname, "rez")
    const functionDir = functionName ? path.join(rezDir, functionName) : rezDir

    if (!fs.existsSync(functionDir)) {
      fs.mkdirSync(functionDir, { recursive: true })
    }

    // Write file
    const filename = `${filenamePrefix}_${dateTimeString}.md`
    const filePath = path.join(functionDir, filename)
    fs.writeFileSync(filePath, markdownContent)

    console.log(
      chalk.green(
        `✓ Results saved to ${path.relative(process.cwd(), filePath)}`
      )
    )
    return filePath
  } catch (error) {
    console.error(
      chalk.red("✗ Error writing markdown file:"),
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}
