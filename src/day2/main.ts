// Step 1: Assemble input lists
const inputText = await Deno.readTextFile("src/day2/input.txt");

const reports = inputText.split("\n");
reports.sort();

function isReportValid(report: number[]) {
  if (report.length < 2) {
    console.error(`Report must have at least 2 levels! `, report);
    return {
      report,
      valid: false,
      reason: "Report must have at least 2 levels!",
    };
  }

  let initial_direction: undefined | "increasing" | "decreasing" = undefined;

  for (let i = 1; i < report.length; i++) {
    const previous_level = report[i - 1];
    const level = report[i];

    // init previous_direction
    if (initial_direction === undefined) {
      if (previous_level < level) {
        initial_direction = "increasing";
      } else {
        initial_direction = "decreasing";
      }
    } else {
      // compare with previous_direction
      if (initial_direction === "increasing" && previous_level > level) {
        return {
          report,
          valid: false,
          reason_code: "direction_missmatch",
          reason:
            `initial_direction is increasing, but prev_level ${previous_level} is bigger than curr_level ${level}`,
          failed_level_index: i,
        };
      }

      if (initial_direction === "decreasing" && previous_level < level) {
        return {
          report,
          valid: false,
          reason_code: "direction_missmatch",
          reason:
            `initial_direction is decreasing, but prev_level ${previous_level} is smaller than curr_level ${level}`,
          failed_level_index: i,
        };
      }
    }

    // check diff
    const diff = Math.abs(previous_level - level);
    if (diff < 1 || diff > 3) {
      return {
        report,
        valid: false,
        reason_code: "step_size_invalid",
        reason:
          `diff between prev_level ${previous_level} and curr_level ${level} is ${diff} (must be <=1 and <=3)`,
        failed_level_index: i,
      };
    }
  }

  return { report, valid: true, failed_level_index: -1, reason: "" };
}

const validatedReports = reports.map((report) => {
  const reportString = report.split(" ");
  let reportLevels = reportString.map((num) => Number.parseInt(num));
  const firstValidation = isReportValid(reportLevels);

  // PROBLEM DAMPENER

  if (firstValidation.valid) {
    return { ...firstValidation, validationPass: 1 };
  }

  // from here: !firstValidation.valid

  // remove failed index from reportLevels and check again
  reportLevels = reportLevels.filter((_, i) =>
    i !== firstValidation.failed_level_index
  );
  const secondValidation = isReportValid(reportLevels);

  if (secondValidation.valid) {
    return { ...secondValidation, validationPass: 2 };
  }

  // from here: !secondValidation.valid
  return { ...secondValidation, validationPass: -1 };
});

const safeReports = validatedReports.filter((r) => r.valid === true);
console.log(`Safe Reports: `, safeReports.length);

// Try 2: 362 => too low
// Try 3: 366 => too low

const invalidReports = validatedReports.filter((r) => r.valid === false);
console.log(`Invalid Reports: `, invalidReports);
