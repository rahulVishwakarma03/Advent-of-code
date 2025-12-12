import { chunk } from "@std/collections/chunk";
import { zip } from "@std/collections/zip";
import { input } from "./part1.js";

const part2 = (imgData,width, height) => {
  const layers = chunk(imgData.split(''), width * height);
  const transposeOfLayers = zip(...layers);
  const imgLayer = transposeOfLayers.map(layer => layer[layer.findIndex(x => x !== '2')]);
  
  const chunksOfImg = chunk(imgLayer,width);

  const img = chunksOfImg.map(x => x.join('')).join('\n').replaceAll('0',"⬜️");
  
  return img.replaceAll('1', "⬛️");
}

console.log(part2(input, 25,6));
// console.log(part2("0222112222120000", 2,2));
