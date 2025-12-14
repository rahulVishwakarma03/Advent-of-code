import { distinctBy, sortBy, withoutAll } from "jsr:@std/collections";
import {
  asteroidsPositionRelativeTo,
  input,
  monitoringStation,
  parseAsteroidsCoordinates,
  parseInput,
} from "./part1.js";

const generateVaporizationSequence = (asteroids) => {
  if (asteroids.length === 0) return [];

  const vaporizationSequenceInCurrentRotation = distinctBy(
    asteroids,
    (asteroid) => asteroid.angle,
  );
  const vaporizationSequenceInNextRotation = generateVaporizationSequence(
    withoutAll(asteroids, vaporizationSequenceInCurrentRotation),
  );
  return [
    ...vaporizationSequenceInCurrentRotation,
    ...vaporizationSequenceInNextRotation,
  ];
};

const sortCoordsBasedOnAngle = (asteroids) => {
  const modifiedAngleOfAsteroids = asteroids.map(({ x, y, angle }) => ({
    x,
    y,
    angle: (angle + 360 + 90) % 360,
  }));
  return sortBy(
    sortBy(modifiedAngleOfAsteroids, (el) => parseInt(el.x) + parseInt(el.y), {
      order: "desc",
    }),
    (el) => el.angle,
    { order: "asc" },
  );
};

const vaporizeAsteroids = (asteroids) => {
  const sortedCoords = sortCoordsBasedOnAngle(asteroids);
  return generateVaporizationSequence(sortedCoords);
};

const part2 = (input) => {
  const data = parseInput(input);
  const asteroids = parseAsteroidsCoordinates(data);
  const station = monitoringStation(asteroids);
  const otherAsteroids = asteroidsPositionRelativeTo(station, asteroids);

  const vaporizationSequence = vaporizeAsteroids(otherAsteroids);
  // return {x: vaporizationSequence[199].x + station.x, y: vaporizationSequence[199].y + station.y}
  return (vaporizationSequence[199].x + station.x) * 100 +
    (vaporizationSequence[199].y + station.y);
};

console.log(part2(input));
