import { executeInstruction, input } from "./part1.js";

const part2 = (input) => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const data = input.slice();
      data[1] = i;
      data[2] = j;
      if (executeInstruction(data) === 19690720) {
        return 100 * i + j;
      }
    }
  }
  return 0;
};

console.log(part2(input));
