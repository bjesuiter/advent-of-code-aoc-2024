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

    if (newState.is_failure) {
      return false;
    }

    // else: continue to check next level
    reportState = newState;

    // if (isFailure && !previous_failure) {
    //   // check if report would be valid if we skip this failing level,
    //   // aka: do all checks for this level again, but comparing: previous_level and levelStrings[i+1]
    // }

    // if (isFailure === true && previous_failure === true) {
    // }
  }

  // console.log(`Valid Report: ${report}`, {
  //   reportState,
  // });
  return true;
});

const safeReports = validatedReports.filter((r) => r === true);
console.log(`Safe Reports: `, safeReports.length);
