const puzzleInput = Deno.readTextFileSync('input.txt');
const parseInput = (input) => {
  return input.split(',').map(range => {
    const [start, end] = range.split('-');
    return {start : parseInt(start), end : parseInt(end)}
});
}

const isInvalidId = (num) => {
  const id = num.toString();
  let invalidId = id[0];
  let isInvalid = false;
  let i = 1;
  while(i<id.length) {
    // console.log(i, isInvalid,invalidId,id.slice(i,i+invalidId.length));
    if(invalidId === id.slice(i,i+invalidId.length)) {
      // console.log("equal");
      i += invalidId.length;
      isInvalid = true;
    }
    else if(invalidId !== id.slice(i,i+invalidId.length)) {
      // console.log("not equal");
      invalidId = id.slice(0,i+1);
      i = invalidId.length;
      isInvalid = false;
    }
  }
  return isInvalid;
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