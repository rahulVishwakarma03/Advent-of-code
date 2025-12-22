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

const findCountFrom = (lookUp, row, col) => {
  const foundElement = lookUp.find((el) => el.row === row && el.col === col);

  return foundElement && foundElement.count;
};

const countTimelines = (grid, beam, lookUp = []) => {
  const { row, col } = beam;
  // prompt();
  // console.clear();
  // displayGrid(grid);
  const totalCount = findCountFrom(lookUp, row, col);
  if (totalCount) return totalCount;

  if (row >= grid.length) return 1;

  if (grid[row - 1][col] === "|" && grid[row][col] !== "^") {
    grid[row][col] = "|";
    const count = countTimelines(grid, { col, row: row + 1 }, lookUp);
    lookUp.push({ row, col, count });
    return count;
  }

  if (grid[row - 1][col] === "|" && grid[row][col] === "^") {
    grid[row][col - 1] = "|";
    const left = countTimelines(grid, { col: col - 1, row: row + 1 }, lookUp);
    lookUp.push({ row, col: col - 1, count: left });

    grid[row][col + 1] = "|";
    const right = countTimelines(grid, { col: col + 1, row: row + 1 }, lookUp);
    lookUp.push({ row, col: col + 1, count: right });

    return left + right;
  }
};

const totalTimelines = (input, beam) => {
  const { x: col, y: row } = beam;
  const grid = input.map((x) => [...x]);
  grid[row][col] = "|";

  return countTimelines(grid, { row: row + 1, col });
};

const part2 = (puzzleInput) => {
  const [source, input] = parseInput(puzzleInput);
  return totalTimelines(input, { x: source.x, y: source.y + 1 });
};

console.log(part2(puzzleInput));
