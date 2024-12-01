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

console.log(distanceSum); //2430334

// DAY 1 - TASK 2

// Step 1: Count occurences of each number in list2 (to only go through this list once)
const numCountList2 = new Map<number, number>();

for (const num of list2) {
  const oldNumCount = numCountList2.get(num);
  if (oldNumCount === undefined) {
    numCountList2.set(num, 1);
  } else {
    numCountList2.set(num, oldNumCount + 1);
  }
}

let similarityScore = 0;

// Step 2: Go through list 1 and check how often the number occurs in list 2,
// then multiply the number with the occurence and add it to the sum

for (const num of list1) {
  const occurence = numCountList2.get(num);
  if (occurence !== undefined) {
    similarityScore += num * occurence;
  }
}

console.log(similarityScore); // 28786472
