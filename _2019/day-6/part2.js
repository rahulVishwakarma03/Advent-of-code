import { intersect } from "jsr:@std/collections";
import { input, parseInput, totalOrbitsOfAPlanet } from "./part1.js";

const part2 = (input) => {
  const orbitsData = parseInput(input);
  const orbitsOfYOU = totalOrbitsOfAPlanet(orbitsData, "YOU");
  const orbitsOfSAN = totalOrbitsOfAPlanet(orbitsData, "SAN");
  const commonOrbits = intersect(orbitsOfYOU, orbitsOfSAN)[0];

  return orbitsOfYOU.indexOf(commonOrbits) + orbitsOfSAN.indexOf(commonOrbits);
};

console.log(part2(input));
