const puzzleInput = Deno.readTextFileSync('input.txt');
const delta = {
  L : -1,
  R : 1
}

const rotateDial = (rotations, initialPosition) => {
  let countZero = 0
  let currentPosition = initialPosition;
   rotations.forEach(({rotation,distance}) => {

      for(let i =1; i<=distance; i++) {
        currentPosition = (currentPosition + delta[rotation]) % 100;
        if(currentPosition === 0) countZero++;
      }
  });
  return countZero;
}

const parseInput = (input) => {
  return input.split('\n').map(el => ({rotation : el[0], distance : parseInt(el.slice(1))}));
}

const part2 = (puzzleInput) => {
  const rotations = parseInput(puzzleInput);

  return rotateDial(rotations, 50);
}

console.log(part2(puzzleInput));