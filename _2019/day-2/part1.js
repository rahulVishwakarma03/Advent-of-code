const executeInstruction = (data) => {
  
  let i = 0;
  while (i < data.length) {
    if (data[i] === 1) {
      data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
    } else if (data[i] === 2) {
      data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
    }
  
    if (data[i] === 99) return data[0];
    i += 4;
  }
}

const part1 = (input) => {
  const data = input.slice();
  data[1] = 12;
  data[2] = 2;
  return executeInstruction(data);
};

const input = [
  1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19
  ,1,19,10,23,2,10,23,27,1,27,6,31,1,13,31,
  35,1,13,35,39,1,39,10,43,2,43,13,47,1,47,
  9,51,2,51,13,55,1,5,55,59,2,59,9,63,1,13,
  63,67,2,13,67,71,1,71,5,75,2,75,13,79,1,
  79,6,83,1,83,5,87,2,87,6,91,1,5,91,95,1,
  95,13,99,2,99,6,103,1,5,103,107,1,107,9,
  111,2,6,111,115,1,5,115,119,1,119,2,123,
  1,6,123,0,99,2,14,0,0]

console.log(part1(input));

// console.log(part1([1, 0, 0, 0, 99]));
// console.log(part1([2, 3, 0, 3, 99]));
// console.log(part1([2, 4, 4, 5, 99, 0]));
// console.log(part1([1, 1, 1, 4, 99, 5, 6, 0, 99]));
