"use client"
import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/lib/mdx"
import { useSearchParams } from "next/navigation"
import { users } from "@/lib/auth"

interface BlogPostsProps {
  posts: Post[]
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return <BlogPostsContent posts={posts} />
}

function BlogPostsContent({ posts }: BlogPostsProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q")?.toLowerCase()
  const authorFilter = searchParams.get("author")?.toLowerCase()

  // Filter posts based on search query and author
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.content.toLowerCase().includes(searchQuery)

    const author = users.find(u => u.id === post.authorId)
    const matchesAuthor = !authorFilter || 
      (author && author.name.toLowerCase().includes(authorFilter))

    return matchesSearch && matchesAuthor
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {filteredPosts.map((post) => {
        const author = users.find(u => u.id === post.authorId)
        
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 mb-2">
                  {post.readingTime} • {post.date} • by {author?.name || "Unknown Author"}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        )
      })}

      {filteredPosts.length === 0 && (
        <div className="col-span-3 text-center py-10">
          <h3 className="text-xl font-medium text-gray-500">No trading blogs found matching your search</h3>
        </div>
      )}
    </div>
  )
}