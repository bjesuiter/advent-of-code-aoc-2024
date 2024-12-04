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

function getSumOfMulInString(input: string) {
  // Step 3: run regex over input & calculate sum
  const regexResult = input.matchAll(regex);
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

  return sum;
}

// Sum Task 1: 185797128
// const completeSum = getSumOfMulInString(inputText);
// console.log(`Gesamtsumme: ${completeSum}`);

// Step3: collect all "enabledSections"
const enabledSections: string[] = [];

// Step 3.1
// get start of the String until first `don't()` => this part is enabled
const firstDontIndex = inputText.indexOf(`don't()`);
const inputStart = inputText.slice(0, firstDontIndex);
enabledSections.push(structuredClone(inputStart));

// Step 3.2
// Check if the last command is a do(), if so, add the last part to enabledSections
let inputRest = inputText.slice(firstDontIndex);
const lastDontIndex = inputRest.lastIndexOf(`don't()`);
const lastDoIndex = inputRest.lastIndexOf(`do()`);
if (lastDoIndex > lastDontIndex) {
  // means: inputText ends with a do() command
  const inputEnd = inputRest.slice(lastDoIndex);
  enabledSections.push(structuredClone(inputEnd));
  inputRest = inputRest.slice(0, lastDoIndex);
}

// Step 3.3: Get all parts between do() and don't()
const doDontRegex = /(?:do\(\)).*don't\(\)/gm;
const doDontMatches = inputRest.matchAll(doDontRegex);

for (const [match] of doDontMatches) {
  enabledSections.push(structuredClone(match));
}

let sum = 0;
for (const section of enabledSections) {
  sum += getSumOfMulInString(section);
}

// Sum Task 1: 185797128
// Sum Task 2: 3715942560 => wrong, bigger than first solution!
// Sum Task 2: 1486377024 => wrong, using inputText instead of input in getSumOfMulInString
// Sum Task 2:  140833174
console.log(`Sum of Task 2: ${sum}`);
