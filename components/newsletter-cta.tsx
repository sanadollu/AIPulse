"use client"

import { Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function NewsletterCTA() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              {t("newsletter.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("newsletter.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Input
              type="email"
              placeholder={t("newsletter.emailPlaceholder")}
              className="flex-1"
              required
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              {t("newsletter.button")}
            </Button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground">
            {t("newsletter.privacyNote")}
          </p>
        </div>
      </div>
    </section>
  )
}
