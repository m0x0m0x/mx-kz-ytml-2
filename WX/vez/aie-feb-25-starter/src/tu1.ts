/* 
tu1.ts - These are all the functions being written from the tutorial 
*/

// --- Imports Zone ---

import chalk from "chalk"

// --- Main Function Call ---

export async function t1_main() {
  console.log(chalk.bold.blue("Tu1 Main Function Call"))
  const boxedMessage = boxen(result.text, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow",
  })
}

// --- Sub Function called
