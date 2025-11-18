"use client"

import Link from "next/link"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
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
            Latest
          </Link>
          <Link 
            href="#research" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Research
          </Link>
          <Link 
            href="#models" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Models
          </Link>
          <Link 
            href="#policy" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Policy
          </Link>
          <Link 
            href="#about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button size="sm" className="hidden sm:flex">
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  )
}
