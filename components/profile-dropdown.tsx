"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { PenSquare, FileEdit, LogOut, ChevronDown, Bookmark, ShieldCheck } from "lucide-react"
import { useAuth, loginWithUser, users } from "@/lib/auth"

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleLogout = () => {
    logout()
    closeDropdown()
  }

  const handleCreateBlog = () => {
    router.push("/blog/create")
    closeDropdown()
  }

  const handleManageBlogs = () => {
    router.push("/blog/manage")
    closeDropdown()
  }

  const handleBookmarks = () => {
    router.push("/bookmarks")
    closeDropdown()
  }

  const handleAdminPanel = () => {
    router.push("/admin")
    closeDropdown()
  }

  const handleSwitchUser = (userId: string) => {
    loginWithUser(userId)
    closeDropdown()
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={user?.avatar || "/placeholder.svg?height=32&width=32"}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <span className="hidden md:inline-block text-sm font-medium text-white">{user?.name || "Sign In"}</span>
        <ChevronDown size={16} className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">@{user?.username}</p>
                  <p className="text-xs text-gray-500 capitalize">Role: {user?.role}</p>
                </div>

                {/* Show bookmarks for all users */}
                <button
                  onClick={handleBookmarks}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <Bookmark size={16} className="mr-2" />
                  My Bookmarks
                </button>

                {/* Show blog management options for authors and admins */}
                {(user?.role === "author" || user?.role === "admin") && (
                  <>
                    <button
                      onClick={handleCreateBlog}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <PenSquare size={16} className="mr-2" />
                      Create New Blog
                    </button>
                    <button
                      onClick={handleManageBlogs}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FileEdit size={16} className="mr-2" />
                      Manage My Blogs
                    </button>
                  </>
                )}

                {/* Show admin panel for admins */}
                {user?.role === "admin" && (
                  <button
                    onClick={handleAdminPanel}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <ShieldCheck size={16} className="mr-2" />
                    Admin Panel
                  </button>
                )}

                {/* For demo purposes: Switch between user roles */}
                <div className="px-4 py-2 border-t border-b">
                  <p className="text-xs font-medium text-gray-500 mb-1">Demo: Switch User</p>
                  {users.map((demoUser) => (
                    <button
                      key={demoUser.id}
                      onClick={() => handleSwitchUser(demoUser.id)}
                      className="block w-full text-left text-xs py-1 px-2 rounded hover:bg-gray-100"
                    >
                      {demoUser.name} ({demoUser.role})
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {/* Login options for demo */}
                <div className="px-4 py-2 border-b">
                  <p className="text-xs font-medium text-gray-500 mb-1">Demo: Login As</p>
                  {users.map((demoUser) => (
                    <button
                      key={demoUser.id}
                      onClick={() => handleSwitchUser(demoUser.id)}
                      className="block w-full text-left text-xs py-1 px-2 rounded hover:bg-gray-100"
                    >
                      {demoUser.name} ({demoUser.role})
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
