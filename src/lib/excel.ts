import type { CatalogItem } from "@contracts/catalog";
import type { translations } from "@/lib/translations";
import { buildCatalogExcel, catalogExcelFileName } from "@/lib/catalogExcel";

type Lang = "fr" | "ar";
type Dict = (typeof translations)["fr"] | (typeof translations)["ar"];

export { buildCatalogExcel } from "@/lib/catalogExcel";

/** Generate the Excel file in-browser and trigger a download. */
export function downloadCatalogExcel(
  items: CatalogItem[],
  language: Lang,
  T: Dict,
): void {
  const xml = buildCatalogExcel(items, language, T);
  const blob = new Blob([xml], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = catalogExcelFileName();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
