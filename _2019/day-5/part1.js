import { input } from "./input.js";

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

const add = (data, { p1Mode, p2Mode, p3Mode }, p1Idx, p2Idx, p3Idx) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const operand2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const operand3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[operand3Index] = data[operand1Index] + data[operand2Index];
  return 4;
};

const mul = (data, { p1Mode, p2Mode, p3Mode }, p1Idx, p2Idx, p3Idx) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  const operand2Index = operandsBasedOnMode[p2Mode](data, p2Idx);
  const operand3Index = operandsBasedOnMode[p3Mode](data, p3Idx);

  data[operand3Index] = data[operand1Index] * data[operand2Index];
  return 4;
};

const takeInput = (data, { p1Mode }, p1Idx) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  // console.log(p1);
  data[operand1Index] = 1;
  return 2;
};

const displayOutput = (data, { p1Mode }, p1Idx) => {
  const operand1Index = operandsBasedOnMode[p1Mode](data, p1Idx);
  console.log(data[operand1Index]);
  return 2;
};

const operations = {
  1: add,
  2: mul,
  3: takeInput,
  4: displayOutput,
  99: () => {
    return 0;
  },
};

export const executeInstruction = (data) => {
  let i = 0;
  while (i < data.length) {
    const { opcode, ...modes } = parseOpcodeAndModes(data[i]);
    const increaseBy = operations[opcode](
      data,
      modes,
      i + 1,
      i + 2,
      i + 3,
    );
    // console.log(data);
    if (!increaseBy) {
      return;
    }
    i += increaseBy;
  }
};

const part1 = (input) => {
  const data = input.slice();
  executeInstruction(data);
  return data;
};

console.log(part1(input));

// console.log(part1([3, 0, 4, 0, 99]));
// console.log(part1([3, 1, 1002, 4, 3, 0, 4, 0]));
// console.log(part1([1001, 0, -200, 0, 4, 0, 4, 1]));
