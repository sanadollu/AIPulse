"use client"

import { useMemo, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { FeaturedStorySection } from "@/components/featured-story-section"
import { NewsFilterBar } from "@/components/news-filter-bar"
import { NewsGrid } from "@/components/news-grid"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { SiteFooter } from "@/components/site-footer"
import newsData from "@/data/news.json"

type Level = "genel" | "teknik" | "derin"

interface NewsItem {
  id: number
  slug: string
  title: string
  summary: string
  url: string
  tags: string[]
  level: Level
  category: string
  image: string
  published_at: string
  source_domain?: string
  isFeatured?: boolean
}

const typedNewsData = newsData as NewsItem[]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState<"all" | Level>("all")

  // Öne çıkan haberi seç
  const featuredStory = useMemo<NewsItem | undefined>(() => {
    if (!typedNewsData.length) return undefined

    const explicitFeatured = typedNewsData.find((item) => item.isFeatured)
    if (explicitFeatured) return explicitFeatured

    // Yoksa en yeni haberi seç
    return [...typedNewsData].sort(
      (a, b) =>
        new Date(b.published_at).getTime() -
        new Date(a.published_at).getTime()
    )[0]
  }, [])

  // Diğer haberleri filtrele
  const filteredNews = useMemo(() => {
    let filtered = typedNewsData

    // featured haberi listeden çıkar
    if (featuredStory) {
      filtered = filtered.filter((item) => item.id !== featuredStory.id)
    }

    // Arama filtresi
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.summary.toLowerCase().includes(searchLower)
      )
    }

    // Kategori filtresi
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      )
    }

    // Seviye filtresi
    if (selectedLevel !== "all") {
      filtered = filtered.filter((item) => item.level === selectedLevel)
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedLevel, featuredStory])

  const handleClearAll = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedLevel("all")
  }

  // Hiç haber yoksa boş bir şey dön
  if (!featuredStory && !filteredNews.length) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Şu an gösterilecek haber bulunamadı.
          </p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {featuredStory && <FeaturedStorySection story={featuredStory} />}

        <NewsFilterBar
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onLevelChange={(value) =>
            setSelectedLevel(value as "all" | Level)
          }
          onClearAll={handleClearAll}
        />

        <NewsGrid items={filteredNews} />

        <NewsletterCTA />
      </main>

      <SiteFooter />
    </div>
  )
}
