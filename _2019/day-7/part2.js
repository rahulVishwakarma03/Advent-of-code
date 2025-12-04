import { executeInstruction } from "./part1.js";

const part2 = (input) => {
  const data = input.slice();
  // const phaseSettingSequence = [4, 3, 2, 1, 0];
  // const phaseSettingSequence = permutations([5, 6, 7, 8, 9]);
  const allOutputSignals = [];
  // const phaseSettingSequence = [0,1,2,3,4];
  // phaseSettingSequence.map((sequence) => {
  //   const output = [0];
  //   sequence.forEach((input) => {
  //     if(executeInstruction(data, [input], output) === -1) {
  //       allOutputSignals.push(output[0]);
  //       return;
  //     }
  //   });
  //   // console.log(output);
  // });

  const output = [0];
  const sequence = [9, 8, 7, 6, 5];
  let i = 0;
  while (i!==4) {
    executeInstruction(data, [sequence[i]], output);
    console.log(output);
    // if (result === -1) {
    //   // allOutputSignals.push(output[0]);
    //   return output;
    // }
    i = (i + 1) % 5;
  }
  return output;
  // return Math.max(...allOutputSignals);
};

// console.log(part2([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
// 27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]));
