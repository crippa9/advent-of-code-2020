import { readFile } from "fs/promises";

const solveFirst = async () => {
  const testInput = await readFile("day-3/input.txt", "utf-8");
  const rows = testInput.split("\r\n");

  const directions: [number, number][] = [
    [3, 1],
  ];
  const slopeResults = calculateSlopeResults(directions, rows);

  console.log("3A. Trees hit", slopeResults[0]);
};
const solveSecond = async () => {
  const testInput = await readFile("day-3/input.txt", "utf-8");
  const rows = testInput.split("\r\n");

  const directions: [number, number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const slopeResults = calculateSlopeResults(directions, rows);
  const factor = slopeResults.reduce((aggr, curr) => curr *= aggr, 1);
  
  console.log("3B. Trees hit", factor);
};

const calculateSlopeResults = (
  directions: [number, number][],
  map: string[]
): number[] =>
  directions.map(([horizontalDirection, verticalDirection]) => {
    const mapWidth = map[0].length;
    const mapHeight = map.length;

    let position = { x: 0, y: 0 };
    let treesHit = 0;
    while (position.y < mapHeight - 1) {
      position.x += horizontalDirection;
      position.y += verticalDirection;
      
      const normalizedHorizontalMapPosition = position.x % mapWidth;
      const mapContent = map[position.y][normalizedHorizontalMapPosition];
      if (mapContent === "#") {
        treesHit++;
      }
    }
    return treesHit;
  });

export default {
  solveFirst,
  solveSecond,
};
