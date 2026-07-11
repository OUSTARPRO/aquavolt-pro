import type ExcelJS from "exceljs";
import {
  websitePacks,
  catalogOptions,
  discountPercent,
  type WebsitePack,
  type CatalogOption,
} from "./catalog";

type Language = "fr" | "ar";

const COLORS = {
  header: "FF0F766E", // teal-700
  headerLight: "FF14B8A6", // teal-500
  promo: "FFF59E0B", // amber-500
  promoText: "FFB45309", // amber-700
  zebra: "FFF0FDFA", // teal-50
  border: "FFCBD5E1", // slate-300
  title: "FF0F172A", // slate-900
};

const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: COLORS.border } },
  left: { style: "thin", color: { argb: COLORS.border } },
  bottom: { style: "thin", color: { argb: COLORS.border } },
  right: { style: "thin", color: { argb: COLORS.border } },
};

function styleHeaderRow(row: ExcelJS.Row) {
  row.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.header } };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = thinBorder;
  });
  row.height = 22;
}

function addTitle(sheet: ExcelJS.Worksheet, text: string, lastCol: string, rowIdx: number) {
  sheet.mergeCells(`A${rowIdx}:${lastCol}${rowIdx}`);
  const cell = sheet.getCell(`A${rowIdx}`);
  cell.value = text;
  cell.font = { bold: true, size: 16, color: { argb: COLORS.title } };
  cell.alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(rowIdx).height = 30;
}

function addSubtitle(sheet: ExcelJS.Worksheet, text: string, lastCol: string, rowIdx: number) {
  sheet.mergeCells(`A${rowIdx}:${lastCol}${rowIdx}`);
  const cell = sheet.getCell(`A${rowIdx}`);
  cell.value = text;
  cell.font = { italic: true, size: 11, color: { argb: COLORS.promoText } };
  cell.alignment = { vertical: "middle", horizontal: "center" };
}

function currencyFormat(language: Language): string {
  return language === "fr" ? '#,##0" DH"' : '#,##0" درهم"';
}

// Import dynamique pour ne pas alourdir le bundle principal (exceljs ≈ 250 kB gzip).
async function createWorkbook(): Promise<ExcelJS.Workbook> {
  const mod = await import("exceljs");
  const lib = (mod.default ?? mod) as typeof ExcelJS;
  const workbook = new lib.Workbook();
  workbook.creator = "AquaVolt Pro";
  workbook.created = new Date();
  return workbook;
}

