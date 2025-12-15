const puzzleInput = Deno.readTextFileSync('input.txt');
const delta = {
  L : -1,
  R : 1
}

const rotateDial = (rotations, initialPosition) => {
  let countZero = 0
  let currentPosition = initialPosition;
   rotations.forEach(({rotation,distance}) => {
     currentPosition = (currentPosition + delta[rotation] * distance + 100) % 100;
    //  console.log(currentPosition);
    countZero += currentPosition === 0 ? 1:0;
  });
  return countZero;
}

const parseInput = (input) => {
  return input.split('\n').map(el => ({rotation : el[0], distance : parseInt(el.slice(1))}));
}

const part1 = (puzzleInput) => {
  const rotations = parseInput(puzzleInput);

  return rotateDial(rotations, 50);
}

console.log(part1(puzzleInput));