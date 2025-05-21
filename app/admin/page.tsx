"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { getAllPendingPosts, updatePost, type Post } from "@/lib/mdx"
import { CheckCircle, XCircle, Eye } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [pendingPosts, setPendingPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPendingPosts = async () => {
      setIsLoading(true)
      try {
        const posts = await getAllPendingPosts()
        setPendingPosts(posts)
      } catch (error) {
        console.error("Error fetching pending posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated && user?.role === "admin") {
      fetchPendingPosts()
    }
  }, [isAuthenticated, user?.role])

  // Redirect if not authenticated or not admin
  if ((!isAuthenticated || user?.role !== "admin") && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const handleApprove = async (postId: string) => {
    try {
      await updatePost(postId, { status: "approved" })
      setPendingPosts(pendingPosts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error approving post:", error)
      alert("Failed to approve blog post. Please try again.")
    }
  }

  const handleReject = async (postId: string) => {
    try {
      await updatePost(postId, { status: "rejected" })
      setPendingPosts(pendingPosts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error rejecting post:", error)
      alert("Failed to reject blog post. Please try again.")
    }
  }

  const handleRead = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Blog Posts</h2>

          {isLoading ? (
            <div className="text-center py-10">
              <p>Loading pending posts...</p>
            </div>
          ) : pendingPosts.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-medium text-gray-500">No pending blog posts to review</h3>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingPosts.map((post) => (
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
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                      <div className="text-xs text-gray-500 mb-4">
                        {post.category} • {post.readingTime} • {post.date}
                      </div>
                      <div className="mt-auto flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleRead(post.slug)}>
                          <Eye size={16} className="mr-1" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600"
                          onClick={() => handleApprove(post.id)}
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleReject(post.id)}
                        >
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
