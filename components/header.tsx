"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  // ✅ هذا السطر هو اللي شال الإيـرور
  if (loading) return null

  const handleLogout = () => {
    signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span>NutriSense</span>
          </Link>

          {/* Desktop Nav */}
          
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/pregnancy/setup" className="text-sm font-medium hover:text-primary">
              Pregnancy
            </Link>
            <Link href="/components/fitness" className="text-sm font-medium hover:text-primary">
              Fitness
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-primary">
              Chat
            </Link>
            <Link href="/analysis" className="text-sm font-medium hover:text-primary">
              Analysis
            </Link>
            <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#doctors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Our Doctors
            </Link>
          
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/">Home</Link>
              <Link href="/pregnancy">Pregnancy</Link>
              <Link href="/fitness">Fitness</Link>
              <Link href="/analysis">Analysis</Link>
              <Link href="/chat">Chat</Link>

              <div className="pt-4 border-t">
                {user ? (
                  <>
                    <p className="text-sm font-medium">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <Button onClick={handleLogout} className="mt-2">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost">
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/auth/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

