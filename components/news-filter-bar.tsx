"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface NewsFilterBarProps {
  searchTerm: string
  selectedCategory: string
  selectedLevel: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onLevelChange: (value: string) => void
  onClearAll: () => void
}

export function NewsFilterBar({
  searchTerm,
  selectedCategory,
  selectedLevel,
  onSearchChange,
  onCategoryChange,
  onLevelChange,
  onClearAll,
}: NewsFilterBarProps) {
  return (
    <div className="w-full border-y border-border bg-muted/30 py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles, topics, models…"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
              <SelectItem value="Models">Models</SelectItem>
              <SelectItem value="Policy">Policy</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Hardware">Hardware</SelectItem>
              <SelectItem value="Economy">Economy</SelectItem>
            </SelectContent>
          </Select>

          {/* Tech Level Filter */}
          <Select value={selectedLevel} onValueChange={onLevelChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Tech Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="genel">Genel</SelectItem>
              <SelectItem value="teknik">Teknik</SelectItem>
              <SelectItem value="derin">Derin</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear All Button */}
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="w-full md:w-auto"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  )
}
