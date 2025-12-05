export const input = Deno.readTextFileSync("input1.txt");

export const fuelRequired = (mass) => {
  return Math.floor(mass / 3) - 2;
};

export const parseInput = (input) => {
  return input.split("\n").map((x) => parseInt(x));
};

export const sumOfArray = (array) => array.reduce((a, b) => a + b);

const part1 = (input) => {
  const mass = parseInput(input);
  const fuel = mass.map((x) => fuelRequired(x));
  return sumOfArray(fuel);
};

// console.log(part1(input));
// console.log(part1("12"));
// console.log(part1("14"));
// console.log(part1("1969"));
// console.log(part1("100756"));
