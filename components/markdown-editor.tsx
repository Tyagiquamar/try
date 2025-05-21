"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, ImageIcon, LinkIcon } from "lucide-react"

interface MarkdownEditorProps {
  initialValue?: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ initialValue = "", onChange }: MarkdownEditorProps) {
  const [content, setContent] = useState(initialValue)
  const [activeTab, setActiveTab] = useState<string>("write")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    onChange(content)
  }, [content, onChange])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const insertMarkdown = (markdownSyntax: string, placeholder = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const text = selectedText || placeholder

    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    let newContent
    let newCursorPos

    if (markdownSyntax === "# " || markdownSyntax === "## " || markdownSyntax === "### ") {
      // For headings, add at the beginning of the line
      const lineStart = content.substring(0, start).lastIndexOf("\n") + 1
      const indentation = content.substring(lineStart, start).match(/^\s*/)?.[0] || ""
      const lineEnd = content.indexOf("\n", end)
      const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd)

      // Check if heading already exists and remove it if it does
      const headingRegex = /^(#{1,3})\s/
      const match = line.match(headingRegex)

      if (match && match[1] === markdownSyntax.trim()) {
        // Remove heading if it's the same level
        newContent =
          content.substring(0, lineStart) +
          indentation +
          line.replace(headingRegex, "") +
          content.substring(lineEnd === -1 ? content.length : lineEnd)
      } else {
        // Add or replace heading
        newContent =
          content.substring(0, lineStart) +
          indentation +
          markdownSyntax +
          line.replace(headingRegex, "") +
          content.substring(lineEnd === -1 ? content.length : lineEnd)
      }

      newCursorPos = lineStart + indentation.length + markdownSyntax.length + line.replace(headingRegex, "").length
    } else if (markdownSyntax === "- " || markdownSyntax === "1. ") {
      // For lists, add at the beginning of the line
      const lineStart = content.substring(0, start).lastIndexOf("\n") + 1
      const indentation = content.substring(lineStart, start).match(/^\s*/)?.[0] || ""

      newContent =
        content.substring(0, lineStart) +
        indentation +
        markdownSyntax +
        content.substring(lineStart).replace(/^(\s*)(- |[0-9]+\. )?/, "")

      newCursorPos = lineStart + indentation.length + markdownSyntax.length + text.length
    } else if (markdownSyntax === "**") {
      // For bold
      newContent = beforeText + "**" + text + "**" + afterText
      newCursorPos = start + 2 + text.length + 2
    } else if (markdownSyntax === "*") {
      // For italic
      newContent = beforeText + "*" + text + "*" + afterText
      newCursorPos = start + 1 + text.length + 1
    } else if (markdownSyntax === "[](url)") {
      // For links
      newContent = beforeText + "[" + text + "](url)" + afterText
      newCursorPos = start + 1 + text.length + 1
    } else if (markdownSyntax === "![](url)") {
      // For images
      newContent = beforeText + "![" + text + "](url)" + afterText
      newCursorPos = start + 2 + text.length + 1
    } else {
      newContent = beforeText + markdownSyntax + text + markdownSyntax + afterText
      newCursorPos = start + markdownSyntax.length + text.length + markdownSyntax.length
    }

    setContent(newContent)

    // Set focus back to textarea and position cursor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  // Simple markdown to HTML converter for preview
  const renderMarkdown = (markdown: string) => {
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full h-auto">')
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^[0-9]+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>')

    // Convert consecutive list items to lists
    html = html.replace(
      /<li class="ml-6 list-disc">(.*?)<\/li>(\s*<li class="ml-6 list-disc">.*?<\/li>)+/gs,
      (match) => `<ul class="my-4">${match}</ul>`,
    )

    html = html.replace(
      /<li class="ml-6 list-decimal">(.*?)<\/li>(\s*<li class="ml-6 list-decimal">.*?<\/li>)+/gs,
      (match) => `<ol class="my-4">${match}</ol>`,
    )

    // Convert paragraphs (lines not matched by other rules)
    html = html.replace(/^(?!<h|<ul|<ol|<li|<img|<a)(.*$)/gm, (match) => {
      if (match.trim() === "") return ""
      return `<p class="my-2">${match}</p>`
    })

    return html
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-2 border-b">
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# ", "Heading")} title="Heading 1">
            <Heading1 size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## ", "Heading")} title="Heading 2">
            <Heading2 size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**", "Bold text")} title="Bold">
            <Bold size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*", "Italic text")} title="Italic">
            <Italic size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- ", "List item")} title="Bullet List">
            <List size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("1. ", "List item")} title="Numbered List">
            <ListOrdered size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[](url)", "Link text")} title="Link">
            <LinkIcon size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertMarkdown("![](url)", "Image description")}
            title="Image"
          >
            <ImageIcon size={18} />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start rounded-none border-b bg-white">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="p-0 m-0">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            className="w-full min-h-[400px] p-4 font-mono text-sm resize-y focus:outline-none"
            placeholder="Write your blog post in Markdown..."
          />
        </TabsContent>

        <TabsContent value="preview" className="p-0 m-0">
          <div
            className="prose max-w-none p-4 min-h-[400px] bg-white"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
