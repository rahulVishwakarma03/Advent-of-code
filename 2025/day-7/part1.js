const puzzleInput = Deno.readTextFileSync("input.txt");
//row - y, col - x
const parseInput = (puzzleInput) => {
  const input = puzzleInput.split("\n").map((row) => row.split(""));
  const source = { x: input[0].indexOf("S"), y: 0 };

  return [source, input];
};

const displayGrid = (grid) => {
  console.log(grid.map((x) => x.join("")).join("\n"), "\n");
};

const splitBeam = (grid, row, col) => {
  let count = 0;
  if (grid[row - 1][col] === "|" && grid[row][col] === "^") {
    count++;
    grid[row][col - 1] = "|";
    grid[row][col + 1] = "|";
  }
  if (grid[row - 1][col] === "|" && grid[row][col] !== "^") {
    grid[row][col] = "|";
  }
  return count
};

const totalSplit = (beam, input) => {
  const grid = input.map((x) => [...x]);
  let count = 0;
  const { x, y } = { ...beam };
  grid[y][x] = "|";
  // displayGrid(grid);
  for (let row = y + 1; row < grid.length; row++) {
    // prompt("");
    for (let col = 0; col < grid[0].length; col++) {
      count += splitBeam(grid,row, col);
    }
    // console.clear();
    // displayGrid(grid);
  }
  return count;
};

const part1 = (puzzleInput) => {
  const [source, input] = parseInput(puzzleInput);
  // console.log(input);
  return totalSplit({ x: source.x, y: source.y + 1 }, input);
};

console.log(part1(puzzleInput));
