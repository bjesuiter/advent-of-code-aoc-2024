// Step 1: Assemble input lists

const inputText = await Deno.readTextFile("src/day1/input.txt");

let list1 = [];
let list2 = [];

for (const line of inputText.split("\n")) {
  console.log(line);
}
