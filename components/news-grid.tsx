import { NewsCard } from "./news-card"

interface NewsItem {
  id: number
  slug: string
  title: string
  summary: string
  url: string
  tags: string[]
  level: "genel" | "teknik" | "derin"
  category: string
  image: string
  published_at: string
  source_domain?: string
  isFeatured?: boolean
}

interface NewsGridProps {
  items: NewsItem[]
}

export function NewsGrid({ items }: NewsGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-16">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No articles found matching your filters.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
