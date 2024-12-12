import { toCount } from "../utils/to_count.ts";
import { join } from "jsr:@std/path";

// Globals
const masRegex = /MAS/gm;

// Step 1: read input / demo input
// --------------------------------
if (!import.meta.dirname) {
  throw new Error("import.meta.dirname not available");
}
const inputText = await Deno.readTextFile(
  join(import.meta.dirname, "input_demo.txt"),
);
// const inputText = await Deno.readTextFile(
//   join(import.meta.dirname, "input.txt"),
// );

/**
 * Strategy:
 * 1. Find each A in the input text.
 * 2. For each A check all adjacent indexes for the right chars to form an X-shaped MAS, like this:
 * M   S
 *   A
 * M   S
 *
 * Tip: For each diagonal line we have to check the line forwards and backwards.
 */

/**
 * Tests if the input string is MAS or SAM.
 */
function isInputMASorSAM(input: string): boolean {
  return input === "MAS" || input === "SAM";
}

// Step 2: loop through all lines and find the Letter A
// ---------------------------------------------------------------

const lines = inputText.split("\n");

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  const line = lines[lineIndex];

  // loop through chars
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    // TODO: implement new Algo
  }
}

// Step 3: find XMAS in all lines
// -------------------------------
let xShapedMASCount = 0;

// First solution:
console.log("XMAS count:", xShapedMASCount);
