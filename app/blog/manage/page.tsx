"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { getAllUserPosts, deletePost, type Post } from "@/lib/mdx"
import { PenSquare, Trash2, Eye, Bookmark, BookmarkCheck } from "lucide-react"

export default function ManageBlogsPage() {
  const router = useRouter()
  const { user, isAuthenticated, addBookmark, removeBookmark, isBookmarked } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.id) {
        setIsLoading(true)
        try {
          const userPosts = await getAllUserPosts(user.id)
          setPosts(userPosts)
        } catch (error) {
          console.error("Error fetching posts:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (isAuthenticated) {
      fetchPosts()
    }
  }, [user?.id, isAuthenticated])

  // Redirect if not authenticated
  if (!isAuthenticated && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const handleEdit = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (post && post.authorId === user?.id) {
      router.push(`/blog/edit/${postId}`)
    } else {
      alert("You don't have permission to edit this post")
    }
  }

  const handleDelete = async (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (!post || post.authorId !== user?.id) {
      alert("You don't have permission to delete this post")
      return
    }

    if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      try {
        await deletePost(postId)
        setPosts(posts.filter((post) => post.id !== postId))
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Failed to delete blog post. Please try again.")
      }
    }
  }

  const handleRead = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const handleToggleBookmark = (post: Post) => {
    if (isBookmarked(post.id)) {
      removeBookmark(post.id)
    } else {
      addBookmark({
        id: post.id,
        slug: post.slug,
        title: post.title,
        date: post.date,
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {user?.role === "reader" ? "My Bookmarked Blogs" : "Manage Your Blog Posts"}
          </h1>
          {(user?.role === "author" || user?.role === "admin") && (
            <Button onClick={() => router.push("/blog/create")}>Create New Blog</Button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading your blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium text-gray-500 mb-4">
              {user?.role === "reader"
                ? "You haven't bookmarked any blogs yet"
                : "You haven't created any blog posts yet"}
            </h3>
            {(user?.role === "author" || user?.role === "admin") && (
              <Button onClick={() => router.push("/blog/create")}>Create Your First Blog</Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
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
                      <div>{getStatusBadge(post.status)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    <div className="text-xs text-gray-500 mb-4">
                      {post.category} • {post.readingTime} • {post.date}
                    </div>
                    <div className="mt-auto flex justify-end space-x-2">
                      {/* Read button for all users */}
                      <Button variant="outline" size="sm" onClick={() => handleRead(post.slug)}>
                        <Eye size={16} className="mr-1" />
                        Read
                      </Button>

                      {/* Bookmark toggle for all users */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleBookmark(post)}
                        className={isBookmarked(post.id) ? "bg-gray-100" : ""}
                      >
                        {isBookmarked(post.id) ? (
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

                      {/* Edit and Delete buttons only for authors and admins */}
                      {(user?.role === "author" || user?.role === "admin") && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>
                            <PenSquare size={16} className="mr-1" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        </>
                      )}
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
