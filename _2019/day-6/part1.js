export const parseInput = (inputString) => {
  const orbitsData = {};
  const data = inputString.split("\n").map((x) => x.split(")"));
  // const data = inputString.split("\n").split(")");

  data.forEach((element) => {
    orbitsData[element[1]] = element[0];
  });
  return orbitsData;
};

export const totalOrbitsOfAPlanet = (orbitsData, planet) => {
  const orbits = [];

  while (orbitsData[planet]) {
    orbits.push(orbitsData[planet]);
    planet = orbitsData[planet];
  }

  return orbits;
};

const totalOrbitsOfAllPlanet = (orbitsData) => {
  let sum = 0;
  const planets = Object.keys(orbitsData);
  planets.forEach((planet) => {
    sum += totalOrbitsOfAPlanet(orbitsData, planet).length;
  });
  return sum;
};

const part1 = (input) => {
  const orbitsData = parseInput(input);
  return totalOrbitsOfAllPlanet(orbitsData);
};

export const input = Deno.readTextFileSync("input.txt");
// console.log(part1(input));
