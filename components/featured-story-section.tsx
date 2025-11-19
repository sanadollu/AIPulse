"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import type { NewsItem } from "@/types/news";
import { resolveText } from "@/types/news";

interface FeaturedStorySectionProps {
  story: NewsItem;
}

export function FeaturedStorySection({ story }: FeaturedStorySectionProps) {
  const { lang, t } = useLanguage();
  
  const title = resolveText(story.title, lang);
  const summary = resolveText(story.summary, lang);

  const categoryKey = story.category
    ? `category.${story.category.toLowerCase()}`
    : undefined;
  const categoryLabel = categoryKey ? t(categoryKey) : story.category;

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
    <section className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          <Image
            src={story.image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {categoryLabel}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {summary}
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{story.source_domain}</span>
            <span>•</span>
            <time dateTime={story.published_at}>
              {formatTimeAgo(story.published_at)}
            </time>
          </div>

          <div className="pt-2">
            <Link
              href={`/news/${story.slug}`}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              {t("featured.readMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
