export const WHATSAPP_NUMBER = "212664662629";

export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

export const MOROCCAN_CITIES = [
  "Khouribga",
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Oujda",
  "Meknès",
  "Tétouan",
  "Safi",
  "El Jadida",
  "Béni Mellal",
  "Settat",
  "Kénitra",
  "Nador",
  "Laâyoune",
  "Dakhla",
  "Autre",
] as const;
