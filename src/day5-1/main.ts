import { toSum } from "../utils/to_sum.ts";
import { join } from "jsr:@std/path/join";

// Step 1: read input / demo input

// --------------------------------
if (!import.meta.dirname) {
  throw new Error("import.meta.dirname not available");
}
const inputText = await Deno.readTextFile(
  //   join(import.meta.dirname, "input_demo.txt"),
  join(import.meta.dirname, "input.txt"),
);

const [ruleLines, updateLines] = inputText.split("\n\n");

/**
 * Rules:
 * 1. Given X | Y, Page Nr X must be printed before page Nr Y
 */

// Step 1: Produce an index for the rules, aka:
// Page to print -> Pages that must be printed before
const printBeforeRules = new Map<number, Set<number>>();
const printAfterRules = new Map<number, Set<number>>();

for (const ruleLine of ruleLines.split("\n")) {
  const [before, after] = ruleLine.split("|").map((x) => parseInt(x, 10));
  if (!printBeforeRules.has(after)) {
    printBeforeRules.set(after, new Set());
  }
  printBeforeRules.get(after)!.add(before);

  if (!printAfterRules.has(before)) {
    printAfterRules.set(before, new Set());
  }
  printAfterRules.get(before)!.add(after);
}

console.log(printBeforeRules);
console.log(printAfterRules);

// Step 2: Produce a list of updates
const updates = updateLines.split("\n").map((line) =>
  line.split(",").map((x) => parseInt(x, 10))
);
console.log(updates);

// Step 3: A function for checking if one update is valid
function isUpdateValid(update: number[]) {
  const pagesPrintedAlready: number[] = [];

  for (const page of update) {
    // Check 1: Do we have any print rules for this page?
    if (!printAfterRules.has(page) && !printBeforeRules.has(page)) {
      // No rules exist for this page, so we can print it.
      pagesPrintedAlready.push(page);
      continue;
    }

    // Check 2: Are all pages that must be printed before this page already printed? or not in the update?
    if (printBeforeRules.has(page)) {
      // go through each page that must be printed before this page
      for (const pageBefore of printBeforeRules.get(page)!) {
        // Check 1: is the pageBefore in the update at all? If not, ignore this pageBefore
        // Note: This may be a unnecessary computation when we do this twice or more for the same pageBefore
        if (
          !pagesPrintedAlready.includes(pageBefore) &&
          update.includes(pageBefore)
        ) {
          console.log(
            `Page ${pageBefore} must be printed before ${page}, but it was not.`,
            { update, pagesPrintedAlready },
          );
          return false;
        }
      }
    }

    // If we reach this point, print the page and implicitely continue
    pagesPrintedAlready.push(page);
  }

  return true;
}

// Step 4: Make a list of all correctly ordered updates
const validUpdates = updates.filter(isUpdateValid);

const middleNumbers = validUpdates.map((update) => {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
});

// First result try: 6498
console.log(middleNumbers.reduce(toSum, 0));
