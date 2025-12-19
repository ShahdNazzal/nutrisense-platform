import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Baby, Calendar, TrendingUp, Apple, Activity, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function PregnancyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch pregnancy data
  const { data: pregnancyData } = await supabase.from("pregnancy_data").select("*").eq("user_id", user.id).single()

  // Fetch recent health metrics
  const { data: healthMetrics } = await supabase
    .from("health_metrics")
    .select("*")
    .eq("user_id", user.id)
    .order("recorded_at", { ascending: false })
    .limit(5)

  const latestMetric = healthMetrics?.[0]

  // Calculate pregnancy progress
  const currentWeek = pregnancyData?.current_week || 1
  const pregnancyProgress = (currentWeek / 40) * 100
  const daysUntilDue = pregnancyData?.due_date
    ? Math.ceil((new Date(pregnancyData.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="flex h-screen">
      <DashboardNav userType={profile?.user_type} />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Pregnancy Care Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your journey to motherhood</p>
          </div>

          {!pregnancyData && (
            <Card className="border-accent bg-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Complete Your Pregnancy Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your pregnancy details to get personalized care and tracking
                    </p>
                    <Link href="/pregnancy/setup">
                      <Button variant="default">Setup Pregnancy Profile</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {pregnancyData && (
            <>
              {/* Pregnancy Overview */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Current Week</CardTitle>
                    <Baby className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Week {currentWeek}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pregnancyData.trimester === 1 && "First Trimester"}
                      {pregnancyData.trimester === 2 && "Second Trimester"}
                      {pregnancyData.trimester === 3 && "Third Trimester"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Due Date</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{daysUntilDue} days</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(pregnancyData.due_date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Weight Gain</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {pregnancyData.pregnancy_weight_gain
                        ? `+${pregnancyData.pregnancy_weight_gain} kg`
                        : "Not tracked"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Recommended: 11-16 kg</p>
                  </CardContent>
                </Card>
              </div>

              {/* Pregnancy Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Pregnancy Progress</CardTitle>
                  <CardDescription>Your journey through 40 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week {currentWeek} of 40</span>
                      <span>{Math.round(pregnancyProgress)}%</span>
                    </div>
                    <Progress value={pregnancyProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Health Tracking */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Health Metrics</CardTitle>
                    <CardDescription>Latest measurements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {latestMetric ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Weight</span>
                          <span className="font-semibold">{latestMetric.weight} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Blood Pressure</span>
                          <span className="font-semibold">
                            {latestMetric.blood_pressure_systolic}/{latestMetric.blood_pressure_diastolic} mmHg
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Heart Rate</span>
                          <span className="font-semibold">{latestMetric.heart_rate} bpm</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">No health metrics recorded yet</p>
                    )}
                    <Button variant="outline" className="w-full bg-transparent">
                      <Activity className="mr-2 h-4 w-4" />
                      Log Health Metrics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition & Supplements</CardTitle>
                    <CardDescription>Recommended daily intake</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Folic Acid</span>
                        <span className="text-muted-foreground">600 mcg/day</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Iron</span>
                        <span className="text-muted-foreground">27 mg/day</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Calcium</span>
                        <span className="text-muted-foreground">1000 mg/day</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>DHA</span>
                        <span className="text-muted-foreground">200 mg/day</span>
                      </div>
                    </div>
                    {pregnancyData.prenatal_vitamins && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm font-medium mb-1">Current Supplements:</p>
                        <p className="text-sm text-muted-foreground">{pregnancyData.prenatal_vitamins}</p>
                      </div>
                    )}
                    <Link href="/meal-plans">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Apple className="mr-2 h-4 w-4" />
                        View Meal Plans
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              {pregnancyData.dietary_restrictions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Dietary Restrictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{pregnancyData.dietary_restrictions}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
