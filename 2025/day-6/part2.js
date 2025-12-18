import {zip } from "jsr:@std/collections";
import { grandTotalOf, puzzleInput } from "./part1.js";

const parseOperands = (operandsData) => {
  const collectionOfAllOperandsWithBlankSpaces = zip(...operandsData).map(el => el.join(''));
  const setOfOperands = collectionOfAllOperandsWithBlankSpaces.toString().split(',    ,').map(el => el.split(','))
  return setOfOperands;
}

const parsePuzzleInput = (puzzleInput) => {
    const input = puzzleInput.split('\n').map(el => el.split(''));
    const operators = input[input.length-1].filter(op => op !== " ");
    const operandsData = input.slice(0,input.length-1);
  return [parseOperands(operandsData), operators];
}

const part2 = (puzzleInput) => {
  const [setOfOperands, operators] = parsePuzzleInput(puzzleInput);
  return grandTotalOf(setOfOperands, operators)
}

console.log(part2(puzzleInput));