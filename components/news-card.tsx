import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

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

interface NewsCardProps {
  item: NewsItem
}

const levelBadgeStyles = {
  genel: "bg-green-100 text-green-800",
  teknik: "bg-blue-100 text-blue-800",
  derin: "bg-purple-100 text-purple-800",
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category Pill */}
        <span className="inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {item.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {item.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/50">
          <time 
            dateTime={item.published_at}
            className="text-xs text-muted-foreground"
          >
            {formatDistanceToNow(new Date(item.published_at), { addSuffix: true })}
          </time>
          
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${levelBadgeStyles[item.level]}`}>
            {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}
