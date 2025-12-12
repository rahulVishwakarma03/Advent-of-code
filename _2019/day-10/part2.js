import { withoutAll,distinctBy, sortBy } from "jsr:@std/collections";
import { parseInput,input,getAsteroidsCoordinates,monitoringStation, classifyCoordinatesBasedOnQuadrant } from "./part1.js";


const generateVaporizationSequence = (quadrants) => {
  if(quadrants.flatMap(x => x).length === 0) return [];
  
  const vaporizationSequenceInCurrentRotation = quadrants.flatMap(quadrant => distinctBy(quadrant, asteroid => asteroid.ratio));
  const vaporizationSequenceInNextRotation = generateVaporizationSequence(quadrants.map(quadrant => withoutAll(quadrant, distinctBy(quadrant, asteroid => asteroid.ratio))))
  return [...vaporizationSequenceInCurrentRotation,...vaporizationSequenceInNextRotation];
}

const vaporizeAsteroids = (asteroids) => {
  const quadrantsSequence = [asteroids[3],asteroids[0],asteroids[1],asteroids[2]];

  return generateVaporizationSequence(quadrantsSequence);
}

const sortCoordsBasedOnRatio = (quadrants) => {
  return quadrants.map(quadrant => {
    return sortBy(sortBy(quadrant, el => el.x + el.y, {order : "asc"}),el => el.ratio,{order:"desc"})
  })
}

const newCoordinatesForAsteroids = (asteroids, {x:dx, y:dy}) => {
  return asteroids.map(({x,y}) => ({x:x-dx, y:y-dy, ratio : (x-dx)/(y-dy)}));
}

const part2 = (input) => {
  const data = parseInput(input);
  const asteroids = getAsteroidsCoordinates(data);
  const station = monitoringStation(asteroids);
  const otherAsteroidsCoordinate = asteroids
  .map(({ x, y }) => ({
    x: x - station.x,
    y: y - station.y,
  }))
  .filter(({ x, y }) => !(x === 0 && y === 0));
  const coordsOfEachQuadrants = classifyCoordinatesBasedOnQuadrant(otherAsteroidsCoordinate)
  const asteroidsWithCoordsAndRatio = coordsOfEachQuadrants.map(quadrant => quadrant.map(({x,y}) => ({x,y,ratio : x/y})));
  
  const sortedCoords = sortCoordsBasedOnRatio(asteroidsWithCoordsAndRatio)
  const vaporizationSequence = vaporizeAsteroids(sortedCoords);
  // return {x:vaporizationSequence[199].x+station.x, y: vaporizationSequence[199].y + station.y}
  return (vaporizationSequence[199].x+station.x) * 100 + (vaporizationSequence[199].y + station.y)
};

console.log(part2(input));
