"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Post } from "@/lib/mdx"
import { users } from "@/lib/auth"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface BlogSearchProps {
  allPosts: Post[]
}

export function BlogSearch({ allPosts }: BlogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [authorFilter, setAuthorFilter] = useState<string | null>(searchParams.get("author") || null)
  const [suggestions, setSuggestions] = useState<Post[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Get unique authors from posts
  const authors = Array.from(new Set(allPosts.map(post => {
    const author = users.find(u => u.id === post.authorId)
    return author?.name || "Unknown Author"
  })))

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase()
      const matchingPosts = allPosts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query)
        )
        .slice(0, 5) // Limit to 5 suggestions
      setSuggestions(matchingPosts)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery, allPosts])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams)

    // Set or remove the search query parameter
    if (searchQuery) {
      params.set("q", searchQuery)
    } else {
      params.delete("q")
    }

    // Set or remove the author filter parameter
    if (authorFilter) {
      params.set("author", authorFilter)
    } else {
      params.delete("author")
    }

    // Navigate to the same page with updated search parameters
    router.push(`/?${params.toString()}`)
    setShowSuggestions(false)
  }

  const handleAuthorChange = (value: string | null) => {
    setAuthorFilter(value)
    
    // Update URL with new author filter
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("author", value)
    } else {
      params.delete("author")
    }
    if (searchQuery) {
      params.set("q", searchQuery)
    }
    router.push(`/?${params.toString()}`)
  }

  const handleSuggestionClick = (slug: string) => {
    router.push(`/blog/${slug}`)
    setShowSuggestions(false)
  }

  return (
    <div className="my-6" ref={searchRef}>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search trading blogs"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
          />
        </div>

        <div className="flex gap-4">
          <Select value={authorFilter || undefined} onValueChange={handleAuthorChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map((author) => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Real-time search suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
            <ul>
              {suggestions.map((post) => {
                const author = users.find(u => u.id === post.authorId)
                return (
                  <li
                    key={post.slug}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(post.slug)}
                  >
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-gray-500">
                      by {author?.name || "Unknown Author"} • {post.excerpt}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </form>
    </div>
  )
}