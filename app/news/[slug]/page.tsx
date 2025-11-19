import newsData from "@/data/news.json";
import type { NewsItem } from "@/types/news";
import { notFound } from 'next/navigation';
import { NewsDetailClient } from "./news-detail-client";

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const allNews = newsData as NewsItem[];
  const item = allNews.find((n) => n.slug === params.slug);
  
  if (!item) {
    notFound();
  }
  
  return <NewsDetailClient item={item} allNews={allNews} />;
}
