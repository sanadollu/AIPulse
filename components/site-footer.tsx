"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold">AI Pulse</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Content Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("footer.content")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.latestNews")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.research")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.models")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("footer.company")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Using same container classes */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 AI Pulse. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              href="https://x.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              X
            </Link>
            <Link 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
