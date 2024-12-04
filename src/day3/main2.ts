// Step 1: read input
const inputText = await Deno.readTextFile("src/day3/input.txt");

// Step 2: create regex
// Rules:
// - start with 'mul('
// - followed by 1 to 3 numbers (0-9)
// - followed by a comma
// - followed by 1 to 3 numbers (0-9)
// - followed by ')'
// see: https://regex101.com/r/YefJYZ/1
const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/gm;

// Step 3: run regex over input & calculate sum
const regexResult = inputText.matchAll(regex);
let sum = 0;

for (const [_match, factor1, factor2] of regexResult) {
  try {
    const factor1Num = Number.parseFloat(factor1);
    const factor2Num = Number.parseFloat(factor2);
    const product = factor1Num * factor2Num;
    sum += product;
  } catch (err) {
    console.error(`Error: ${err}`, { factor1, factor2 });
    continue;
  }
}

console.log(`Gesamtsumme: ${sum}`);
