// Step 1: read input / demo input

import { join } from "jsr:@std/path/join";

// --------------------------------
if (!import.meta.dirname) {
  throw new Error("import.meta.dirname not available");
}
const inputText = await Deno.readTextFile(
  join(import.meta.dirname, "input_demo.txt"),
  //   join(import.meta.dirname, "input.txt"),
);

const [ruleLines, updateLines] = inputText.split("\n\n");

/**
 * Rules:
 * 1. Given X | Y, Page Nr X must be printed before page Nr Y
 */

// Step 1: Produce an index for the rules, aka:
// Page to print -> Pages that must be printed before
const printRules = new Map<number, Set<number>>();

for (const ruleLine of ruleLines.split("\n")) {
  const [before, after] = ruleLine.split("|").map((x) => parseInt(x, 10));
  if (!printRules.has(after)) {
    printRules.set(after, new Set());
  }
  printRules.get(after)!.add(before);
}

console.log(printRules);

// Step 2: Produce a list of updates
const updates = updateLines.split("\n").map((line) => line.split(","));
console.log(updates);

// Step 3: A function for checking if one update is valid
function isUpdateValid(update: number[]) {
  const pagesPrintedBefore: number[] = [];

  for (const page of update) {
  }
}
