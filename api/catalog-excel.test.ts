import { describe, it, expect } from "vitest";
import { buildCatalogExcel } from "@/lib/catalogExcel";
import { DEFAULT_PACKAGES } from "@contracts/catalog";
import { translations } from "@/lib/translations";

describe("buildCatalogExcel", () => {
  it("produces a well-formed SpreadsheetML document (fr)", () => {
    const xml = buildCatalogExcel(DEFAULT_PACKAGES, "fr", translations.fr);
    expect(xml.startsWith("<?xml")).toBe(true);
    expect(xml).toContain("<Workbook");
    expect(xml).toContain("</Workbook>");
    expect(xml).toContain('ss:Name="Catalogue"');
    // A known package name and price should be present.
    expect(xml).toContain("Site Vitrine Pro");
    expect(xml).toContain("3500");
    // Promo discount for the vitrine (2490 vs 3500 => 29%).
    expect(xml).toContain(">29<");
    // No unescaped ampersands (all must be entities).
    expect(/&(?!amp;|lt;|gt;|quot;|apos;|#10;)/.test(xml)).toBe(false);
  });

  it("renders arabic names when available", () => {
    const xml = buildCatalogExcel(DEFAULT_PACKAGES, "ar", translations.ar);
    expect(xml).toContain("موقع تعريفي احترافي");
  });
});
