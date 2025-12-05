import { fuelRequired, input, parseInput, sumOfArray } from "./part-1.js";

const fuelRequiredForFuel = (mass) => {
  let sum = 0;
  while (mass > 0) {
    const fuelMass = fuelRequired(mass);
    sum += fuelMass > 0 ? fuelMass : 0;
    mass = fuelMass;
  }
  return sum;
};

const part2 = (input) => {
  const mass = parseInput(input);
  const fuel = mass.map((x) => fuelRequiredForFuel(x));

  return sumOfArray(fuel);
};

console.log(part2("14"));
console.log(part2("1969"));
console.log(part2("100756"));
console.log(part2(input));
