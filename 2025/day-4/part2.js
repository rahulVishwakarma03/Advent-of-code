const puzzleInput = Deno.readTextFileSync('input.txt');

const parsePuzzleInput = (puzzleInput) => {
  return puzzleInput.split('\n').map(x => x.split(''));
}

const deltasForAdjacentPositions = [
  {dx:0,dy:1},
  {dx:0,dy:-1},
  {dx:1,dy:0},
  {dx:-1,dy:0},
  {dx:1,dy:1},
  {dx:1,dy:-1},
  {dx:-1,dy:1},
  {dx:-1,dy:-1},
]

const isValidPosition = (grid,x,y) => {
  return (x > -1) && (x < grid[0].length) && (y > -1) && (y < grid.length);
}

const isAccessible = (grid, row, col) => {
  let countRolls = 0;
  deltasForAdjacentPositions.forEach(({dx,dy}) => {
    const [x,y] = [col+dx, row+dy];
    if(countRolls === 4) return false;
    if(isValidPosition(grid,x,y) && grid[y][x] === "@") countRolls++;
  })
  return countRolls < 4;
}

const generateAccessibleRolls = function* (grid) {
  
  for(let row = 0; row < grid.length; row++){
    for(let col = 0; col < grid[0].length; col++) {
      if(grid[row][col] === "@" && isAccessible(grid, row, col)) {
        yield {x:col,y:row};
      }
    }
  }
}

const removeRollsOfPaper = (grid) => {
  let deletedRollsCount = 0;
  const rollsIterator = generateAccessibleRolls(grid);
  const {value, done} = rollsIterator.next();
  let position = value;
  let isDone = done;
  
  while(!isDone) {
    deletedRollsCount++;
    grid[position.y][position.x] = '.';
    const {value, done} = rollsIterator.next();
    position = value;
    isDone = done;
  }
    if(deletedRollsCount === 0) return 0;
  return deletedRollsCount + removeRollsOfPaper(grid)
}

const part2 = (puzzleInput) => {
  const grid = parsePuzzleInput(puzzleInput)
  return removeRollsOfPaper(grid);
}

console.log(part2(puzzleInput))