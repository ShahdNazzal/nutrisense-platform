import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Activity, TrendingUp, Calendar, Apple, Upload, Brain } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch or create profile
  let { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // If profile doesn't exist, create it from user metadata
  if (!profile) {
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || "User",
        phone: user.user_metadata?.phone,
        date_of_birth: user.user_metadata?.date_of_birth,
        gender: user.user_metadata?.gender,
        user_type: user.user_metadata?.user_type || "general",
      })
      .select()
      .single()
    profile = newProfile
  }

  // Fetch recent health metrics
  const { data: healthMetrics } = await supabase
    .from("health_metrics")
    .select("*")
    .eq("user_id", user.id)
    .order("recorded_at", { ascending: false })
    .limit(1)

  const latestMetric = healthMetrics?.[0]

  // Fetch upcoming appointments
  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", user.id)
    .gte("appointment_date", new Date().toISOString())
    .order("appointment_date", { ascending: true })
    .limit(3)

  // Fetch unread messages
  const { data: unreadMessages } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", user.id)
    .eq("status", "unread")

  return (
    <div className="flex h-screen">
      <DashboardNav userType={profile?.user_type} />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name}</h1>
            <p className="text-muted-foreground mt-1">Here&apos;s your health overview</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current BMI</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestMetric?.bmi ? latestMetric.bmi.toFixed(1) : "N/A"}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {latestMetric ? "Last updated today" : "Add your first measurement"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Weight</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestMetric?.weight ? `${latestMetric.weight} kg` : "N/A"}</div>
                <p className="text-xs text-muted-foreground mt-1">Target range: 60-75 kg</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Upcoming consultations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Meal Plans</CardTitle>
                <Apple className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground mt-1">Active nutrition plan</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle>AI-Powered Health Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use our advanced AI and machine learning tools to analyze your health data, get personalized
                predictions, and chat with our nutrition assistant.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <Link href="/dashboard/upload" className="block">
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer h-full">
                    <Upload className="h-5 w-5 text-primary mb-2" />
                    <h4 className="font-semibold text-sm mb-1">Image Analysis</h4>
                    <p className="text-xs text-muted-foreground">Upload medical test results for AI analysis</p>
                  </div>
                </Link>
                <Link href="/dashboard/upload" className="block">
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer h-full">
                    <Activity className="h-5 w-5 text-primary mb-2" />
                    <h4 className="font-semibold text-sm mb-1">Health Prediction</h4>
                    <p className="text-xs text-muted-foreground">Get ML-powered health risk assessments</p>
                  </div>
                </Link>
                <Link href="/dashboard/upload" className="block">
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer h-full">
                    <Brain className="h-5 w-5 text-primary mb-2" />
                    <h4 className="font-semibold text-sm mb-1">AI Chatbot</h4>
                    <p className="text-xs text-muted-foreground">Ask nutrition questions anytime</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <Link href="/appointments/book">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </Link>
              <Link href="/meal-plans">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Apple className="mr-2 h-4 w-4" />
                  View Meal Plans
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Message Doctor
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          {appointments && appointments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{apt.appointment_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(apt.appointment_date).toLocaleDateString()} at{" "}
                        {new Date(apt.appointment_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
