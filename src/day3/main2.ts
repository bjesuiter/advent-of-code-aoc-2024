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

// Step 3: Split inputText into `do()` and `dont't()` parts, starting with a do() part
let position = 0;
let mulEnabled = true;
let endOfFile = false;

const enabledSections: string[] = [];

while (!endOfFile) {
  if (mulEnabled) {
    // find next don't()
    let nextDontIndex = inputText.indexOf(`don't()`, position);
    if (nextDontIndex === -1) {
      // set nextDontIndex to end of string
      nextDontIndex = inputText.length - 1;
      endOfFile = true;
    }
    const enabledSlice = inputText.slice(position, nextDontIndex);
    enabledSections.push(enabledSlice);
    position = nextDontIndex;
    mulEnabled = false;
    continue;
  }

  // if mulEnabled === false: find next do()
  let nextDoIndex = inputText.indexOf(`do()`, position);
  if (nextDoIndex === -1) {
    // set nextDoIndex to end of string
    nextDoIndex = inputText.length - 1;
    endOfFile = true;
  }
  // don't need to extract mul() operations from here, since they are disabled anyways
  position = nextDoIndex;
  mulEnabled = true;
}

let sum = 0;

for (const section of enabledSections) {
  sum += getSumOfMulInString(section);
}

// Sum Task 1: 185797128
// Sum Task 2: 3715942560 => wrong, bigger than first solution! (while loop)
// Sum Task 2: 1486377024 => wrong, using inputText instead of input in getSumOfMulInString (doDonts regex)
// Sum Task 2:  140833174 => wrong (do-don'ts regex - wrong because searching for do() till don't() may fail
//                           due to multiple do()s comming directly after each other, while loop ignores that)
// Sum Task 2:   89798695 => correct! (while loop again, with fix from try 2)
console.log(`Sum of Task 2: ${sum}`);
