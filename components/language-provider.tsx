"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

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
  "footer.latestNews": {
    en: "Latest News",
    tr: "Güncel Haberler",
  },
  "footer.research": {
    en: "Research",
    tr: "Araştırma",
  },
  "footer.models": {
    en: "AI Models",
    tr: "AI Modeller",
  },
  "footer.policy": {
    en: "Policy & Ethics",
    tr: "Politika & Etik",
  },
  "footer.about": {
    en: "About Us",
    tr: "Hakkında",
  },
  "footer.contact": {
    en: "Contact",
    tr: "İletişim",
  },
  "footer.privacy": {
    en: "Privacy Policy",
    tr: "Gizlilik Politikası",
  },
  "footer.terms": {
    en: "Terms of Service",
    tr: "Kullanım Şartları",
  },
  "footer.description": {
    en: "Curated updates from the world of AI.",
    tr: "Yapay zekâ dünyasından kürasyonlu güncellemeler.",
  },
  "footer.content": {
    en: "Content",
    tr: "İçerik",
  },
  "footer.company": {
    en: "Company",
    tr: "AI Pulse",
  },
  "newsletter.emailPlaceholder": {
    en: "Enter your email",
    tr: "E-posta adresini yaz",
  },
  "newsletter.privacyNote": {
    en: "We respect your privacy. Unsubscribe at any time.",
    tr: "Gizliliğine saygı duyuyoruz. İstediğin zaman tek tıkla ayrılabilirsin.",
  },
  "filters.searchPlaceholder": {
    en: "Search articles, topics, models...",
    tr: "Haber, konu veya model ara...",
  },
  "filters.allCategories": {
    en: "All Categories",
    tr: "Tüm Kategoriler",
  },
  "filters.allLevels": {
    en: "All Levels",
    tr: "Tüm Seviyeler",
  },
  "filters.clearAll": {
    en: "Clear All",
    tr: "Filtreleri temizle",
  },
  "actions.loadMore": {
    en: "Load more",
    tr: "Daha fazla göster",
  },
  "category.research": {
    en: "Research",
    tr: "Araştırma",
  },
  "category.models": {
    en: "Models",
    tr: "Modeller",
  },
  "category.policy": {
    en: "Policy",
    tr: "Regülasyon",
  },
  "category.healthcare": {
    en: "Healthcare",
    tr: "Sağlık",
  },
  "category.hardware": {
    en: "Hardware",
    tr: "Donanım",
  },
  "category.economy": {
    en: "Economy",
    tr: "Ekonomi",
  },
  "category.developer": {
    en: "Developer",
    tr: "Geliştirici",
  },
  "category.product": {
    en: "Product",
    tr: "Ürün",
  },
  "level.genel": {
    en: "General",
    tr: "Genel",
  },
  "level.teknik": {
    en: "Technical",
    tr: "Teknik",
  },
  "share.title": {
    en: "Share this article",
    tr: "Bu haberi paylaş",
  },
  "share.x": {
    en: "Share on X",
    tr: "X'te paylaş",
  },
  "share.linkedin": {
    en: "Share on LinkedIn",
    tr: "LinkedIn'de paylaş",
  },
  "share.copy": {
    en: "Copy link",
    tr: "Bağlantıyı kopyala",
  },
  "related.title": {
    en: "Related articles",
    tr: "İlgili haberler",
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

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
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
