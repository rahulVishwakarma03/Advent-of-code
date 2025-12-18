export const puzzleInput = Deno.readTextFileSync("input.txt");

export const parseRange = (range) => {
  return range.split('-').map(x => parseInt(x));
}

const mergeTwoRanges = (range1,range2) => {
  const [start1, end1] = parseRange(range1); 
  const [start2, end2] = parseRange(range2);

  if (start2 >= start1 && start2 <= end1) {
    const start = start1;
    const end = end1 > end2 ? end1 : end2;
    return `${start}-${end}`;
  } else if(start1 >= start2 && start1 <= end2) {
    const start = start2;
    const end = end1 > end2 ? end1 : end2;
    return `${start}-${end}`;
  }
  return;
}

export const mergeRanges = (freshIdRanges) => {
  const ranges = freshIdRanges.slice();

  for(let i=0; i<ranges.length-1; i++) {
    for(let j=i+1; j<ranges.length; j++) {
      const mergedTwoRanges = mergeTwoRanges(ranges[i],ranges[j]);

      if(mergedTwoRanges) {
        ranges[i] = mergedTwoRanges;
        ranges.splice(j,1);
        j--;
        i--;
      } 
    }
  }
  return ranges;
}

const isInRange = (ranges, id) => {
  
  return ranges.some((range) => {
    const [start,end] = parseRange(range);
    return id >= start && id <= end;
  })
}

const countFreshId = (freshIdRanges, ingredientIDs) => {
  const mergedFreshIdRanges = mergeRanges(freshIdRanges);
  let count = 0;
  ingredientIDs.forEach(id => {
    count += isInRange(mergedFreshIdRanges,id) ? 1:0
  });
  return count;
}

export const parsePuzzleInput = (puzzleInput) => {
  return puzzleInput.split('\n\n').map(el => el.split('\n'));
}

const part1 = (puzzleInput) => {
  const [freshIngredientIdRanges,ingredientIDs] = parsePuzzleInput(puzzleInput);
  return countFreshId(freshIngredientIdRanges, ingredientIDs);
}

console.log(part1(puzzleInput));
