import { readFile } from "fs/promises";

type FirstPolicy = {
  character: string;
  min: number;
  max: number;
};

type SecondPolicy = {
  character: string;
  firstIndex: number;
  secondIndex: number;
};

const solveFirst = async () => {
  const isPasswordValid = (
    passwordWithPolicy: [FirstPolicy, string]
  ): boolean => {
    const [policy, password] = passwordWithPolicy;
    let policyCharacterCount = 0;
    for (let character of password) {
      if (character === policy.character) {
        policyCharacterCount++;
      }
    }
    if (policyCharacterCount < policy.min) {
      return false;
    }
    if (policyCharacterCount > policy.max) {
      return false;
    }
    return true;
  };

  const input = await readPasswordStrings();
  const passwordsWithPolicies: [FirstPolicy, string][] = input
    .map((row) => {
      const [policyString, password] = row.split(": ");
      const [policyNumbersString, policyCharacter] = policyString.split(" ");
      const [policyMin, policyMax] = policyNumbersString.split("-");
      const policy: FirstPolicy = {
        character: policyCharacter,
        min: Number.parseInt(policyMin),
        max: Number.parseInt(policyMax),
      };

      return [policy, password];
    });
  const numberOfValidPasswords = passwordsWithPolicies.reduce(
    (validPasswords, currentPassword) => {
      const passwordIsValid = isPasswordValid(currentPassword);
      return passwordIsValid ? validPasswords + 1 : validPasswords;
    },
    0
  );
  console.log("2A. Valid passwords", numberOfValidPasswords);
};

const solveSecond = async () => {
  const isPasswordValid = (
    passwordWithPolicy: [SecondPolicy, string]
  ): boolean => {
    const [policy, password] = passwordWithPolicy;
    const firstCharacterIsMatching =
      password[policy.firstIndex] === policy.character;
    const secondCharacterIsMatching =
      password[policy.secondIndex] === policy.character;

    const bothMatching = firstCharacterIsMatching === secondCharacterIsMatching;
    const noneMatching =
      !firstCharacterIsMatching && !secondCharacterIsMatching;

    return !(bothMatching || noneMatching);
  };

  const input = await readPasswordStrings();
  const passwordsWithPolicies: [SecondPolicy, string][] = input
    .map((row) => {
      const [policyString, password] = row.split(": ");
      const [policyNumbersString, policyCharacter] = policyString.split(" ");
      const [policyFirst, policySecond] = policyNumbersString.split("-");
      const policy: SecondPolicy = {
        character: policyCharacter,
        firstIndex: Number.parseInt(policyFirst) - 1,
        secondIndex: Number.parseInt(policySecond) - 1,
      };

      return [policy, password];
    });
  const numberOfValidPasswords = passwordsWithPolicies.reduce(
    (validPasswords, currentPassword) =>
      isPasswordValid(currentPassword) ? validPasswords + 1 : validPasswords,
    0
  );
  console.log("2B. Valid passwords", numberOfValidPasswords);
};

const readPasswordStrings = async (): Promise<string[]> => {
  const input = await readFile("day-2/input.txt", "utf-8");
  return input.split("\r\n");
}

export default {
  solveFirst,
  solveSecond
};
