const puzzleInput = Deno.readTextFileSync("input.txt");
const delta = {
  L: -1,
  R: 1,
};

const rotateDial = (rotations, initialPosition) => {
  let countZero = 0;
  let currentPosition = initialPosition;
  rotations.forEach(({ rotation, distance }) => {
    // const prev = currentPosition;
    // currentPosition = (currentPosition + delta[rotation] * distance + 100) %
    //   100;
    // countZero += Math.floor(distance/100);
    // countZero += currentPosition === 0 || (prev !== 0 && (currentPosition - delta[rotation] * (distance % 100)) !== prev) ? 1 : 0;
    // // console.log(prev, currentPosition, countZero);
    for(let i =1; i<=distance; i++) {
      currentPosition = (currentPosition + delta[rotation]) % 100;
      if(currentPosition === 0) countZero++;
    }
  });
  return countZero;
};

const parseInput = (input) => {
  return input.split("\n").map((el) => ({
    rotation: el[0],
    distance: parseInt(el.slice(1)),
  }));
};

const part2 = (puzzleInput) => {
  const rotations = parseInput(puzzleInput);

  return rotateDial(rotations, 50);
};

console.log(part2(puzzleInput));
