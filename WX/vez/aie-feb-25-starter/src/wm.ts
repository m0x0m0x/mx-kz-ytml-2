// markdown-utils.ts
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
 * Comprehensive markdown generator and file writer
 * @param content - Main content to write
 * @param metadata - Metadata including model, sources, etc.
 * @param options - Configuration options
 * @returns Path to the created markdown file
 */
export const generateAndWriteMarkdown = (
  content: string,
  metadata: MarkdownMetadata,
  options: MarkdownOptions = {}
): string => {
  // Default options
  const {
    directory = "rez",
    subdirectory,
    headerLevel = 1,
    includeFullMetadata = true,
  } = options

  try {
    // Setup paths and names
    const now = new Date()
    const timestamp = now.toLocaleString()
    const dateTimeString = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .slice(0, 19)
    const headerPrefix = "#".repeat(Math.min(Math.max(headerLevel, 1), 6))

    // Create output directory
    const outputDir = path.join(__dirname, directory, subdirectory || "")
    fs.mkdirSync(outputDir, { recursive: true })

    // Generate filename and path
    const filename = `${metadata.functionName || "output"}_${dateTimeString}.md`
    const filePath = path.join(outputDir, filename)

    // Format sources as markdown links
    const formatSources = (sources?: Source[]): string => {
      if (!sources || sources.length === 0) return "No sources available"
      return sources
        .map((source, index) => {
          const title = source.title || `Source ${index + 1}`
          return `- [${title}](${source.url})`
        })
        .join("\n")
    }

    // Generate markdown content
    const markdownContent = `${headerPrefix} ${
      metadata.query || "Analysis Report"
    }

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
${JSON.stringify({ ...metadata, timestamp }, null, 2)}
\`\`\``
    : ""
}`

    // Write file
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
