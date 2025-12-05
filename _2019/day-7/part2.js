
import { input } from "./input.js";
import { permutations } from "jsr:@std/collections";

const parseOpcodeAndModes = (data) => {
  const opcode = data % 100;
  const p1Mode = Math.floor(data / 100) % 10;
  const p2Mode = Math.floor(data / 1000) % 10;
  const p3Mode = Math.floor(data / 10000) % 10;

  return { opcode, p1Mode, p2Mode, p3Mode };
};

const operandsBasedOnMode = {
  0: (data, index) => {
    return data[index];
  },
  1: (data, index) => index,
};

const add = (
  data,
  amplifier,
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
  amplifier,
  { p1Mode, p2Mode, p3Mode },
  { p1Idx, p2Idx, p3Idx },
) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const operand2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const operand3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[operand3Index] = data[operand1Index] * data[operand2Index];
  return p1Idx + 3;
};

const takeInput = (data, amplifier, { p1Mode }, { p1Idx }) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  data[operand1Index] = amplifier.input;
  amplifier.input = amplifier.output;
  return p1Idx + 1;
};

const displayOutput = (data, amplifier, { p1Mode }, { p1Idx }) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  amplifier.output = data[operand1Index];
  // console.log(output[0],p1Idx-1);
  // return p1Idx + 1;
  return -2;
};

const jumpIfTrue = (data, amplifier, { p1Mode, p2Mode }, { p1Idx, p2Idx }) => {
  const param1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const param2Index = operandsBasedOnMode[p2Mode](data, p2Idx);

  if (data[param1Index] !== 0) {
    return data[param2Index];
    // return param2Index;
  }

  return p1Idx + 2;
};

const jumpIfFalse = (data, amplifier, { p1Mode, p2Mode }, { p1Idx, p2Idx }) => {
  const param1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const param2Index = operandsBasedOnMode[p2Mode](data, p2Idx);

  if (data[param1Index] === 0) {
    return data[param2Index];
    // return param2Index;
  }

  return p1Idx + 2;
};

const lessThan = (
  data,
  amplifier,
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
  amplifier,
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
  99: (data, amplifier) => {
    amplifier.isHalt = true;
    return -1;
  },
};

export const executeInstruction = (amplifier) => {
  if (amplifier.isHalt) {
    return;
  }
  const data = amplifier.data;
  let i = 0 + amplifier.index;
  while (i >= 0 && i < data.length) {
    const { opcode, ...modes } = parseOpcodeAndModes(data[i]);
    const nextIndex = operations[opcode](
      data,
      amplifier,
      modes,
      { p1Idx: i + 1, p2Idx: i + 2, p3Idx: i + 3 },
    );

    amplifier.index = i + 2;
    i = nextIndex;
  }
  return i;
};

const createAmp = (data, sequence) => {
  return sequence.map((el) => {
    return {
      data: [...data],
      phase: el,
      input: el,
      output: 0,
      index: 0,
      isHalt: false,
    };
  });
};

const isAllAmpHalted = (amplifiers) =>
  amplifiers.every((amp) => amp.isHalt === true);


const part2 = (input) => {
  const data = input.slice();

  const phaseSettingSequence = permutations([5, 6, 7, 8, 9]);
  
  const allOutputSignals = phaseSettingSequence.map((sequence) => {
    const amplifiers = createAmp(data, sequence);

    amplifiers.forEach((amp, i) => {
      executeInstruction(amp);
      console.log(amp.phase, amp.input, amp.output, amp.isHalt);
      amplifiers[(i + 1) % 5].output = amp.output;
    });

    let i = 0;
    while (true) {
      if (isAllAmpHalted(amplifiers)) {
        return amplifiers[i].output;
      }
      console.log(
        amplifiers[i].phase,
        amplifiers[i].output,
        amplifiers[i].isHalt,
      );
      amplifiers[i].input = amplifiers[i].output;
      executeInstruction(amplifiers[i]);
      amplifiers[(i + 1) % 5].output = amplifiers[i].output;
      i = (i + 1) % 5;
    }
  });
  // console.log(amplifiers[4].output)
  return Math.max(...allOutputSignals);
};

console.log(part2(input));

// console.log(part2([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]))

// console.log(part2([3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
// -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
// 53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]));

// console.log(part2([3,8,1001,8,10,8,105,1,0,0,21,46,55,68,89,110,191,272,353,434,99999,3,9,1002,9,3,9,1001,9,3,9,102,4,9,9,101,4,9,9,1002,9,5,9,4,9,99,3,9,102,3,9,9,4,9,99,3,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,1001,9,5,9,1002,9,2,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,102,3,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99]))
