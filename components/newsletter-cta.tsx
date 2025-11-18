"use client"

import { Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterCTA() {
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
              Never Miss an AI Update
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get the most important AI news and insights delivered to your inbox every week. 
              Join thousands of professionals staying ahead of the curve.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Subscribe Now
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
