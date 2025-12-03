const isSameAdjacent = (num) => {
  const regex = /(\d)\1/g;
  return regex.test(num);
};

export const isDecreasing = (num) => {
  for (let i = 1; i < num.length; i++) {
    if (num[i] < num[i - 1]) return true;
  }
  return false;
};

export const part1 = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    const numString = i.toString();
    count += isSameAdjacent(numString) && !isDecreasing(numString) ? 1 : 0;
  }

  return count;
};

// console.log(part1(271973, 785961));
