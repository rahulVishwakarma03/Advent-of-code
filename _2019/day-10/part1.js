import { distinctBy, maxBy } from "jsr:@std/collections";

export const input = Deno.readTextFileSync("./input.txt");

export const parseInput = (input) => {
  return input.split("\n").map((x) => x.split(""));
};

export const parseAsteroidsCoordinates = (data) => {
  const asteroidsCoordinate = data.flatMap((row, i) => {
    const coords = row.map((el, j) => {
      if (el === "#") return { x: j, y: i };
      else return "";
    });
    return coords;
  });

  return asteroidsCoordinate.filter((x) => x !== "");
};

const calcAngleDegrees = (x, y) => {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

export const asteroidsPositionRelativeTo = (asteroid, asteroids) => {
    const { x: x1, y: y1 } = asteroid;
    return asteroids
      .filter(({ x, y }) => !(x === x1 && y === y1))
      .map(({ x, y }) => ({
        x: x - x1,
        y: y - y1,
        angle: calcAngleDegrees(x - x1, y - y1),
      }));

  };

export const monitoringStation = (asteroids) => {
  const detectableAsteroidsByEach = asteroids.map((asteroid,_, asteroids) => {
    const detectableAsteroidsBy = distinctBy(asteroidsPositionRelativeTo(asteroid,asteroids), asteroid => asteroid.angle)
    return {...asteroid,totalDetectableAsteroids : detectableAsteroidsBy.length};
  })
 
  return maxBy(detectableAsteroidsByEach, el => el.totalDetectableAsteroids);
};

const part1 = (input) => {
  const data = parseInput(input);
  const asteroids = parseAsteroidsCoordinates(data);

  return monitoringStation(asteroids);
};

// console.log(part1(input));
