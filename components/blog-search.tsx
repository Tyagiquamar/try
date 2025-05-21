"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Post } from "@/lib/mdx"

interface BlogSearchProps {
  allPosts: Post[]
}

export function BlogSearch({ allPosts }: BlogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [suggestions, setSuggestions] = useState<Post[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase()
      const matchingPosts = allPosts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query),
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

    // Navigate to the same page with updated search parameters
    router.push(`/?${params.toString()}`)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (slug: string) => {
    router.push(`/blog/${slug}`)
    setShowSuggestions(false)
  }

  return (
    <div className="my-6" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
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

        {/* Real-time search suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
            <ul>
              {suggestions.map((post) => (
                <li
                  key={post.slug}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(post.slug)}
                >
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-gray-500 truncate">{post.excerpt}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  )
}
