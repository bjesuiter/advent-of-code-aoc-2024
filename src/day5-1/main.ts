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

const [section1, section2] = inputText.split("\n\n");

console.log(section1);
console.log(section2);
