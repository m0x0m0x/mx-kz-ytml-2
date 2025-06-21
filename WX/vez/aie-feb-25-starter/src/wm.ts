import chalk from "chalk"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export interface Source {
  sourceType?: string
  id?: string
  url: string
  title?: string
}

export interface MarkdownMetadata {
  model: string
  sources?: Source[]
  query?: string
  timestamp?: string
  functionName?: string
  [key: string]: any // Allow additional metadata
}

export interface MarkdownOptions {
  directory?: string
  subdirectory?: string
  headerLevel?: number
  includeFullMetadata?: boolean
}

/**
 * Writes content to a markdown file with enhanced formatting
 */
export const writeToMarkdown = (
  content: string,
  metadata: MarkdownMetadata,
  options: MarkdownOptions = {}
): string => {
  const {
    directory = "rez",
    subdirectory,
    headerLevel = 1,
    includeFullMetadata = true,
  } = options

  try {
    const now = new Date()
    const dateTimeString = formatDateTime(now)
    const headerPrefix = "#".repeat(Math.min(Math.max(headerLevel, 1), 6))

    // Create output directory structure
    const outputDir = path.join(__dirname, directory, subdirectory || "")
    fs.mkdirSync(outputDir, { recursive: true })

    // Generate filename
    const filename = `${metadata.functionName || "output"}_${dateTimeString}.md`
    const filePath = path.join(outputDir, filename)

    // Format the markdown content
    const markdownContent = generateMarkdownContent(content, metadata, {
      headerPrefix,
      includeFullMetadata,
    })

    // Write to file
    fs.writeFileSync(filePath, markdownContent)

    console.log(
      chalk.green(
        `✓ Markdown saved to: ${path.relative(process.cwd(), filePath)}`
      )
    )
    return filePath
  } catch (error) {
    console.error(
      chalk.red("✗ Markdown save failed:"),
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}

// Helper functions
const formatDateTime = (date: Date): string => {
  return date.toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, 19)
}

const generateMarkdownContent = (
  content: string,
  metadata: MarkdownMetadata,
  options: {
    headerPrefix: string
    includeFullMetadata: boolean
  }
): string => {
  const { headerPrefix, includeFullMetadata } = options
  const timestamp = metadata.timestamp || new Date().toLocaleString()

  return `${headerPrefix} ${metadata.query || "Analysis Report"}

**Generated**: ${timestamp}  
**Model**: ${metadata.model}  
**Function**: ${metadata.functionName || "N/A"}

${headerPrefix}# Key Points
${content}

${headerPrefix}# Sources
${formatSources(metadata.sources)}

${
  includeFullMetadata
    ? `${headerPrefix}# Metadata
\`\`\`json
${JSON.stringify(metadata, null, 2)}
\`\`\``
    : ""
}
`
}

const formatSources = (sources?: Source[]): string => {
  if (!sources || sources.length === 0) {
    return "No sources available"
  }

  return sources
    .map((source, index) => {
      const title = source.title || `Source ${index + 1}`
      return `- [${title}](${source.url})`
    })
    .join("\n")
}
