import { assertEquals } from "@std/assert/equals";

// Step 1: Assemble input lists
const inputText = await Deno.readTextFile("src/day1/input.txt");

let list1 = [];
let list2 = [];

for (const line of inputText.split("\n")) {
  if (line) {
    const [val1, val2] = line.split("   ");
    list1.push(parseInt(val1));
    list2.push(parseInt(val2));
  }
}

assertEquals(list1.length, list2.length);

// Step 2: Sort
list1.sort();
list2.sort();

// Step 3: match the pairs and calculate the sum of the distances
let distanceSum = 0;
for (let i = 0; i < list1.length; i++) {
  const distance = Math.abs(list1[i] - list2[i]);
  distanceSum += distance;
}

console.log(distanceSum);
