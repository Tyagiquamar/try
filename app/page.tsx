import { Navbar } from "@/components/navbar"
import { BlogHeader } from "@/components/blog-header"
import { BlogSearch } from "@/components/blog-search"
import { CategoryFilter } from "@/components/category-filter"
import { BlogPosts } from "@/components/blog-posts"
import { getAllPosts } from "@/lib/mdx"

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <BlogHeader />
        <BlogSearch allPosts={posts} />
        <CategoryFilter />
        <BlogPosts posts={posts} />
      </div>
    </main>
  )
}
