import { executeInstructions, input, intersect, parseInput } from "./part1.js";

const fewestCombinedSteps = (path1, path2, intersectingPositions) => {
  const sum = intersectingPositions.map(([x1, y1]) => {
    let steps = 0;
    path1.forEach(([x2, y2], i) => {
      if (x1 === x2 && y1 === y2) {
        steps += i + 1;
      }
    });

    path2.forEach(([x2, y2], i) => {
      if (x1 === x2 && y1 === y2) {
        steps += i + 1;
      }
    });

    return steps;
  });
  console.log(sum);

  return Math.min(...sum);
};

const part2 = (wire1, wire2) => {
  const instructions1 = parseInput(wire1);
  const instructions2 = parseInput(wire2);
  const path1 = executeInstructions(instructions1);
  const path2 = executeInstructions(instructions2);
  const intersectingPositions = intersect(path1, path2);

  return fewestCombinedSteps(path1, path2, intersectingPositions);
  // return intersectingPositions;
};

const testPart2 = () => {
  const splittedInput = input.split("\n");
  console.log(part2(splittedInput[0], splittedInput[1]));
};
// testPart2();

// console.log(part2("R8,U5,L5,D3", "U7,R6,D4,L4"));
// console.log(
//   part2(
//     "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
//     "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
//   ),
// );
console.log(
  part2(
    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
    "U62,R66,U55,R34,D71,R55,D58,R83",
  ),
);
