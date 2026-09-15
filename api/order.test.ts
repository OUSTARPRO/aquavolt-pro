import { describe, expect, it } from "vitest";
import { CATALOG, computeOrderLines } from "../contracts/catalog";

describe("computeOrderLines", () => {
  it("prices a mixed cart from the catalog", () => {
    const result = computeOrderLines([
      { productId: "chlore-choc-5kg", quantity: 2 },
      { productId: "algicide-5l", quantity: 1 },
    ]);

    expect(result.totalMad).toBe(180 * 2 + 120);
    expect(result.lines).toHaveLength(2);
    expect(result.lines.find((l) => l.productId === "chlore-choc-5kg")?.lineTotalMad).toBe(360);
  });

  it("merges duplicate product lines", () => {
    const result = computeOrderLines([
      { productId: "kit-analyse", quantity: 1 },
      { productId: "kit-analyse", quantity: 2 },
    ]);

    expect(result.lines).toHaveLength(1);
    expect(result.lines[0]?.quantity).toBe(3);
    expect(result.totalMad).toBe(75 * 3);
  });

  it("rejects an empty cart", () => {
    expect(() => computeOrderLines([])).toThrow("EMPTY_CART");
  });

  it("rejects unknown products", () => {
    expect(() => computeOrderLines([{ productId: "does-not-exist", quantity: 1 }])).toThrow(
      "UNKNOWN_PRODUCT",
    );
  });

  it("rejects invalid quantities", () => {
    expect(() => computeOrderLines([{ productId: "chlore-choc-5kg", quantity: 0 }])).toThrow(
      "INVALID_QUANTITY",
    );
    expect(() => computeOrderLines([{ productId: "chlore-choc-5kg", quantity: 1.5 }])).toThrow(
      "INVALID_QUANTITY",
    );
  });

  it("keeps catalog prices as positive integers in MAD", () => {
    expect(CATALOG.length).toBeGreaterThan(5);
    for (const product of CATALOG) {
      expect(Number.isInteger(product.priceMad)).toBe(true);
      expect(product.priceMad).toBeGreaterThan(0);
    }
  });
});
