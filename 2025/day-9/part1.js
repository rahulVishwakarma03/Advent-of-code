import { maxOf } from "jsr:@std/collections/max-of";
import { maxBy } from "jsr:@std/collections/max-by";

const puzzleInput = Deno.readTextFileSync('input.txt');

const parsePuzzleInput = (puzzleInput) => {
  return puzzleInput.split('\n').map(el => {
    const [x,y] = el.split(',');
    return {x:parseInt(x), y: parseInt(y)};
  })
}

const calculateArea = (p1, p2) => {
  return (Math.abs(p1.x -p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);
}

const calculateAllRectanglesArea = (redTiles) => {
  const setOfAreasWithPoints = [];
  for(let i = 0; i < redTiles.length-1; i++) {
    for(let j = i+1; j< redTiles.length; j++) {
      const areaObj = {
        p1 : {...redTiles[i]},
        p2 : {...redTiles[j]},
        area : calculateArea(redTiles[i], redTiles[j])
      }
      setOfAreasWithPoints.push(areaObj)
    }
  }
  return setOfAreasWithPoints;
}

const largestArea = (redTiles) => {
  const setOfAreasWithPoints = calculateAllRectanglesArea(redTiles);
  return maxOf(setOfAreasWithPoints, el => el.area);
} 

const part1 = (puzzleInput) => {
  const redTiles = parsePuzzleInput(puzzleInput);
  return largestArea(redTiles);
}

console.log(part1(puzzleInput));