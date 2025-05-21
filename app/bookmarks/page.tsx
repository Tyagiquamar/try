"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { getPostById, type Post } from "@/lib/mdx"
import { Eye, BookmarkX } from "lucide-react"

export default function BookmarksPage() {
  const router = useRouter()
  const { user, isAuthenticated, bookmarks, removeBookmark } = useAuth()
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      if (bookmarks.length > 0) {
        setIsLoading(true)
        try {
          const posts = await Promise.all(
            bookmarks.map(async (bookmark) => {
              const post = await getPostById(bookmark.id)
              return post
            }),
          )
          setBookmarkedPosts(posts.filter((post): post is Post => post !== null))
        } catch (error) {
          console.error("Error fetching bookmarked posts:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setBookmarkedPosts([])
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchBookmarkedPosts()
    }
  }, [bookmarks, isAuthenticated])

  // Redirect if not authenticated
  if (!isAuthenticated && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const handleRead = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const handleRemoveBookmark = (postId: string) => {
    removeBookmark(postId)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Bookmarks</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading your bookmarks...</p>
          </div>
        ) : bookmarkedPosts.length === 0 ? (
          <div className="text-center py-10 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium text-gray-500 mb-4">You haven't bookmarked any blogs yet</h3>
            <Button onClick={() => router.push("/")}>Browse Blogs</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookmarkedPosts.map((post) => (
              <div key={post.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0">
                    <Image
                      src={post.coverImage || "/placeholder.svg?height=200&width=200"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="text-xs text-gray-500 mb-4">
                      {post.category} • {post.readingTime} • {post.date}
                    </div>
                    <div className="mt-auto flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleRead(post.slug)}>
                        <Eye size={16} className="mr-1" />
                        Read
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveBookmark(post.id)}>
                        <BookmarkX size={16} className="mr-1" />
                        Remove Bookmark
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
