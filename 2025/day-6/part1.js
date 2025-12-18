import { zip } from "jsr:@std/collections";
export const puzzleInput = Deno.readTextFileSync('input.txt');
const parsePuzzleInput = (puzzleInput) => {
  const input = puzzleInput.split('\n').map(el => el.split(' ').filter(x => x));
  const operandsInVerticalOrder = input.slice(0,input.length-1);
  const operandsInHorizontalOrder = zip(...operandsInVerticalOrder);
  const operators = input[input.length-1];

  return [operandsInHorizontalOrder, operators]
}

const performOperation = (operands, operator) => {
  return eval(operands.join(operator))
}

export const grandTotalOf = (setOfOperands, operators) => {
  let total = 0;
  setOfOperands.forEach((operands,operatorIndex) => {
    total += performOperation(operands,operators[operatorIndex]);
  });
  return total;
}

const part1 = (puzzleInput) => {
const [setOfOperands, operators] = parsePuzzleInput(puzzleInput);

return grandTotalOf(setOfOperands, operators)
}

// console.log(part1(puzzleInput));