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
