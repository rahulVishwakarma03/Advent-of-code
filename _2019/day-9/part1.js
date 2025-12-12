import { input } from "./input.js";
// import { permutations } from "jsr:@std/collections";

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
  2: (data, index, base) => base[0] + data[index]
};

const add = (
  data,
  { p1Idx, p2Idx, p3Idx },
  currentIndex
) => {
  data[p3Idx] = data[p1Idx] + data[p2Idx];
  return currentIndex + 4;
};

const mul = (
  data,
  { p1Idx, p2Idx, p3Idx },
  currentIndex
) => {
  data[p3Idx] = data[p1Idx] * data[p2Idx];
  return currentIndex + 4;
};

const takeInput = (data, { p1Idx }, currentIndex) => {
  data[p1Idx] = parseInt(prompt("Enter input : "));
  return currentIndex + 2;
};

const displayOutput = (data, { p1Idx }, currentIndex) => {
  console.log(data[p1Idx]);
  return currentIndex + 2;
};

const jumpIfTrue = (data, { p1Idx, p2Idx }, currentIndex) => {
  if (data[p1Idx] !== 0) {
    return data[p2Idx];
  }

  return currentIndex + 3;
};

const jumpIfFalse = (data,{ p1Idx, p2Idx }, currentIndex) => {
  if (data[p1Idx] === 0) {
    return data[p2Idx];
  }

  return currentIndex + 3;
};

const lessThan = (
  data,
  { p1Idx, p2Idx, p3Idx },
  currentIndex
) => {
  data[p3Idx] = data[p1Idx] < data[p2Idx] ? 1 : 0;

  return currentIndex + 4;
};

const equals = (
  data,
  { p1Idx, p2Idx, p3Idx },
  currentIndex
) => {
  data[p3Idx] = data[p1Idx] === data[p2Idx] ? 1 : 0;

  return currentIndex + 4;
};

const adjustRelativeBase = (data, {p1Idx}, currentIndex, base) => {
  base[0] += data[p1Idx];
  return currentIndex + 2
}

const operations = {
  1: add,
  2: mul,
  3: takeInput,
  4: displayOutput,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  9: adjustRelativeBase,
  99: () => {
    return -1;
  },
};

export const executeInstructions = (data) => {
  const base = [0];
  let i = 0;
  while (i >= 0 && i < data.length) {
    const { opcode, p1Mode, p2Mode, p3Mode } = parseOpcodeAndModes(data[i]);
    const param1Index = operandsBasedOnMode[p1Mode](data, i+1,base);
    const param2Index = operandsBasedOnMode[p2Mode](data, i+2,base);
    const param3Index = operandsBasedOnMode[p3Mode](data, i+3, base);

    const nextIndex = operations[opcode](
      data,
      { p1Idx: param1Index, p2Idx: param2Index, p3Idx: param3Index },
      i,
      base
    );
    i = nextIndex;
  }
  return base;
};

const part1 = (input) => {
  const data = input.slice();
  // console.log(data);
  return executeInstructions(data);
};

console.log(part1(input));//Enter 1 as input
//For part2 , Enter 2 as input

// console.log(part1([1102,34915192,34915192,7,4,7,99,0]))
// console.log(part1([104,1125899906842624,99]))
