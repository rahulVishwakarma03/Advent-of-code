// import { intersect } from "jsr:@std/collections";

const delta = {
  L: { dx: -1, dy: 0 },
  R: { dx: 1, dy: 0 },
  U: { dx: 0, dy: 1 },
  D: { dx: 0, dy: -1 },
};

const changePosition = (steps, position, path, { dx, dy }) => {
  for (let i = 1; i <= steps; i++) {
    position[0] += dx;
    position[1] += dy;

    path.push([...position]);
  }
  return [...path];
};

export const intersect = (path1, path2) => {
  const intersectingPosition = [];

  for (const [x1, y1] of path1) {
    for (const [x2, y2] of path2) {
      if (x1 === x2 && y1 === y2) {
        intersectingPosition.push([x1, y1]);
      }
    }
  }

  return intersectingPosition;
};

const executeInstruction = (instruction, position, path) => {
  return changePosition(instruction[1], position, path, delta[instruction[0]]);
};

export const executeInstructions = (instructions) => {
  const currentPosition = [0, 0];

  const path = instructions.flatMap((instruction) =>
    executeInstruction(instruction, currentPosition, [])
  );
  return path;
};

export const parseInput = (input) => {
  return input.split(",").map((x) => [x[0], parseInt(x.slice(1))]);
};

const manhattanDistance = (intersectingPositions) => {
  const distances = intersectingPositions.map(({ x, y }) => {
    return Math.abs(x - 0) + Math.abs(y - 0);
  });
  return Math.min(...distances);
};


const part1 = (wire1, wire2) => {
  const instructions1 = parseInput(wire1);
  const instructions2 = parseInput(wire2);
  const path1 = executeInstructions(instructions1);
  const path2 = executeInstructions(instructions2);
  const intersectingPositions = intersect(path1, path2);

  return manhattanDistance(intersectingPositions);
};

// console.log(executeInstruction(["R", 12], { x: 0, y: 0 }, []));
// console.log(part1("R8,U5,L5,D3", "U7,R6,D4,L4"));
// console.log(part1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"));
// console.log(
//   part1(
//     "R75,D30,R83,U83,L12,D49,R71,U7,L72",
//     "U62,R66,U55,R34,D71,R55,D58,R83",
//   ),
// );

export const input = Deno.readTextFileSync("input.txt");
const testPart1 = () => {
  const splittedInput = input.split("\n");
  // console.log(splittedInput);
  console.log(part1(splittedInput[0], splittedInput[1]));
};

// testPart1();
