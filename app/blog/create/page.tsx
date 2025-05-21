"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MarkdownEditor } from "@/components/markdown-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { createPost } from "@/lib/mdx"

export default function CreateBlogPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("/placeholder.svg?height=300&width=500")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      // Create a slug from the title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      // Calculate approximate reading time (1 min per 200 words)
      const wordCount = content.split(/\s+/).length
      const readingTime = Math.max(1, Math.ceil(wordCount / 200))

      const newPost = await createPost({
        slug,
        title,
        date: new Date().toISOString().split("T")[0],
        coverImage,
        excerpt,
        category: category.toUpperCase(),
        readingTime: `${readingTime} MIN READ`,
        content,
        status: "pending",
        authorId: user?.id || "unknown",
      })

      router.push("/blog/manage")
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create blog post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

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
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
