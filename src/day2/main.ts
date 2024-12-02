// Step 1: Assemble input lists
const inputText = await Deno.readTextFile("src/day2/input.txt");

const reports = inputText.split("\n");
reports.sort();

const validatedReports = reports.map((report) => {
  const levelStrings = report.split(" ");
  let all_increasing = true;
  let all_decreasing = true;
  let previous_level: number | undefined;

  for (const levelString of levelStrings) {
    const level = Number.parseInt(levelString);

    // first iteration
    if (!previous_level) {
      previous_level = level;
      continue;
    }

    if (previous_level < level) {
      all_decreasing = false;
    }

    if (previous_level > level) {
      all_increasing = false;
    }

    if (!all_decreasing && !all_increasing) {
      // Shortcut: first condition not met for this report
      return;
    }

    const diff = Math.abs(previous_level - level);
    if (diff < 1 || diff > 3) {
      // Shortcut: second condition not met for this report
      return;
    }

    previous_level = level;
  }

  console.log(`Valid Report: ${report}`, {
    all_decreasing,
    all_increasing,
  });
  return true;
});

const safeReports = validatedReports.filter((r) => r === true);
console.log(`Safe Reports: `, safeReports.length);
