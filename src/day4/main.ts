import { toCount } from "../utils/to_count.ts";

// Globals
const xmasRegex = /XMAS/gm;

// Step 1: read input / demo input
// --------------------------------
// const inputText = await Deno.readTextFile("src/day4/input_demo.txt");
const inputText = await Deno.readTextFile("src/day4/input.txt");

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
// ---------------------------------------------------------------

const lines = inputText.split("\n");
const rows: string[] = [];
const columns: string[] = [];

// same as links unten to rechts oben
// Rule: summs of coordinates are equal (because: walk up 1 and right 1 = -1 + 1 = 0)
const diagonals_ro2lu: string[] = [];

// same as rechts unten to links oben
// Rule: sum of coordinates increases by 2 each time (because: walk down 1 and right 1 = 2)
// Index Rule: diagIndex = charIndex / (rowIndex + 1) + charIndex % 2
// Example:
// - Diagonal: 2-0 to
const diagonals_lo2ru: string[] = [];
const diagonals_lo2ruGrid: string[] = [];

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

// Debug outputs:
// console.log(`Rows (${gridRowCount}):`, rows);
// console.log(`Columns (${gridColCount}):`, columns);

// Fill the diagonals by looping through rows and columns
const open_lo2ru_diagonals: number[] = [];

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  const row = rows[rowIndex];

  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const char = row[colIndex];
    const charIndex = rowIndex * gridColCount + colIndex;

    // fill diagonals_ro2lu (sum of coordinates is equal)
    const diagonalOverflow = Math.floor(charIndex / gridColCount);
    const diagonalIndex = diagonalOverflow + (charIndex % gridColCount);

    if (!diagonals_ro2lu[diagonalIndex]) {
      diagonals_ro2lu[diagonalIndex] = "";
    }
    diagonals_ro2lu[diagonalIndex] += char;

    // fill diagonals_lo2ru (sum of coordinates increases by 2)
    // Solution: manual assignment of diagonalIndex
    if (rowIndex === 0) {
      // for first row: fill diagonals_lo2ru with reverse column index
      const newDiagonalIndex = (gridColCount - 1) - colIndex;
      open_lo2ru_diagonals[colIndex] = newDiagonalIndex;
      if (diagonals_lo2ru[newDiagonalIndex] === undefined) {
        diagonals_lo2ru[newDiagonalIndex] = "";
      }
      diagonals_lo2ru[newDiagonalIndex] += char;
    }

    if (rowIndex > 0) {
      // for all other rows: increase all open diagonals
      const newDiagonalIndex = open_lo2ru_diagonals[colIndex] + 1;
      open_lo2ru_diagonals[colIndex] = newDiagonalIndex;
      if (diagonals_lo2ru[newDiagonalIndex] === undefined) {
        diagonals_lo2ru[newDiagonalIndex] = "";
      }
      diagonals_lo2ru[newDiagonalIndex] += char;
    }
  }

  diagonals_lo2ruGrid.push(open_lo2ru_diagonals.join(" "));
}

// Debug outputs:
// console.log(`Diagonals RO2LU: (${diagonals_ro2lu.length}):`, diagonals_ro2lu);
console.log(
  `Diagonals Grid LO2RU (control output): (${diagonals_lo2ruGrid.length}):`,
  diagonals_lo2ruGrid,
);
console.log(`Diagonals LO2RU: (${diagonals_lo2ru.length}):`, diagonals_lo2ru);

// Step 3: find XMAS in all lines
// -------------------------------
let xmasCount = 0;
for (const line of rows) {
  xmasCount += findXmasInLine(line);
}

for (const line of columns) {
  xmasCount += findXmasInLine(line);
}

for (const line of diagonals_ro2lu) {
  xmasCount += findXmasInLine(line);
}

for (const line of diagonals_lo2ru) {
  xmasCount += findXmasInLine(line);
}

console.log("XMAS count:", xmasCount);
