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
let diagonals_left_to_right: string[] = [];
let diagonals_right_to_left: string[] = [];

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  // fill lines
  const line = lines[lineIndex];
  rows.push(line);

  //   fill columns
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    const char = line[charIndex];
    if (!columns[charIndex]) {
      columns[charIndex] = "";
    }
    columns[charIndex] += char;
  }

  //   for (let iDiagonal = 0; iDiagonal < line.length; iDiagonal++) {
  //     const char = line[iDiagonal];
  //     if (!diagonals[iDiagonal]) {
  //       diagonals[iDiagonal] = "";
  //     }
  //     diagonals[iDiagonal] += char;
  //   }
}

console.log("Rows:", rows);
console.log("Columns:", columns);
