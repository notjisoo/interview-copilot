import { describe, it, expect } from "vitest";
import { formatMoney } from "../../utils/formatterAmount";

describe("formatMoney", () => {
  // 正常情况
  describe("normal cases", () => {
    it("should format integer correctly", () => {
      expect(formatMoney(100)).toBe("100.00");
    });

    it("should format decimal with one digit correctly", () => {
      expect(formatMoney(99.5)).toBe("99.50");
    });

    it("should format decimal with two digits correctly", () => {
      expect(formatMoney(123.45)).toBe("123.45");
    });

    it("should round to two decimal places", () => {
      expect(formatMoney(99.999)).toBe("100.00");
      expect(formatMoney(50.124)).toBe("50.12");
      expect(formatMoney(50.125)).toBe("50.13"); // 四舍五入
    });

    it("should handle large numbers", () => {
      expect(formatMoney(1000000)).toBe("1000000.00");
    });
  });

  // 边界情况
  describe("boundary cases", () => {
    it("should format zero correctly", () => {
      expect(formatMoney(0)).toBe("0.00");
    });

    it("should handle very small positive numbers", () => {
      expect(formatMoney(0.01)).toBe("0.01");
      expect(formatMoney(0.001)).toBe("0.00");
    });
  });

  // 异常情况 (负数)
  describe("exception cases - negative numbers", () => {
    it("should return '0.00' for negative numbers", () => {
      expect(formatMoney(-1)).toBe("0.00");
    });

    it("should return '0.00' for large negative numbers", () => {
      expect(formatMoney(-1000)).toBe("0.00");
    });

    it("should return '0.00' for small negative decimals", () => {
      expect(formatMoney(-0.01)).toBe("0.00");
    });
  });
});
