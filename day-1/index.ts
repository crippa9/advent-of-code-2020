import { readFileSync } from "fs";

const getExpensesThatAddToSum = (
  expensesLeft: number,
  expenses: number[],
  sum: number,
  aggregate: number = 0,
  level: number = 1
): number[] => {
  // console.log();
  // console.log("Method called on Level ", level);
  if (expensesLeft <= 1) {
    // console.log("Level", level, "base case with aggregate", aggregate);
    // base case, test aggregate against all remaining expenses
    for (let i = 0; i < expenses.length; i++) {
      const currentExpense = expenses[i];
      // console.log("Level", level, "Current expense", currentExpense);
      if (currentExpense + aggregate === sum) {
        // console.log(
        //   "Level",
        //   level,
        //   "Sum achieved for expense",
        //   currentExpense,
        //   "On aggregate",
        //   aggregate
        // );
        return [currentExpense];
      }
    }
    return [];
  }
  // console.log("Level", level, "Not base case");
  // aggregate + current (head), test each of the rest
  // if getExpensesThatAddToSum does not return value, try the next
  // if value is returned, return [current, next]
  for (let i = 0; i <= expenses.length - expensesLeft; i++) {
    // not base case, call method with next level recursion for matching expenses
    const currentExpense = expenses[i];
    // console.log("Level", level, "Current expense: ", currentExpense, aggregate);
    if (currentExpense + aggregate > sum) {
      // console.log(
      //   "Level",
      //   level,
      //   "Too big aggregate already, trying next expense without next level"
      // );
      continue;
    }
    const rest = expenses.slice(i + 1);
    const nextLevelResults = getExpensesThatAddToSum(
      expensesLeft - 1,
      rest,
      sum,
      aggregate + currentExpense,
      level + 1
    );
    if (nextLevelResults.length) {
      // console.log("Level", level, "Match found, returning", [
      //   currentExpense,
      //   ...nextLevelResults,
      // ]);
      return [currentExpense, ...nextLevelResults];
    }
    // console.log(
    //   "Level",
    //   level,
    //   "No match found for this expense, trying next expense",
    //   currentExpense
    // );
  }
  return [];
};

const testInput = `1721
979
366
299
675
1456`;

const input = readFileSync("day-1/input.txt", "utf-8");

const expenses = input.split("\n").map((value) => Number.parseInt(value));

const solveFirst = () => {
  const twoExpenses = getExpensesThatAddToSum(2, expenses, 2020);
  const firstFactor = twoExpenses.reduce((agg, curr) => agg * curr, 1);

  console.log();
  console.log("1A. Matching expenses: ", twoExpenses);
  console.log("1A. Factory of matching expenses: ", firstFactor);
};

const solveSecond = () => {
  const threeExpenses = getExpensesThatAddToSum(3, expenses, 2020);
  const secondFactor = threeExpenses.reduce((agg, curr) => agg * curr, 1);

  console.log();
  console.log("1B. Matching expenses: ", threeExpenses);
  console.log("1B. Factory of matching expenses: ", secondFactor);
};

export default {
  solveFirst,
  solveSecond,
};
