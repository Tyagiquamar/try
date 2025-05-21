"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MarkdownEditor } from "@/components/markdown-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { getPostById, updatePost } from "@/lib/mdx"

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      if (params.id && user?.id) {
        setIsLoading(true)
        try {
          const post = await getPostById(params.id)

          if (!post) {
            alert("Blog post not found")
            router.push("/blog/manage")
            return
          }

          // Check if user is the author
          if (post.authorId !== user.id) {
            alert("You don't have permission to edit this post")
            router.push("/blog/manage")
            return
          }

          setTitle(post.title)
          setExcerpt(post.excerpt)
          setCategory(post.category)
          setCoverImage(post.coverImage)
          setContent(post.content)
        } catch (error) {
          console.error("Error fetching post:", error)
          alert("Failed to load blog post. Please try again.")
          router.push("/blog/manage")
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (isAuthenticated) {
      fetchPost()
    }
  }, [params.id, router, user?.id, isAuthenticated])

  // Redirect if not authenticated
  if (!isAuthenticated && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !excerpt || !content) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Update the post
      await updatePost(params.id, {
        title,
        excerpt,
        category: category.toUpperCase(),
        coverImage,
        content,
        status: "pending", // Reset to pending when edited
      })

      router.push("/blog/manage")
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Failed to update blog post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading blog post...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt/Summary *</Label>
                <Input
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your blog post"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Trading Strategies, Technical Analysis"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="URL to cover image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <MarkdownEditor initialValue={content} onChange={setContent} />
              </div>

              <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.push("/blog/manage")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
