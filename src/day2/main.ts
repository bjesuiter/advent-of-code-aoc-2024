// Step 1: Assemble input lists
const inputText = await Deno.readTextFile("src/day2/input.txt");

const reports = inputText.split("\n");
reports.sort();

type ReportState = {
  // per-report state
  all_increasing: boolean;
  all_decreasing: boolean;
  has_previous_failure: boolean;

  // per-level state
  previous_level: number;
  level: number;
  is_failure: boolean;
};

function isLevelValid(state: ReportState): ReportState {
  if (state.previous_level < state.level) {
    state.all_decreasing = false;
  }

  if (state.previous_level > state.level) {
    state.all_increasing = false;
  }

  if (!state.all_decreasing && !state.all_increasing) {
    // Shortcut: first condition not met for this report
    state.is_failure = true;
  }

  const diff = Math.abs(state.previous_level - state.level);
  if (diff < 1 || diff > 3) {
    // Shortcut: second condition not met for this report
    state.is_failure = true;
  }

  return state;
}

const validatedReports = reports.map((report) => {
  const levelStrings = report.split(" ");

  let reportState = {
    all_increasing: true as boolean,
    all_decreasing: true as boolean,
    has_previous_failure: false as boolean,
    previous_level: 0 as number,
    level: 0 as number,
    is_failure: false as boolean,
  } satisfies ReportState;

  for (let i = 1; i < levelStrings.length; i++) {
    reportState.previous_level = Number.parseInt(levelStrings[i - 1]);
    reportState.level = Number.parseInt(levelStrings[i]);
    reportState.is_failure = false;

    const newState = isLevelValid(reportState);

    // PROBLEM DAMPENER

    if (newState.is_failure && reportState.has_previous_failure) {
      // Shortcut: if the report has already failed,
      // and this level fails, then the report is invalid
      return false;
    }

    if (newState.is_failure && !reportState.has_previous_failure) {
      // check if report would be valid if we skip this failing level

      // Shortcut: if this level is the last level, then the report will be valid when this is skipped!
      if (i === levelStrings.length - 1) {
        return true;
      }

      // aka: do all checks for this level again, but comparing: previous_level and levelStrings[i+1]
      const newState2 = isLevelValid({
        ...reportState,
        level: Number.parseInt(levelStrings[i + 1]),
        is_failure: false,
        has_previous_failure: true,
      });

      if (newState2.is_failure) {
        // if the next level is also a failure, then the report is invalid
        return false;
      } else {
        // if the next level is valid, then we can skip this level
        reportState = newState2;
        i = i + 1;
        continue;
      }
    }

    // else: continue to check next level
    reportState = newState;
  }

  // console.log(`Valid Report: ${report}`, {
  //   reportState,
  // });
  return true;
});

const safeReports = validatedReports.filter((r) => r === true);
console.log(`Safe Reports: `, safeReports.length);

// Try 2: 362 => too low
