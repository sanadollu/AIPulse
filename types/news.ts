export type Locale = "en" | "tr";

export type BodyBlockType =
  | "paragraph"
  | "heading"
  | "list"
  | "quote"
  | "code";

export type BodyBlock = {
  type: BodyBlockType;
  text?: string;
  level?: 2 | 3;
  items?: string[];
  code?: string;
  language?: string;
};

export type ArticleBodyByLocale = {
  en: BodyBlock[];
  tr: BodyBlock[];
};

export type NewsItem = {
  id: number;
  slug: string;
  title: { en: string; tr: string };
  lead: { en: string; tr: string };
  summary: { en: string; tr: string };
  url: string;
  source_domain: string;
  category: string;
  level: string;
  tags: string[];
  image: string;
  published_at: string;
  body: ArticleBodyByLocale;
};

export function resolveText(
  obj: { en: string; tr: string } | undefined,
  lang: Locale
): string {
  if (!obj) return "";
  return obj[lang] ?? obj.en ?? "";
}
