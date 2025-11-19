"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import type { NewsItem } from "@/types/news";
import { resolveText } from "@/types/news";

interface NewsCardProps {
  item: NewsItem;
}

const levelBadgeStyles: Record<string, string> = {
  genel: "bg-green-100 text-green-800",
  teknik: "bg-blue-100 text-blue-800",
};

export function NewsCard({ item }: NewsCardProps) {
  const { lang, t } = useLanguage();
  
  const title = resolveText(item.title, lang);
  const summary = resolveText(item.summary, lang);

  const categoryKey = item.category
    ? `category.${item.category.toLowerCase()}`
    : undefined;
  const categoryLabel = categoryKey ? t(categoryKey) : item.category;

  const levelKey = item.level ? `level.${item.level.toLowerCase()}` : undefined;
  const levelLabel = levelKey ? t(levelKey) : item.level;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  };

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category Pill */}
        <span className="inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/50">
          <time dateTime={item.published_at} className="text-xs text-muted-foreground">
            {formatTimeAgo(item.published_at)}
          </time>

          {/* Level Badge */}
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              levelBadgeStyles[item.level] || "bg-gray-100 text-gray-800"
            }`}
          >
            {levelLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