async function downloadWorkbook(workbook: ExcelJS.Workbook, filename: string) {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Génère et télécharge le catalogue complet (packs + options) au format Excel.
 */
export async function downloadCatalogExcel(language: Language): Promise<void> {
  const fr = language === "fr";
  const workbook = await createWorkbook();

  // ---- Feuille 1 : Packs ----
  const packsSheet = workbook.addWorksheet(fr ? "Packs Sites Web" : "باقات المواقع", {
    views: [{ rightToLeft: !fr }],
  });
  packsSheet.columns = [
    { width: 26 },
    { width: 52 },
    { width: 14 },
    { width: 14 },
    { width: 10 },
    { width: 12 },
    { width: 60 },
  ];

  addTitle(
    packsSheet,
    fr ? "Catalogue Création de Sites Web" : "كتالوج إنشاء المواقع الإلكترونية",
    "G",
    1
  );
  addSubtitle(
    packsSheet,
    fr
      ? `Offre de lancement : jusqu'à -30% — Prix en dirhams (MAD) — Généré le ${new Date().toLocaleDateString("fr-MA")}`
      : `عرض الإطلاق: خصم يصل إلى 30% — الأسعار بالدرهم — تم الإنشاء بتاريخ ${new Date().toLocaleDateString("ar-MA")}`,
    "G",
    2
  );
  packsSheet.addRow([]);

  const packHeader = packsSheet.addRow(
    fr
      ? ["Pack", "Description", "Prix normal", "Prix promo", "Remise", "Délai (jours)", "Options incluses"]
      : ["الباقة", "الوصف", "السعر العادي", "سعر العرض", "الخصم", "المدة (أيام)", "الخيارات المشمولة"]
  );
  styleHeaderRow(packHeader);

  websitePacks.forEach((pack, idx) => {
    const row = packsSheet.addRow([
      fr ? pack.nameFr : pack.nameAr,
      fr ? pack.descFr : pack.descAr,
      pack.price,
      pack.promoPrice,
      `-${discountPercent(pack)}%`,
      pack.deliveryDays,
      (fr ? pack.featuresFr : pack.featuresAr).join(" • "),
    ]);
    row.eachCell((cell, col) => {
      cell.border = thinBorder;
      cell.alignment = { vertical: "middle", wrapText: true, horizontal: col >= 3 && col <= 6 ? "center" : fr ? "left" : "right" };
      if (idx % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.zebra } };
      }
    });
    row.getCell(1).font = { bold: true };
    row.getCell(3).numFmt = currencyFormat(language);
    row.getCell(3).font = { strike: true, color: { argb: "FF64748B" } };
    row.getCell(4).numFmt = currencyFormat(language);
    row.getCell(4).font = { bold: true, color: { argb: COLORS.promoText } };
    row.getCell(5).font = { bold: true, color: { argb: "FFDC2626" } };
    row.height = 64;
  });

  // ---- Feuille 2 : Options ----
  const optionsSheet = workbook.addWorksheet(fr ? "Options & Suppléments" : "الخيارات والإضافات", {
    views: [{ rightToLeft: !fr }],
  });
  optionsSheet.columns = [{ width: 32 }, { width: 52 }, { width: 16 }, { width: 14 }];

  addTitle(optionsSheet, fr ? "Options & Suppléments" : "الخيارات والإضافات", "D", 1);
  addSubtitle(
    optionsSheet,
    fr ? "Personnalisez votre pack avec des options à la carte" : "خصص باقتك بخيارات حسب الطلب",
    "D",
    2
  );
  optionsSheet.addRow([]);

  const optHeader = optionsSheet.addRow(
    fr ? ["Catégorie", "Option", "Prix", "Facturation"] : ["الفئة", "الخيار", "السعر", "الفوترة"]
  );
  styleHeaderRow(optHeader);

  catalogOptions.forEach((opt, idx) => {
    const row = optionsSheet.addRow([
      fr ? opt.categoryFr : opt.categoryAr,
      fr ? opt.nameFr : opt.nameAr,
      opt.price,
      opt.monthly ? (fr ? "Par mois" : "شهريًا") : (fr ? "Une fois" : "مرة واحدة"),
    ]);
    row.eachCell((cell, col) => {
      cell.border = thinBorder;
      cell.alignment = { vertical: "middle", wrapText: true, horizontal: col >= 3 ? "center" : fr ? "left" : "right" };
      if (idx % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.zebra } };
      }
    });
    row.getCell(3).numFmt = currencyFormat(language);
    row.getCell(3).font = { bold: true, color: { argb: COLORS.promoText } };
  });

  await downloadWorkbook(workbook, "catalogue-sites-web.xlsx");
}

/**
 * Génère et télécharge un devis Excel personnalisé pour un pack + options sélectionnées.
 */
