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

interface FeaturedStorySectionProps {
  story: NewsItem
}

export function FeaturedStorySection({ story }: FeaturedStorySectionProps) {
  return (
    <section className="container px-4 md:px-6 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          <Image
            src={story.image || "/placeholder.svg"}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {story.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            {story.title}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {story.summary}
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{story.source_domain}</span>
            <span>•</span>
            <time dateTime={story.published_at}>
              {formatDistanceToNow(new Date(story.published_at), { addSuffix: true })}
            </time>
          </div>

          <div className="pt-2">
            <Link
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Read full story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
