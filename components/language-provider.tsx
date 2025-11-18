"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "tr";

type Translations = {
  [key: string]: {
    en: string;
    tr: string;
  };
};

const translations: Translations = {
  "nav.latest": {
    en: "Latest",
    tr: "Güncel",
  },
  "nav.research": {
    en: "Research",
    tr: "Araştırma",
  },
  "nav.models": {
    en: "Models",
    tr: "Modeller",
  },
  "nav.policy": {
    en: "Policy",
    tr: "Regülasyon",
  },
  "nav.about": {
    en: "About",
    tr: "Hakkında",
  },
  "actions.search": {
    en: "Search",
    tr: "Ara",
  },
  "actions.subscribe": {
    en: "Subscribe",
    tr: "Bültene Katıl",
  },
  "featured.readMore": {
    en: "Read full story →",
    tr: "Devamını oku →",
  },
  "newsletter.title": {
    en: "Never Miss an AI Update",
    tr: "AI gündemini kaçırma",
  },
  "newsletter.subtitle": {
    en: "Get the most important AI news in your inbox.",
    tr: "En önemli yapay zekâ haberlerini e-posta kutuna al.",
  },
  "newsletter.button": {
    en: "Subscribe Now",
    tr: "Bültene Katıl",
  },
  "footer.description": {
    en: "Curated updates from the world of AI.",
    tr: "Yapay zekâ dünyasından kürasyonlu güncellemeler.",
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