export async function downloadQuoteExcel(
  language: Language,
  pack: WebsitePack,
  selectedOptions: CatalogOption[]
): Promise<void> {
  const fr = language === "fr";
  const workbook = await createWorkbook();

  const sheet = workbook.addWorksheet(fr ? "Devis" : "عرض السعر", {
    views: [{ rightToLeft: !fr }],
  });
  sheet.columns = [{ width: 48 }, { width: 40 }, { width: 18 }];

  addTitle(sheet, fr ? "Devis — Création de Site Web" : "عرض سعر — إنشاء موقع إلكتروني", "C", 1);
  addSubtitle(
    sheet,
    fr
      ? `Généré automatiquement le ${new Date().toLocaleDateString("fr-MA")} — Valable 30 jours`
      : `تم الإنشاء تلقائيًا بتاريخ ${new Date().toLocaleDateString("ar-MA")} — صالح لمدة 30 يومًا`,
    "C",
    2
  );
  sheet.addRow([]);

  const header = sheet.addRow(
    fr ? ["Désignation", "Détail", "Prix"] : ["البيان", "التفاصيل", "السعر"]
  );
  styleHeaderRow(header);

  const packRow = sheet.addRow([
    `${fr ? "Pack" : "باقة"} : ${fr ? pack.nameFr : pack.nameAr}`,
    fr
      ? `Prix normal ${pack.price} DH — remise -${discountPercent(pack)}%`
      : `السعر العادي ${pack.price} درهم — خصم ${discountPercent(pack)}%`,
    pack.promoPrice,
  ]);
  packRow.eachCell((cell) => {
    cell.border = thinBorder;
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.zebra } };
  });
  packRow.getCell(1).font = { bold: true };
  packRow.getCell(3).numFmt = currencyFormat(language);
  packRow.getCell(3).font = { bold: true, color: { argb: COLORS.promoText } };
  packRow.getCell(3).alignment = { vertical: "middle", horizontal: "center" };

  (fr ? pack.featuresFr : pack.featuresAr).forEach((feature) => {
    const row = sheet.addRow([`   ✓ ${feature}`, fr ? "Inclus" : "مشمول", 0]);
    row.eachCell((cell) => {
      cell.border = thinBorder;
      cell.font = { size: 10, color: { argb: "FF475569" } };
    });
    row.getCell(3).numFmt = currencyFormat(language);
    row.getCell(3).alignment = { horizontal: "center" };
  });

  let monthlyTotal = 0;
  selectedOptions.forEach((opt) => {
    if (opt.monthly) monthlyTotal += opt.price;
    const row = sheet.addRow([
      `${fr ? "Option" : "خيار"} : ${fr ? opt.nameFr : opt.nameAr}`,
      opt.monthly ? (fr ? "Par mois" : "شهريًا") : (fr ? opt.categoryFr : opt.categoryAr),
      opt.price,
    ]);
    row.eachCell((cell) => {
      cell.border = thinBorder;
      cell.alignment = { vertical: "middle", wrapText: true };
    });
    row.getCell(3).numFmt = currencyFormat(language);
    row.getCell(3).alignment = { vertical: "middle", horizontal: "center" };
  });

  sheet.addRow([]);

  const oneTimeTotal =
    pack.promoPrice +
    selectedOptions.filter((o) => !o.monthly).reduce((sum, o) => sum + o.price, 0);

  const totalRow = sheet.addRow([
    fr ? "TOTAL (paiement unique)" : "المجموع (دفعة واحدة)",
    "",
    oneTimeTotal,
  ]);
  totalRow.eachCell((cell) => {
    cell.font = { bold: true, size: 13, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.header } };
    cell.border = thinBorder;
  });
  totalRow.getCell(3).numFmt = currencyFormat(language);
  totalRow.getCell(3).alignment = { horizontal: "center" };
  totalRow.height = 26;

  if (monthlyTotal > 0) {
    const monthlyRow = sheet.addRow([
      fr ? "Abonnements mensuels" : "الاشتراكات الشهرية",
      "",
      monthlyTotal,
    ]);
    monthlyRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.promo } };
      cell.border = thinBorder;
    });
    monthlyRow.getCell(3).numFmt =
      currencyFormat(language) + (fr ? '" /mois"' : '" /شهر"');
    monthlyRow.getCell(3).alignment = { horizontal: "center" };
  }

  await downloadWorkbook(workbook, `devis-${pack.id}.xlsx`);
}
