/* 
tu1.ts - These are all the functions being written from the tutorial 
*/

// --- Imports Zone ---

import boxen from "boxen"
import chalk from "chalk"

// --- Main Function Call ---

export async function t1_main() {
  const msg1 = "Tu1 - Main Tutorial Function Calls"
  const boxedMessage = boxen(msg1, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow",
    title: "t1_main",
  })
  console.log(chalk.bold.blue(boxedMessage))
}

// --- Sub Function called
