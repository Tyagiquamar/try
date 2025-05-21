import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "admin" | "author" | "reader"

export interface User {
  id: string
  name: string
  username: string
  role: UserRole
  avatar: string
}

export interface BookmarkedPost {
  id: string
  slug: string
  title: string
  date: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  bookmarks: BookmarkedPost[]
  login: (user: User) => void
  logout: () => void
  addBookmark: (post: BookmarkedPost) => void
  removeBookmark: (postId: string) => void
  isBookmarked: (postId: string) => boolean
}

// Hardcoded users for demonstration
export const users: User[] = [
  {
    id: "user_123",
    name: "John Trader",
    username: "john_trader",
    role: "author",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user_456",
    name: "Admin User",
    username: "admin",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user_789",
    name: "Regular Reader",
    username: "reader",
    role: "reader",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Create auth store with persistence
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      bookmarks: [],
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addBookmark: (post) => {
        const currentBookmarks = get().bookmarks
        if (!currentBookmarks.some((bookmark) => bookmark.id === post.id)) {
          set({ bookmarks: [...currentBookmarks, post] })
        }
      },
      removeBookmark: (postId) => {
        const currentBookmarks = get().bookmarks
        set({ bookmarks: currentBookmarks.filter((bookmark) => bookmark.id !== postId) })
      },
      isBookmarked: (postId) => {
        return get().bookmarks.some((bookmark) => bookmark.id === postId)
      },
    }),
    {
      name: "trading-hub-auth",
    },
  ),
)

// Helper function to login with a specific user
export const loginWithUser = (userId: string) => {
  const { login } = useAuth.getState()
  const user = users.find((u) => u.id === userId)
  if (user) {
    login(user)
  }
}

// Default to author for backward compatibility
export const loginWithHardcodedUser = () => {
  loginWithUser("user_123")
}
