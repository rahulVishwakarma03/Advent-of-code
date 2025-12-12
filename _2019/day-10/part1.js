import { distinct } from "@std/collections/distinct";
import { zip } from "@std/collections/zip";

export const input = Deno.readTextFileSync("./input.txt");

export const parseInput = (input) => {
  return input.split("\n").map((x) => x.split(""));
};

export const getAsteroidsCoordinates = (data) => {
  const asteroidsCoordinate = data.flatMap((row, i) => {
    const coords = row.map((el, j) => {
      if (el === "#") return { x: j, y: i };
      else return "";
    });
    return coords;
  });

  return asteroidsCoordinate.filter((x) => x !== "");
};

export const classifyCoordinatesBasedOnQuadrant = (coordinates) => {
  const firstQuadrant = coordinates.filter(({ x, y }) => x >= 0 && y >= 0);
  const secondQuadrant = coordinates.filter(({ x, y }) => x < 0 && y >= 0);
  const thirdQuadrant = coordinates.filter(({ x, y }) => x < 0 && y < 0);
  const fourthQuadrant = coordinates.filter(({ x, y }) => x >= 0 && y < 0);

  return [firstQuadrant, secondQuadrant, thirdQuadrant, fourthQuadrant];
};

export const ratioOfCoordsOfAllQuadrants = (coordinates) => {
  const allQuadrants = classifyCoordinatesBasedOnQuadrant(coordinates);

  return allQuadrants.map((quadrant) => quadrant.map(({ x, y }) => x / y));
};

export const monitoringStation = (asteroids) => {
  const noOfAsteroidDetected = asteroids.map((asteroid, _, asteroids) => {
    const { x: dx, y: dy } = asteroid;

    const newCoordinates = asteroids.map(({ x, y }) => ({
      x: x - dx,
      y: y - dy,
    }));

    const newCoordinatesWithoutCurrentAstroid = newCoordinates.filter((
      { x, y },
    ) => !(x === 0 && y === 0));

    const quadrantsCoordsRatio = ratioOfCoordsOfAllQuadrants(
      newCoordinatesWithoutCurrentAstroid,
    );

    return [
      ...distinct(quadrantsCoordsRatio[0]),
      ...distinct(quadrantsCoordsRatio[1]),
      ...distinct(quadrantsCoordsRatio[2]),
      ...distinct(quadrantsCoordsRatio[3]),
    ].length;
  });

  console.log(Math.max(...noOfAsteroidDetected));
  const indexOfMonitoringStation = noOfAsteroidDetected.indexOf(
    Math.max(...noOfAsteroidDetected),
  );
  return asteroids[indexOfMonitoringStation];
};

const part1 = (input) => {
  const data = parseInput(input);
  const asteroids = getAsteroidsCoordinates(data);

  return monitoringStation(asteroids);
};

// console.log(part1(input));
