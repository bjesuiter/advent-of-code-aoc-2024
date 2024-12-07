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

// same as links unten to rechts oben
// Rule: summs of coordinates are equal (because: walk up 1 and right 1 = -1 + 1 = 0)
let diagonals_ro2lu: string[] = [];

// same as rechts unten to links oben
// Rule: sum of coordinates increases by 2 each time (because: walk down 1 and right 1 = 2)
// Index Rule: diagIndex = charIndex / (rowIndex + 1) + charIndex % 2
// Example:
// - Diagonal: 2-0 to
let diagonals_lo2ru: string[] = [];

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
const gridRowCount = rows.length;
const gridColCount = columns.length;

console.log(`Rows (${gridRowCount}):`, rows);
console.log(`Columns (${gridColCount}):`, columns);

// Fill the diagonals from rechts oben to links unten
for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const row = rows[rowIndex];
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const char = row[colIndex];
    const charIndex = rowIndex * gridColCount + colIndex;
    const diagonalOverflow = Math.floor(charIndex / gridColCount);
    const diagonalIndex = diagonalOverflow + (charIndex % gridColCount);

    if (!diagonals_ro2lu[diagonalIndex]) {
      diagonals_ro2lu[diagonalIndex] = "";
    }
    diagonals_ro2lu[diagonalIndex] += char;
  }
}

console.log(`Diagonals RO2LU: (${diagonals_ro2lu.length}):`, diagonals_ro2lu);
