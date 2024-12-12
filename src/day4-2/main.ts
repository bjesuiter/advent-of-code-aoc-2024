import { join } from "jsr:@std/path";

// Step 1: read input / demo input
// --------------------------------
if (!import.meta.dirname) {
  throw new Error("import.meta.dirname not available");
}
const inputText = await Deno.readTextFile(
  // join(import.meta.dirname, "input_demo.txt"),
  join(import.meta.dirname, "input.txt"),
);

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

// Step 2: Convert inputText into 2D grid
// ---------------------------------------------------------------
// Grid is: First index: row, Second index: column
const grid: string[][] = inputText.split("\n").map((line) => line.split(""));

// Step 2: loop through the grid and find the letter A, then check for X-shaped MAS
// ---------------------------------------------------------------------------------

let xShapedMASCount = 0;

for (let lineIndex = 0; lineIndex < grid.length; lineIndex++) {
  const line = grid[lineIndex];

  // loop through chars
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    const char = line[charIndex];

    if (char === "A") {
      const leftTop = grid[lineIndex - 1]?.[charIndex - 1];
      const rightTop = grid[lineIndex - 1]?.[charIndex + 1];
      const leftBottom = grid[lineIndex + 1]?.[charIndex - 1];
      const rightBottom = grid[lineIndex + 1]?.[charIndex + 1];

      if (!leftTop || !rightTop || !leftBottom || !rightBottom) {
        // if any one of them is undefined, we can't form an X-shaped MAS
        continue;
      }

      // Step 3: find XMAS in all lines
      // -------------------------------
      if (
        isInputMASorSAM(leftTop + "A" + rightBottom) &&
        isInputMASorSAM(rightTop + "A" + leftBottom)
      ) {
        xShapedMASCount++;
      }
    }
  }
}

// First solution (for demo input): 1875 => correct!
console.log("XMAS count:", xShapedMASCount);
