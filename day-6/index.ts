import { readFile } from "fs/promises";

const solveFirst = async () => {
  const data = await readFile("day-6/input.txt", "utf-8");
  const groups = data.split("\r\n\r\n");

  const questionsWhereAnyoneInGroupAnsweredYes = groups.map((group) => {
    const questions = group.replace(/\r\n/g, "");
    return Array.from(new Set<string>(questions));
  });
  const sumOfQuestionsAnswered = questionsWhereAnyoneInGroupAnsweredYes.reduce(
    (sum, questionsAnswered) => sum + questionsAnswered.length,
    0
  );

  console.log("6A. Sum of questions answered YES", sumOfQuestionsAnswered);
};
const solveSecond = async () => {
  const data = await readFile("day-6/input.txt", "utf-8");
  const groups = data.split("\r\n\r\n");

  const questionsWhereEveryoneInGroupAnsweredYes = groups.map((group) => {
    const answersPerPerson = group.split("\r\n");
    const unanimousDecisions: string[] = [];
    const [firstPersonInGroup, ...restOfPeopleInGroup] = answersPerPerson;
    // for every question in first persons answer
    for (let index = 0; index < firstPersonInGroup.length; index++) {
      const questionFromFirstPerson = firstPersonInGroup[index];
      // which are answered by all other people
      if (restOfPeopleInGroup.every(person => person.includes(questionFromFirstPerson))) {
        unanimousDecisions.push(questionFromFirstPerson);
      }
    }
    return unanimousDecisions;
  });
  const sumOfQuestionsAnswered = questionsWhereEveryoneInGroupAnsweredYes.reduce(
    (sum, questionsAnswered) => sum + questionsAnswered.length,
    0
  );

  console.log("6B. Sum of questions where everyone answered YES", sumOfQuestionsAnswered);
};

export default {
  solveFirst,
  solveSecond,
};
