import { readFile } from "fs/promises";

const solveFirst = async () => {
  const input = await readFile("day-5/input.txt", "utf-8");
  const boardingPasses = input.split("\r\n");

  const seatIds = getSeatIds(boardingPasses);
  const highestSeatId = Math.max(...seatIds);

  console.log("5A. Highest seat id", highestSeatId);
};
const solveSecond = async () => {
  const input = await readFile("day-5/input.txt", "utf-8");
  const boardingPasses = input.split("\r\n");

  const seatIds = getSeatIds(boardingPasses);
  const highestSeatId = Math.max(...seatIds);

  const populatedSeatIds: (number | undefined)[] = [
    ...Array(highestSeatId),
  ].map((_, index): number | undefined =>
    seatIds.find((seatId) => seatId === index)
  );

  const mySeatId = populatedSeatIds.reduce<number | undefined>(
    (mySeat, currentSeat, index): number | undefined => {
      if (
        mySeat ||
        currentSeat ||
        index === 0 ||
        index === populatedSeatIds.length - 1
      ) {
        return mySeat;
      }
      const prev = populatedSeatIds[index - 1];
      const next = populatedSeatIds[index + 1];
      if (prev && next) {
        return index;
      }
      return undefined;
    },
    undefined
  );

  console.log("5B. My seat id", mySeatId);
};

const getSeatIds = (boardingPasses: string[]): number[] =>
  boardingPasses.map((boardingPass) => {
    const rowSearchInstructions = boardingPass.slice(0, 7);
    const columnSearchInstructions = boardingPass.slice(7);

    const row = binarySearch("F", "B", 128, rowSearchInstructions);
    const column = binarySearch("L", "R", 8, columnSearchInstructions);
    const seatId = calculateSeatId(row, column);

    return seatId;
  });

const binarySearch = (
  lowCharacter: string,
  highCharacter: string,
  range: number,
  steps: string
): number => {
  let array = [...Array(range).keys()];
  for (let index = 0; index < steps.length; index++) {
    const binaryInstruction = steps[index];
    const takeLow = binaryInstruction === lowCharacter;
    if (takeLow) {
      array = array.slice(0, array.length / 2);
      continue;
    }
    const takeHigh = binaryInstruction === highCharacter;
    if (takeHigh) {
      array = array.slice(array.length / 2);
      continue;
    }
    throw new Error(`Invalid instruction character: ${binaryInstruction}`);
  }
  return array[0];
};

const calculateSeatId = (row: number, column: number): number =>
  row * 8 + column;

export default {
  solveFirst,
  solveSecond,
};
