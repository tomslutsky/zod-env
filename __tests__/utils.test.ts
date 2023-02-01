import { describe, expect, it } from "vitest";
import { booleanAsString } from "../src/utils";

describe("stringAsBoolean", () => {
  it('should return true for "true"', () => {
    expect(booleanAsString().parse("true")).toBe(true);
  });
  it('should return false for "false"', () => {
    expect(booleanAsString().parse("false")).toBe(false);
  });
  it("should return false for null", () => {
    expect(booleanAsString().parse(null)).toBe(false);
  });
  it("should return false for undefined", () => {
    expect(booleanAsString().parse(undefined)).toBe(false);
  });
  it("should return false for empty string", () => {
    expect(booleanAsString().parse("")).toBe(false);
  });
  it('should error for "foo"', () => {
    expect(() => booleanAsString().parse("foo")).toThrowError();
  });
});
