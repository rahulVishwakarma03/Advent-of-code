const puzzleInput = Deno.readTextFileSync("input.txt");

const maxJoltage = (bank) => {
  const batteries = bank.slice();
  const firstBattery = Math.max(...batteries.slice(0, batteries.length - 1));
  const secondBattery = Math.max(
    ...batteries.slice(batteries.indexOf(firstBattery) + 1, batteries.length),
  );

  return firstBattery * 10 + secondBattery;
};

const sumOfJoltage = (banks) => {
  let sum = 0;
  banks.forEach((bank) => {
    sum += maxJoltage(bank);
  });
  return sum;
};

const parseInput = (puzzleInput) => {
  return puzzleInput.split("\n").map((bank) =>
    bank.split("").map((x) => parseInt(x))
  );
};

const part1 = (puzzleInput) => {
  const banks = parseInput(puzzleInput);
  return sumOfJoltage(banks);
};

console.log(part1(puzzleInput));
