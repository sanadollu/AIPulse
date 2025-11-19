"use client"

import Link from "next/link"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground">AI Pulse</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="#latest" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.latest")}
          </Link>
          <Link 
            href="#research" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.research")}
          </Link>
          <Link 
            href="#models" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.models")}
          </Link>
          <Link 
            href="#policy" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.policy")}
          </Link>
          <Link 
            href="#about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.about")}
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">{t("actions.search")}</span>
          </Button>
          <button
            onClick={() => setLang(lang === "en" ? "tr" : "en")}
            className="text-xs border border-border rounded-full px-3 py-1 hover:border-foreground transition"
          >
            {lang === "en" ? "TR" : "EN"}
          </button>
          <Button size="sm" className="hidden sm:flex">
            {t("actions.subscribe")}
          </Button>
        </div>
      </div>
    </header>
  )
}
