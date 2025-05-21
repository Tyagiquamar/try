"use client"
import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/lib/mdx"
import { useSearchParams } from "next/navigation"

interface BlogPostsProps {
  posts: Post[]
}

export function BlogPosts({ posts }: BlogPostsProps) {
  // Client component to access search params
  return <BlogPostsContent posts={posts} />
}
// Client component to handle search filtering

function BlogPostsContent({ posts }: BlogPostsProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q")?.toLowerCase()

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.excerpt.toLowerCase().includes(searchQuery) ||
          post.content.toLowerCase().includes(searchQuery),
      )
    : posts

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {filteredPosts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
          <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                alt={post.title}
                fill
                className="object-cover"
              />
              {/* Removed the Approved badge as requested */}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-xs text-gray-500 mb-2">{post.readingTime}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}

      {filteredPosts.length === 0 && (
        <div className="col-span-3 text-center py-10">
          <h3 className="text-xl font-medium text-gray-500">No trading blogs found matching your search</h3>
        </div>
      )}
    </div>
  )
}
