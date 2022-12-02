import { readFile } from "fs/promises";

const solveFirst = async () => {
  const testInput = await readFile("day-4/input.txt", "utf-8");
  const passportRows = testInput.split("\r\n\r\n");

  const passports = passportRows.map((row) =>
    row
      .split(/[\r\n, ]/)
      .filter((f) => f)
      .map((fieldString) => fieldString.split(":").map(f => f.trim()))
  );
  const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const validPassports = passports.reduce((aggregate, passport) => {
    const missingMandatory = mandatoryFields.some(
      (mandatoryField) => !passport.some(([key]) => key === mandatoryField)
    );
    if (missingMandatory) {
      return aggregate;
    }

    return aggregate + 1;
  }, 0);

  console.log("4A. Valid passports", validPassports);
};

const solveSecond = async () => {
  const testInput = await readFile("day-4/input.txt", "utf-8");
  const passportRows = testInput.split("\r\n\r\n");

  const passports = passportRows.map((row) =>
    row
      .split(/[\r\n, ]/)
      .filter((f) => f)
      .map((fieldString) => fieldString.split(":"))
  );
  const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const validPassports = passports.reduce((aggregate, passport, index) => {
    const invalidFields = mandatoryFields.filter((mandatoryField) => isFieldInvalid(mandatoryField, passport));
    if (invalidFields.length) {
      return aggregate;
    }

    return aggregate + 1;
  }, 0);

  console.log("4B. Valid passports", validPassports);
};

const isFieldInvalid = (
  fieldToValidate: string,
  passport: string[][]
): boolean => {
  const passportKeyValue = passport.find(([key]) => key === fieldToValidate);
  if (!passportKeyValue) {
    return true;
  }
  const [key, value] = passportKeyValue;
  switch (key) {
    case "byr":
      return isNumberInvalid(value, 1920, 2002);
    case "iyr":
      return isNumberInvalid(value, 2010, 2020);
    case "eyr":
      return isNumberInvalid(value, 2020, 2030);
    case "hgt":
      return isHgtInvalid(value);
    case "hcl":
      return isHexInvalid(value);
    case "ecl":
      return isEclInvalid(value);
    case "pid":
      return isPidInvalid(value);
  }
  throw new Error(`No handler created for field: ${fieldToValidate}`);
};

export const isNumberInvalid = (
  value: string,
  min: number,
  max: number
): boolean => {
  const numberValue = Number.parseInt(value);
  if (numberValue === Number.NaN) return true;
  if (numberValue < min) return true;
  if (numberValue > max) return true;
  return false;
};

export const isHgtInvalid = (value: string): boolean => {
  const separatedValue = value.match(/(\d+)(\w*)/);
  if (!separatedValue?.length) {
    return true;
  }
  const [_, numberString, measurement] = separatedValue;
  const numberValue = Number.parseInt(numberString);
  switch (measurement) {
    case "cm": {
      if (numberValue < 150) return true;
      if (numberValue > 193) return true;
      return false;
    }
    case "in": {
      if (numberValue < 59) return true;
      if (numberValue > 76) return true;
      return false;
    }
  }
  return true;
};

export const isHexInvalid = (value: string): boolean => !value.match(/#[\d,a-f]{6}$/);

const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
export const isEclInvalid = (value: string): boolean =>
  !validEyeColors.some((validColor) => validColor === value);

export const isPidInvalid = (value: string): boolean => !value.match(/^[\d]{9}$/);

export default {
  solveFirst,
  solveSecond,
};
