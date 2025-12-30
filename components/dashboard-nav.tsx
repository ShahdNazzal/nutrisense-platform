"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  LayoutDashboard,
  Baby,
  TrendingUp,
  Calendar,
  MessageSquare,
  Apple,
  Upload,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface DashboardNavProps {
  userType?: string
}

export function DashboardNav({ userType = "general" }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/upload", label: "AI Analysis", icon: Upload },
    ...(userType === "pregnant" ? [{ href: "/pregnancy", label: "Pregnancy Care", icon: Baby }] : []),
    ...(userType === "athlete" ? [{ href: "/athletes", label: "Athletic Performance", icon: TrendingUp }] : []),
    { href: "/meal-plans", label: "Meal Plans", icon: Apple },
    { href: "/appointments", label: "Appointments", icon: Calendar },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ]




  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">NutriSense</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-4">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
