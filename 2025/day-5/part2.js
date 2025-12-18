import { mergeRanges, parsePuzzleInput, parseRange, puzzleInput } from "./part1.js";

const countFreshIds = (ranges) => {
  let count = 0;
  ranges.forEach(range => {
    const [start, end] = parseRange(range);
    count += end - start + 1;
  });
  return count
}

const part2 = (puzzleInput) => {
  const freshRanges = parsePuzzleInput(puzzleInput)[0];
  const mergedFreshIdRanges = mergeRanges(freshRanges);
  // console.log(mergedFreshIdRanges);
  return countFreshIds(mergedFreshIdRanges);
}
console.log(part2(puzzleInput));