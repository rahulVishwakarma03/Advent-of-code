import { chunk } from "@std/collections/chunk";
export const input = Deno.readTextFileSync("input.txt");
const countElement = (array, element) => 
  array.reduce((count, el) => el === element ? count + 1: count, 0);

const part1 = (imgData,width, height) => {
  const layers = chunk(imgData.split(''), width * height);
  const noOfZeros = layers.map(el => countElement(el, "0"));
  const layerWithFewestZero = layers[noOfZeros.indexOf(Math.min(...noOfZeros))];
  


  return countElement(layerWithFewestZero,"1") * countElement(layerWithFewestZero, "2");
}

// console.log(part1(input, 25,6));
