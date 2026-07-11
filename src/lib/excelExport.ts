import * as XLSX from "xlsx";
import { packages, addOns, promos } from "./catalogData";

export function exportCatalogueToExcel(language: "fr" | "ar") {
  const isFr = language === "fr";
  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Packages ──────────────────────────────────────────────────────
  const packagesData: (string | number)[][] = [
    [
      isFr ? "Package" : "الحزمة",
      isFr ? "Prix Normal (MAD)" : "السعر العادي (درهم)",
      isFr ? "Prix Promo (MAD)" : "سعر العرض (درهم)",
      isFr ? "Remise" : "الخصم",
      isFr ? "Pages" : "الصفحات",
      isFr ? "Délai (jours)" : "المهلة (أيام)",
      isFr ? "Tagline" : "الوصف",
    ],
    ...packages.map((p) => [
      isFr ? p.name : p.nameAr,
      p.price,
      p.promoPrice ?? p.price,
      p.promoPrice ? `${Math.round(((p.price - p.promoPrice) / p.price) * 100)}%` : "—",
      isFr ? p.pages : p.pagesAr,
      p.deliveryDays,
      isFr ? p.tagline : p.taglineAr,
    ]),
  ];

  const wsPackages = XLSX.utils.aoa_to_sheet(packagesData);
  wsPackages["!cols"] = [
    { wch: 30 },
    { wch: 20 },
    { wch: 20 },
    { wch: 12 },
    { wch: 20 },
    { wch: 16 },
    { wch: 45 },
  ];
  XLSX.utils.book_append_sheet(wb, wsPackages, isFr ? "Packages" : "الحزم");

  // ── Sheet 2: Features per package ─────────────────────────────────────────
  const allFeatureLabels = [
    ...new Set(
      packages.flatMap((p) => p.features.map((f) => (isFr ? f.label : f.labelAr)))
    ),
  ];
  const featuresHeader = [
    isFr ? "Fonctionnalité" : "الميزة",
    ...packages.map((p) => (isFr ? p.name : p.nameAr)),
  ];
  const featuresRows = allFeatureLabels.map((featureLabel) => {
    const row: (string)[] = [featureLabel];
    for (const pkg of packages) {
      const feature = pkg.features.find(
        (f) => (isFr ? f.label : f.labelAr) === featureLabel
      );
      row.push(feature?.included ? "✓" : "—");
    }
    return row;
  });
  const wsFeatures = XLSX.utils.aoa_to_sheet([featuresHeader, ...featuresRows]);
  wsFeatures["!cols"] = [{ wch: 45 }, ...packages.map(() => ({ wch: 22 }))];
  XLSX.utils.book_append_sheet(wb, wsFeatures, isFr ? "Fonctionnalités" : "المميزات");

  // ── Sheet 3: Add-Ons ───────────────────────────────────────────────────────
  const addOnsData: (string | number)[][] = [
    [
      isFr ? "Option" : "الخيار",
      isFr ? "Description" : "الوصف",
      isFr ? "Prix (MAD)" : "السعر (درهم)",
      isFr ? "Unité" : "الوحدة",
    ],
    ...addOns.map((a) => [
      isFr ? a.name : a.nameAr,
      isFr ? a.description : a.descriptionAr,
      a.price,
      isFr ? a.unit || "Unique" : a.unitAr || "مرة واحدة",
    ]),
  ];
  const wsAddOns = XLSX.utils.aoa_to_sheet(addOnsData);
  wsAddOns["!cols"] = [{ wch: 30 }, { wch: 55 }, { wch: 16 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsAddOns, isFr ? "Options & Extras" : "الخيارات والإضافات");

  // ── Sheet 4: Promotions ────────────────────────────────────────────────────
  const promosData: (string | number)[][] = [
    [
      isFr ? "Promotion" : "العرض",
      isFr ? "Code Promo" : "كود الخصم",
      isFr ? "Description" : "الوصف",
      isFr ? "Réduction" : "الخصم",
      isFr ? "Expire le" : "تنتهي في",
    ],
    ...promos.map((pr) => [
      isFr ? pr.label : pr.labelAr,
      pr.code,
      isFr ? pr.description : pr.descriptionAr,
      pr.type === "percent" ? `${pr.discount}%` : `${pr.discount} MAD`,
      pr.expiresAt,
    ]),
  ];
  const wsPromos = XLSX.utils.aoa_to_sheet(promosData);
  wsPromos["!cols"] = [{ wch: 22 }, { wch: 16 }, { wch: 55 }, { wch: 14 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsPromos, isFr ? "Promotions" : "العروض");

  // ── Write file ──────────────────────────────────────────────────────────────
  const fileName = `Catalogue-WebSites-${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
