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
import { useLanguage } from "@/components/language-provider"

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
  const { t } = useLanguage()

  const categoryOptions = [
    { value: "all", label: t("filters.allCategories") },
    { value: "Research", label: t("category.research") },
    { value: "Models", label: t("category.models") },
    { value: "Policy", label: t("category.policy") },
    { value: "Healthcare", label: t("category.healthcare") },
    { value: "Hardware", label: t("category.hardware") },
    { value: "Economy", label: t("category.economy") },
  ]

  const levelOptions = [
    { value: "all", label: t("filters.allLevels") },
    { value: "genel", label: t("level.genel") },
    { value: "teknik", label: t("level.teknik") },
  ]

  return (
    <div className="w-full border-y border-border bg-muted/30 py-6 -mx-4 md:-mx-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("filters.searchPlaceholder")}
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
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Tech Level Filter */}
        <Select value={selectedLevel} onValueChange={onLevelChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Tech Level" />
          </SelectTrigger>
          <SelectContent>
            {levelOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear All Button */}
        <Button
          variant="ghost"
          onClick={onClearAll}
          className="w-full md:w-auto"
        >
          {t("filters.clearAll")}
        </Button>
      </div>
    </div>
  )
}
