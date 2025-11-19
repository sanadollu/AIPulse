"use client";

import { useLanguage } from "@/components/language-provider";
import type { NewsItem, BodyBlock } from "@/types/news";
import { resolveText } from "@/types/news";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import { useState } from "react";

interface NewsDetailClientProps {
  item: NewsItem;
  allNews: NewsItem[];
}

export function NewsDetailClient({ item, allNews }: NewsDetailClientProps) {
  const { lang, t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);

  const title = resolveText(item.title, lang);
  const lead = resolveText(item.lead, lang);
  const summary = resolveText(item.summary, lang);
  const blocks = item.body[lang] || item.body.en || [];

  const categoryKey = item.category
    ? `category.${item.category.toLowerCase()}`
    : undefined;
  const categoryLabel = categoryKey ? t(categoryKey) : item.category;

  const levelKey = item.level ? `level.${item.level.toLowerCase()}` : undefined;
  const levelLabel = levelKey ? t(levelKey) : item.level;

  const levelBadgeStyles: Record<string, string> = {
    genel: "bg-green-100 text-green-800",
    teknik: "bg-blue-100 text-blue-800",
  };

  const computeRelated = () => {
    const sameCategory = allNews.filter(
      (n) => n.category === item.category && n.id !== item.id
    );

    const scored = sameCategory.map((article) => {
      const tagOverlap = article.tags.filter((tag) =>
        item.tags.includes(tag)
      ).length;

      const daysDiff =
        Math.abs(
          new Date(article.published_at).getTime() -
            new Date(item.published_at).getTime()
        ) /
        (1000 * 60 * 60 * 24);

      const score = tagOverlap * 10 - daysDiff * 0.1;
      return { article, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((s) => s.article);
  };

  const relatedArticles = computeRelated();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareOnX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const renderBlock = (block: BodyBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {block.text}
          </p>
        );
      case "heading":
        if (block.level === 2) {
          return (
            <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
              {block.text}
            </h2>
          );
        }
        return (
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {block.text}
          </h3>
        );
      case "list":
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-2">
            {block.items?.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground"
          >
            {block.text}
          </blockquote>
        );
      case "code":
        return (
          <pre
            key={index}
            className="bg-muted p-4 rounded-lg overflow-x-auto my-4"
          >
            <code className="text-sm">{block.code}</code>
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "tr" ? "Ana sayfaya dön" : "Back to home"}
        </Link>

        {/* Category and Level Pills */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {categoryLabel}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              levelBadgeStyles[item.level] || "bg-gray-100 text-gray-800"
            }`}
          >
            {levelLabel}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">
          {title}
        </h1>

        {/* Lead (Subtitle) */}
        {lead && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {lead}
          </p>
        )}

        {/* Meta Row: Source, Date, Level */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
          {item.source_domain && <span>{item.source_domain}</span>}
          {item.source_domain && item.published_at && <span>•</span>}
          {item.published_at && (
            <time dateTime={item.published_at}>
              {new Date(item.published_at).toLocaleDateString(
                lang === "tr" ? "tr-TR" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          )}
        </div>

        {/* Hero Image */}
        {item.image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted mb-8">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg leading-relaxed text-foreground">
              {summary}
            </p>
          </div>
        )}

        {/* Rich Body Content */}
        {blocks.length > 0 && (
          <div className="prose prose-lg max-w-none mb-8">
            {blocks.map((block, index) => renderBlock(block, index))}
          </div>
        )}

        {/* Tags Row */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Row */}
        <div className="border-t border-b border-border py-6 mb-8">
          <h3 className="text-sm font-semibold mb-3">
            {t("share.title")}
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={shareOnX}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {t("share.x")}
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {t("share.linkedin")}
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
            >
              {copiedLink ? "✓" : <Share2 className="w-4 h-4" />}
              {copiedLink ? (lang === "tr" ? "Kopyalandı!" : "Copied!") : t("share.copy")}
            </button>
          </div>
        </div>

        {/* External Link Button */}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors mb-12"
          >
            <ExternalLink className="w-4 h-4" />
            {lang === "tr" ? "Orijinal habere git" : "Read original article"}
          </a>
        )}

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">
              {t("related.title")}
            </h2>
            <div className="grid gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/news/${related.slug}`}
                  className="group flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={related.image || "/placeholder.svg"}
                      alt={resolveText(related.title, lang)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {resolveText(related.title, lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {resolveText(related.summary, lang)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
