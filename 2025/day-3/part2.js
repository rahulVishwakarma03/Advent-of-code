const puzzleInput = Deno.readTextFileSync("input.txt");


const maxJoltage = (bank,totalBatteriesToTurnOn) => {
  const batteries = bank.slice();
  let prevBatteryIndex = 0;
  let joltage = 0;

  for(let i = 1; i<=totalBatteriesToTurnOn; i++) {
    const nextBatteries = batteries.slice(prevBatteryIndex,batteries.length-totalBatteriesToTurnOn+i)
    const battery = Math.max(...nextBatteries)
    prevBatteryIndex = batteries.indexOf(battery, prevBatteryIndex) + 1;
    joltage = joltage * 10 + battery
  }

  return joltage;
};

const sumOfJoltage = (banks,totalBatteriesToTurnOn) => {
  let sum = 0;
  banks.forEach((bank) => {
    sum += maxJoltage(bank,totalBatteriesToTurnOn);
  });
  return sum;
};

const parseInput = (puzzleInput) => {
  return puzzleInput.split("\n").map((bank) =>
    bank.split("").map((x) => parseInt(x))
  );
};

const part2 = (puzzleInput,totalBatteriesToTurnOn) => {
  const banks = parseInput(puzzleInput);
  return sumOfJoltage(banks,totalBatteriesToTurnOn);
};

console.log(part2(puzzleInput, 12));
