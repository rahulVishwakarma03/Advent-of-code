import { input } from "./input.js";
import { permutations } from "jsr:@std/collections";

const parseOpcodeAndModes = (data) => {
  // const integer = parseInt(data);
  const opcode = data % 100;
  const p1Mode = Math.floor(data / 100) % 10;
  const p2Mode = Math.floor(data / 1000) % 10;
  const p3Mode = Math.floor(data / 10000) % 10;

  return { opcode, p1Mode, p2Mode, p3Mode };
};

const operandsBasedOnMode = {
  0: (data, index) => {
    // console.log(data, param);
    return data[index];
  },
  1: (data, index) => index,
};

const add = (
  data,
  i,
  o,
  { p1Mode, p2Mode, p3Mode },
  { p1Idx, p2Idx, p3Idx },
) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const operand2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const operand3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[operand3Index] = data[operand1Index] + data[operand2Index];
  return p1Idx + 3;
};

const mul = (
  data,
  i,
  o,
  { p1Mode, p2Mode, p3Mode },
  { p1Idx, p2Idx, p3Idx },
) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const operand2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const operand3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[operand3Index] = data[operand1Index] * data[operand2Index];
  return p1Idx + 3;
};

const takeInput = (data, input, output, { p1Mode }, { p1Idx }) => {
  // const input = prompt("Enter input : ");
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  data[operand1Index] = input[0];
  input[0] = output[0];
  // data[operand1Index] = 8;
  return p1Idx + 1;
};

const displayOutput = (data, i, output, { p1Mode }, { p1Idx }) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  output[0] = data[operand1Index];
  // console.log(output[0]);
  return p1Idx + 1;
};

const jumpIfTrue = (data, i, o, { p1Mode, p2Mode }, { p1Idx, p2Idx }) => {
  const param1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const param2Index = operandsBasedOnMode[p2Mode](data, p2Idx);

  if (data[param1Index] !== 0) {
    return data[param2Index];
  }

  return p1Idx + 2;
};

const jumpIfFalse = (data, i, o, { p1Mode, p2Mode }, { p1Idx, p2Idx }) => {
  const param1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const param2Index = operandsBasedOnMode[p2Mode](data, p2Idx);

  if (data[param1Index] === 0) {
    return data[param2Index];
  }

  return p1Idx + 2;
};

const lessThan = (
  data,
  i,
  o,
  { p1Mode, p2Mode, p3Mode },
  { p1Idx, p2Idx, p3Idx },
) => {
  const param1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const param2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const param3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[param3Index] = data[param1Index] < data[param2Index] ? 1 : 0;

  return p1Idx + 3;
};

const equals = (
  data,
  i,
  o,
  { p1Mode, p2Mode, p3Mode },
  { p1Idx, p2Idx, p3Idx },
) => {
  const param1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const param2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const param3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[param3Index] = data[param1Index] === data[param2Index] ? 1 : 0;

  return p1Idx + 3;
};

const operations = {
  1: add,
  2: mul,
  3: takeInput,
  4: displayOutput,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  99: () => {
    return -1;
  },
};

export const executeInstruction = (data, input, output) => {
  let i = 0;
  while (i >= 0 && i < data.length) {
    const { opcode, ...modes } = parseOpcodeAndModes(data[i]);
    // console.log(opcode, i);
    const nextIndex = operations[opcode](
      data,
      input,
      output,
      modes,
      { p1Idx: i + 1, p2Idx: i + 2, p3Idx: i + 3 },
    );
    // console.log(data,output,i,opcode);
    // if (nextIndex === -1) {
    //   return;
    // }
    i = nextIndex;
    // console.log(i);
  }
  return i;
};

const part1 = (input) => {
  const data = input.slice();
  const phaseSettingSequence = permutations([0, 1, 2, 3, 4]);
  const allOutputSignals = [];
  phaseSettingSequence.map((sequence) => {
    const output = [0];
    sequence.forEach((input) => {
      executeInstruction(data, [input], output);
    });
    // console.log(output);
    allOutputSignals.push(output[0]);
  });
  return Math.max(...allOutputSignals);
};

// const input1 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
// 27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5
// ];
// const input2 = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
// const input3 = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
// -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
// 53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
// const input4 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
// 1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0
// ];
// const input = [3,23,3,24,1002,24,10,24,1002,23,-1,23,
// 101,5,23,23,1,24,23,23,4,23,99,0,0];

// console.log(part1(input));

// console.log(permutations([1,2,3]))



const part2 = (input) => {
  const data = input.slice();
  // const phaseSettingSequence = permutations([5, 6, 7, 8, 9]);
  // const allOutputSignals = [];
  // phaseSettingSequence.map((sequence) => {
  //   const output = [0];
  //   sequence.forEach((input) => {
  //     console.log(executeInstruction(data, [input], output))
  //     // console.log(output);
        
  //   });
  //   allOutputSignals.push(output[0]);
  // });
  const sequence = [9,8,7,6,5];
  const output = [0];
  let count = 0;
  let i = 0;
  while (true) {
    count++
    const result = executeInstruction(data, [sequence[i]], output);
    if (result === -1) {
      // allOutputSignals.push(output[0]);
      return [output,count];
    }
    i = (i + 1) % 5;
  }
  // return output;
  
  // return Math.max(...allOutputSignals);
};

console.log(part2([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]));


// console.log(part2(input4))