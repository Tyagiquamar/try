"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useAuth } from "@/lib/auth"
import type { Post } from "@/lib/mdx"

interface BookmarkButtonProps {
  post: Post
}

export function BookmarkButton({ post }: BookmarkButtonProps) {
  const { isAuthenticated, addBookmark, removeBookmark, isBookmarked } = useAuth()
  const [isBookmarkedState, setIsBookmarkedState] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setIsBookmarkedState(isBookmarked(post.id))
    }
  }, [isAuthenticated, isBookmarked, post.id])

  const handleToggleBookmark = () => {
    if (!isAuthenticated) {
      alert("Please sign in to bookmark posts")
      return
    }

    if (isBookmarkedState) {
      removeBookmark(post.id)
      setIsBookmarkedState(false)
    } else {
      addBookmark({
        id: post.id,
        slug: post.slug,
        title: post.title,
        date: post.date,
      })
      setIsBookmarkedState(true)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleToggleBookmark}>
      {isBookmarkedState ? (
        <>
          <BookmarkCheck size={16} className="mr-1" />
          Bookmarked
        </>
      ) : (
        <>
          <Bookmark size={16} className="mr-1" />
          Bookmark
        </>
      )}
    </Button>
  )
}
