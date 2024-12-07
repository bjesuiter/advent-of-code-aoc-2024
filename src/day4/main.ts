import { toCount } from "../utils/to_count.ts";

// Globals
const xmasRegex = /XMAS/;

// Step 1: read input / demo input
const inputText = await Deno.readTextFile("src/day4/input_demo.txt");

/**
 * Finds the text XMAS in one line, testing forwards and backwards.
 *
 * @returns The count of XMAS found.
 */
function findXmasInLine(line: string): number {
  let count = 0;
  const xmasMatchForward = line.matchAll(xmasRegex);
  count += xmasMatchForward.reduce(toCount, 0);

  const lineBackwards = line.split("").reverse().join("");
  const xmasMatchBackward = lineBackwards.matchAll(xmasRegex);
  count += xmasMatchBackward.reduce(toCount, 0);

  return count;
}

// Step 2: aggregate different lines (rows, columns and diagonals)
const lines = inputText.split("\n");
let rows: string[] = [];
let columns: string[] = [];

// same as rechts unten to links oben
// Rule: sum of coordinates increases by 2 each time (because: walk down 1 and right 1 = 2)
let diagonals_lo2ru: string[] = [];

// same as rechts oben to links unten
// Rule: summs of coordinates are equal (because: walk up 1 and right 1 = -1 + 1 = 0)
let diagonals_lu2ro: string[] = [];

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  // fill lines
  const line = lines[lineIndex];
  rows.push(line);

  // loop through chars and fill columns and diagonals
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    // fill columns
    const char = line[charIndex];
    if (!columns[charIndex]) {
      columns[charIndex] = "";
    }
    columns[charIndex] += char;
  }

}

console.log("Rows:", rows);
console.log("Columns:", columns);

// Fill the diagonals from links oben to rechts unten
for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const row = rows[rowIndex];
  for (let charIndex = 0; charIndex < row.length; charIndex++) {
   if (rowIndex === charIndex) 

  }
}