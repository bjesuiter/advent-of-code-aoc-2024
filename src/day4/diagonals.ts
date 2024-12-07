const openDiagonals: number[] = [];

const grid: string[] = [];

for (let i = 0; i < 10; i++) {
  // new line starts here
  for (let j = 9; j >= 0; j--) {
    if (i === 0) {
      // for first row: fill open diagonals with column index
      const index = 9 - j;
      openDiagonals[index] = j;
    }

    if (i > 0) {
      // for all other rows: increase all open diagonals
      openDiagonals[j] = openDiagonals[j] + 1;
    }
  }
  grid.push(openDiagonals.join(" "));
}

console.log(grid);
