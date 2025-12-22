import { sortBy } from "jsr:@std/collections";

const puzzleInput = Deno.readTextFileSync("input.txt");

const parsePuzzleInput = (puzzleInput) => {
  return puzzleInput.split("\n").map((position) => {
    const [x, y, z] = position.split(",").map((x) => parseInt(x));
    return { x, y, z };
  });
};
const distance = (position1, position2) => {
  const { x: x1, y: y1, z: z1 } = position1;
  const { x: x2, y: y2, z: z2 } = position2;
  return Math.sqrt(
    Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2),
  );
};

const getConnections = (junctionBoxes) => {
  const distances = [];
  for (let i = 0; i < junctionBoxes.length - 1; i++) {
    for (let j = i + 1; j < junctionBoxes.length; j++) {
      const curr = {
        box1: { ...junctionBoxes[i] },
        box2: { ...junctionBoxes[j] },
        distance: distance(junctionBoxes[i], junctionBoxes[j]),
      };
      distances.push(curr);
    }
  }
  return sortBy(distances, (x) => x.distance);
};

const findIndexOf = (circuits, { x, y, z }) => {
  for (let i = 0; i < circuits.length; i++) {
    const isInclude = circuits[i].find((el) =>
      el.x === x && el.y === y && el.z === z
    );
    if (isInclude) {
      return i;
    }
  }

  return -1;
};

const getCircuits = (junctionBoxes, noOfConnections) => {
  const circuits = [];
  const allConnections = getConnections(junctionBoxes);
  const firstNShortestConnections = allConnections.slice(0, noOfConnections);

  firstNShortestConnections.forEach((connection) => {
    const { box1, box2 } = connection;
    const indexOfBox1 = findIndexOf(circuits, box1);
    const indexOfBox2 = findIndexOf(circuits, box2);

    if (indexOfBox1 === -1 && indexOfBox2 === -1) {
      circuits.push([{ ...box1 }, { ...box2 }]);
    }

    if (indexOfBox1 === -1 && indexOfBox2 !== -1) {
      circuits[indexOfBox2].push({ ...box1 });
    }

    if (indexOfBox1 !== -1 && indexOfBox2 === -1) {
      circuits[indexOfBox1].push({ ...box2 });
    }

    if (
      indexOfBox1 !== -1 && indexOfBox2 !== -1 && indexOfBox1 !== indexOfBox2
    ) {
      circuits[indexOfBox1].push(...circuits[indexOfBox2]);
      circuits.splice(indexOfBox2, 1);
    }
  });
  return circuits;
};

const mulOf3largestSizeOfCircuit = (circuits) => {
  const largest3circuit = sortBy(circuits, (el) => el.length, { order: "desc" })
    .slice(0, 3);
  return largest3circuit.reduce((mul, el) => mul * el.length, 1);
};

const part1 = (puzzleInput,noOfConnections) => {
  const junctionBoxes = parsePuzzleInput(puzzleInput);
  const circuits = getCircuits(junctionBoxes,noOfConnections);

  return mulOf3largestSizeOfCircuit(circuits);
};

console.log(part1(puzzleInput,1000));
