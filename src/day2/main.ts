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

  return { report, valid: true };
}

const validatedReports = reports.map((report) => {
  const levelStrings = report.split(" ");
  const levels = levelStrings.map((num) => Number.parseInt(num));

  const result = isReportValid(levels);

  // PROBLEM DAMPENER

  return result;

  // if (newState.is_failure && reportState.has_previous_failure) {
  //   // Shortcut: if the report has already failed,
  //   // and this level fails, then the report is invalid
  //   return { report, valid: false };
  // }

  // if (newState.is_failure && !reportState.has_previous_failure) {
  //   // check if report would be valid if we skip this failing level

  //   // Shortcut: if this level is the last level, then the report will be valid when this is skipped!
  //   if (i === levelStrings.length - 1) {
  //     return { report, valid: true };
  //   }

  //   // aka: do all checks for this level again, but comparing: previous_level and levelStrings[i+1]
  //   const newState2 = isLevelValid({
  //     ...reportState,
  //     level: Number.parseInt(levelStrings[i + 1]),
  //     is_failure: false,
  //     has_previous_failure: true,
  //   });

  //   if (newState2.is_failure) {
  //     // if the next level is also a failure, then the report is invalid
  //     return { report, valid: false };
  //   } else {
  //     // if the next level is valid, then we can skip this level
  //     reportState = newState2;
  //     i = i + 1;
  //     continue;
  //   }
  // }
});

const safeReports = validatedReports.filter((r) => r.valid === true);
console.log(`Safe Reports: `, safeReports.length);

// Try 2: 362 => too low

const invalidReports = validatedReports.filter((r) => r.valid === false);
console.log(`Invalid Reports: `, invalidReports);
