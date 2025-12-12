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
  { p1Idx, p2Idx, p3Idx },
  currentIndex,
) => {
  data[p3Idx] = data[p1Idx] + data[p2Idx];
  return currentIndex + 4;
};

const mul = (
  data,
  amplifier,
  { p1Idx, p2Idx, p3Idx },
  currentIndex,
) => {
  data[p3Idx] = data[p1Idx] * data[p2Idx];
  return currentIndex + 4;
};

const takeInput = (data, amplifier, { p1Idx }, currentIndex) => {
  data[p1Idx] = amplifier.input;
  amplifier.input = amplifier.output;
  return currentIndex + 2;
};

const displayOutput = (data, amplifier, { p1Idx }) => {
  amplifier.output = data[p1Idx];
  return -2;
};

const jumpIfTrue = (data, amplifier, { p1Idx, p2Idx }, currentIndex) => {
  if (data[p1Idx] !== 0) {
    return data[p2Idx];
  }

  return currentIndex + 3;
};

const jumpIfFalse = (data, amplifier, { p1Idx, p2Idx }, currentIndex) => {
  if (data[p1Idx] === 0) {
    return data[p2Idx];
  }

  return currentIndex + 3;
};

const lessThan = (
  data,
  amplifier,
  { p1Idx, p2Idx, p3Idx },
  currentIndex,
) => {
  data[p3Idx] = data[p1Idx] < data[p2Idx] ? 1 : 0;

  return currentIndex + 4;
};

const equals = (
  data,
  amplifier,
  { p1Idx, p2Idx, p3Idx },
  currentIndex,
) => {
  data[p3Idx] = data[p1Idx] === data[p2Idx] ? 1 : 0;

  return currentIndex + 4;
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

export const executeInstructions = (amplifier) => {
  if (amplifier.isHalt) {
    return;
  }
  const data = amplifier.data;
  let i = 0 + amplifier.index;
  while (i >= 0 && i < data.length) {
    const { opcode, p1Mode, p2Mode, p3Mode } = parseOpcodeAndModes(data[i]);
    const param1Index = operandsBasedOnMode[p1Mode](data, i + 1);
    const param2Index = operandsBasedOnMode[p2Mode](data, i + 2);
    const param3Index = operandsBasedOnMode[p3Mode](data, i + 3);
    const nextIndex = operations[opcode](
      data,
      amplifier,
      { p1Idx: param1Index, p2Idx: param2Index, p3Idx: param3Index },
      i,
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

const executeAmplifiers = (phaseSettingSequence, data) => {
  const allOutputSignals = phaseSettingSequence.map((sequence) => {
    const amplifiers = createAmp(data, sequence);

    amplifiers.forEach((amp, i) => {
      executeInstructions(amp);
      amplifiers[(i + 1) % 5].output = amp.output;
    });

    let i = 0;
    while (true) {
      if (isAllAmpHalted(amplifiers)) {
        return amplifiers[i].output;
      }
      amplifiers[i].input = amplifiers[i].output;
      executeInstructions(amplifiers[i]);
      amplifiers[(i + 1) % 5].output = amplifiers[i].output;
      i = (i + 1) % 5;
    }
  });
  return Math.max(...allOutputSignals);
};

const part2 = (input) => {
  const data = input.slice();

  const phaseSettingSequence = permutations([5, 6, 7, 8, 9]);

  return executeAmplifiers(phaseSettingSequence, data);
};

console.log(part2(input));

// console.log(part2([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]))

// console.log(part2([3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
// -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
// 53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]));

// console.log(part2([3,8,1001,8,10,8,105,1,0,0,21,46,55,68,89,110,191,272,353,434,99999,3,9,1002,9,3,9,1001,9,3,9,102,4,9,9,101,4,9,9,1002,9,5,9,4,9,99,3,9,102,3,9,9,4,9,99,3,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,1001,9,5,9,1002,9,2,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,102,3,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99]))
