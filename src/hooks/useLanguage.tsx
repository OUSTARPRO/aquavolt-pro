import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Language = "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (fr: string, ar: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "fr" ? "ar" : "fr"));
  }, []);

  const t = useCallback(
    (fr: string, ar: string) => (language === "fr" ? fr : ar),
    [language]
  );

  const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t, dir }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
