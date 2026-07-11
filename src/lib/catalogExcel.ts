import {
  PACKAGE_TYPE_LABELS,
  CATALOG_CURRENCY,
  type CatalogItem,
} from "@contracts/catalog";
import type { translations } from "@/lib/translations";

type Lang = "fr" | "ar";
type Dict = (typeof translations)["fr"] | (typeof translations)["ar"];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cellText(value: string): string {
  const escaped = escapeXml(value).replace(/\n/g, "&#10;");
  return `<Cell ss:StyleID="body"><Data ss:Type="String">${escaped}</Data></Cell>`;
}

function cellName(value: string): string {
  const escaped = escapeXml(value).replace(/\n/g, "&#10;");
  return `<Cell ss:StyleID="name"><Data ss:Type="String">${escaped}</Data></Cell>`;
}

function cellNumber(value: number): string {
  return `<Cell ss:StyleID="num"><Data ss:Type="Number">${value}</Data></Cell>`;
}

function headerCell(value: string): string {
  return `<Cell ss:StyleID="header"><Data ss:Type="String">${escapeXml(
    value,
  )}</Data></Cell>`;
}

/**
 * Build an Excel 2003 SpreadsheetML (.xls) document from catalog items.
 * This format opens natively in Microsoft Excel, LibreOffice and Google Sheets
 * without any external dependency. Pure (no DOM), so it is unit-testable.
 */
export function buildCatalogExcel(
  items: CatalogItem[],
  language: Lang,
  T: Dict,
): string {
  const locale = language === "fr" ? "fr-FR" : "ar-MA";
  const rows = items
    .map((item) => {
      const typeLabel = PACKAGE_TYPE_LABELS[item.type][language];
      const name = language === "ar" && item.nameAr ? item.nameAr : item.name;
      const opts =
        language === "ar" && item.optionsAr && item.optionsAr.length > 0
          ? item.optionsAr
          : item.options;
      const hasPromo =
        item.promoPrice != null &&
        item.promoPrice > 0 &&
        item.promoPrice < item.price;
      const discount = hasPromo
        ? Math.round((1 - (item.promoPrice as number) / item.price) * 100)
        : 0;

      return `<Row>${cellName(name)}${cellText(typeLabel)}${
        item.price > 0 ? cellNumber(item.price) : cellText(T.catalogOnQuote)
      }${hasPromo ? cellNumber(item.promoPrice as number) : cellText("-")}${
        discount > 0 ? cellNumber(discount) : cellText("-")
      }${
        item.deliveryDays != null ? cellNumber(item.deliveryDays) : cellText("-")
      }${cellText(opts.join("\n"))}${cellText(
        item.active ? T.activeLabel : T.inactiveLabel,
      )}</Row>`;
    })
    .join("");

  const generatedAt = new Date().toLocaleString(locale);

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Top"/><Font ss:FontName="Calibri" ss:Size="11"/></Style>
  <Style ss:ID="title"><Font ss:Bold="1" ss:Size="16" ss:Color="#0F766E"/></Style>
  <Style ss:ID="subtitle"><Font ss:Size="10" ss:Color="#64748B"/></Style>
  <Style ss:ID="header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#0F766E" ss:Pattern="Solid"/><Alignment ss:Vertical="Center"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>
  <Style ss:ID="body"><Alignment ss:Vertical="Top" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/></Borders></Style>
  <Style ss:ID="name"><Font ss:Bold="1"/><Alignment ss:Vertical="Top" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/></Borders></Style>
  <Style ss:ID="num"><Alignment ss:Vertical="Top" ss:Horizontal="Right"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/></Borders></Style>
 </Styles>
 <Worksheet ss:Name="Catalogue">
  <Table>
   <Column ss:Width="180"/>
   <Column ss:Width="110"/>
   <Column ss:Width="90"/>
   <Column ss:Width="90"/>
   <Column ss:Width="70"/>
   <Column ss:Width="70"/>
   <Column ss:Width="320"/>
   <Column ss:Width="80"/>
   <Row ss:Height="24"><Cell ss:StyleID="title"><Data ss:Type="String">${escapeXml(
     T.catalogTitle,
   )}</Data></Cell></Row>
   <Row><Cell ss:StyleID="subtitle"><Data ss:Type="String">${escapeXml(
     `${T.catalogBadge} — ${generatedAt}`,
   )}</Data></Cell></Row>
   <Row></Row>
   <Row ss:Height="22">${headerCell(T.packageName)}${headerCell(
     T.packageType,
   )}${headerCell(`${T.packagePrice} (${CATALOG_CURRENCY})`)}${headerCell(
     `${T.packagePromoPrice} (${CATALOG_CURRENCY})`,
   )}${headerCell(T.catalogSave + " %")}${headerCell(
     T.packageDeliveryDays,
   )}${headerCell(T.packageOptions)}${headerCell(T.status)}</Row>
   ${rows}
  </Table>
 </Worksheet>
</Workbook>`;
}

export function catalogExcelFileName(): string {
  const date = new Date().toISOString().slice(0, 10);
  return `catalogue-sites-web-${date}.xls`;
}
