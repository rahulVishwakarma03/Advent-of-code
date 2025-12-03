import { isDecreasing } from "./part1.js";

const isSameAdjacent = (num) => {
  const regex = /(\d)\1+/g;
  const allNumberHavingSameAdjacent = num.match(regex);
  if (allNumberHavingSameAdjacent) {
    return allNumberHavingSameAdjacent.filter((x) => x.length === 2).length > 0;
  }

  return false;
};

export const part2 = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    const numString = i.toString();
    count += isSameAdjacent(numString) && !isDecreasing(numString) ? 1 : 0;
  }

  return count;
};

console.log(part2(271973, 785961));
