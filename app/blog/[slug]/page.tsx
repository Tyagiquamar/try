import { Navbar } from "@/components/navbar"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"
import Image from "next/image"
import { BookmarkButton } from "@/components/bookmark-button"

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500">
              {post.category} • {post.readingTime}
            </div>
            <BookmarkButton post={post} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">{post.excerpt}</p>

          <div className="relative h-[300px] w-full mb-8">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="prose max-w-none">
            {/* Render markdown content as HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                  .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                  .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                  .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
                  .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
                  .replace(/^###### (.*$)/gm, "<h6>$1</h6>")
                  .replace(/\n\n/gm, "</p><p>")
                  .replace(/\n/gm, "<br />"),
              }}
            />
          </div>
        </div>
      </article>
    </main>
  )
}
