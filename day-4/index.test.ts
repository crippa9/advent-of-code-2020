import { describe, expect, test } from "@jest/globals";
import { isHexInvalid, isHgtInvalid, isNumberInvalid, isPidInvalid } from ".";

describe("Day4", () => {
  describe("isNumberInvalid", () => {
    test("belowRangeIsInvalid", () => {
      expect(isNumberInvalid("1919", 1920, 1990)).toBe(true);
    });
    test("aboveRangeIsInvalid", () => {
      expect(isNumberInvalid("1991", 1920, 1990)).toBe(true);
    });
    describe("withinRange", () => {
      test("onLowThresholdIsValid", () => {
        expect(isNumberInvalid("1920", 1920, 1990)).toBe(false);
      });
      test("onHighThresholdIsValid", () => {
        expect(isNumberInvalid("1990", 1920, 1990)).toBe(false);
      });
    });
  })
  describe("isHgtInvalid", () => {
    describe("Without measurement", () => {
      test("withoutMeasurementIsInvalid", () => {
        expect(isHgtInvalid("185")).toBe(true);
      });
    });
    describe("In centimeters", () => {
      test("belowRangeIsInvalid", () => {
        expect(isHgtInvalid("145cm")).toBe(true);
      });
      test("aboveRangeIsInvalid", () => {
        expect(isHgtInvalid("195cm")).toBe(true);
      });
      test("withinRangeIsValid", () => {
        expect(isHgtInvalid("185cm")).toBe(false);
      });
    });
    describe("In inches", () => {
      test("belowRangeIsInvalid", () => {
        expect(isHgtInvalid("55in")).toBe(true);
      });
      test("aboveRangeIsInvalid", () => {
        expect(isHgtInvalid("80in")).toBe(true);
      });
      test("withinRangeIsValid", () => {
        expect(isHgtInvalid("65in")).toBe(false);
      });
    });
  });
  describe("isHexInvalid", () => {
    test("withoutHashtagIsInvalid", () => {
      expect(isHexInvalid("123abc")).toBe(true);
    });
    test("withIllegalCharacterIsInvalid", () => {
      expect(isHexInvalid("#123abz")).toBe(true);
    });
    test("withHashtagAndLegalCharactersIsValid", () => {
      expect(isHexInvalid("#123abc")).toBe(false);
    });
  });
  describe("isPidInvalid", () => {
    test("tooManyCharactersIsInvalid", () => {
      expect(isPidInvalid("0123456789")).toBe(true);
    });
    test("tooFewCharactersIsInvalid", () => {
      expect(isPidInvalid("01234567")).toBe(true);
    });
    test("correctLengthIsValid", () => {
      expect(isPidInvalid("012345678")).toBe(false);
    });
  });
});
