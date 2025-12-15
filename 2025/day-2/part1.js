
const puzzleInput = Deno.readTextFileSync('input.txt');
const parseInput = (input) => {
  return input.split(',').map(range => {
    const [start, end] = range.split('-');
    return {start : parseInt(start), end : parseInt(end)}
});
}

const noOfDigit = (num) => num.toString().length;

const isInvalidId = (id) => {
  const totalDigits = noOfDigit(id);
  const divisor = Math.pow(10,Math.floor(totalDigits/2));
  return Math.floor(id / divisor) === id % divisor;
}

const sumOfAllInvalidIds = (ranges) => {
  let sum = 0;
  ranges.forEach(({start, end}) => {
    for(let id = start; id <= end; id++) {
      sum += isInvalidId(id) ? id : 0;
    }
  });
  return sum;
}

const part1 = (puzzleInput) => {
  const ranges = parseInput(puzzleInput);
  return sumOfAllInvalidIds(ranges);
}
console.log(part1(puzzleInput));