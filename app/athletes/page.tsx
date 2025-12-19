import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Activity, Target, Zap, Heart, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function AthletesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch athlete data
  const { data: athleteData } = await supabase.from("athlete_data").select("*").eq("user_id", user.id).single()

  // Fetch recent health metrics
  const { data: healthMetrics } = await supabase
    .from("health_metrics")
    .select("*")
    .eq("user_id", user.id)
    .order("recorded_at", { ascending: false })
    .limit(5)

  const latestMetric = healthMetrics?.[0]

  return (
    <div className="flex h-screen">
      <DashboardNav userType={profile?.user_type} />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Athletic Performance Dashboard</h1>
            <p className="text-muted-foreground mt-1">Optimize your training and nutrition</p>
          </div>

          {!athleteData && (
            <Card className="border-accent bg-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Complete Your Athletic Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your training details to get personalized performance insights
                    </p>
                    <Link href="/athletes/setup">
                      <Button variant="default">Setup Athletic Profile</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {athleteData && (
            <>
              {/* Performance Overview */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Body Fat</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {athleteData.body_fat_percentage ? `${athleteData.body_fat_percentage}%` : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Optimal range: 6-17%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Muscle Mass</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {athleteData.muscle_mass ? `${athleteData.muscle_mass} kg` : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Track your gains</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">VO2 Max</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {athleteData.vo2_max ? athleteData.vo2_max.toFixed(1) : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">ml/kg/min</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Resting HR</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {athleteData.resting_heart_rate ? `${athleteData.resting_heart_rate} bpm` : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Recovery indicator</p>
                  </CardContent>
                </Card>
              </div>

              {/* Training Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Profile</CardTitle>
                    <CardDescription>Your athletic details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sport/Activity</span>
                      <span className="font-semibold">{athleteData.sport || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Training Level</span>
                      <span className="font-semibold capitalize">{athleteData.training_level || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Training Frequency</span>
                      <span className="font-semibold">{athleteData.training_frequency || 0}x per week</span>
                    </div>
                    {athleteData.performance_goals && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm font-medium mb-1">Performance Goals:</p>
                        <p className="text-sm text-muted-foreground">{athleteData.performance_goals}</p>
                      </div>
                    )}
                    <Button variant="outline" className="w-full bg-transparent">
                      <Target className="mr-2 h-4 w-4" />
                      Update Training Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Metrics</CardTitle>
                    <CardDescription>Latest health measurements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {latestMetric ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Weight</span>
                          <span className="font-semibold">{latestMetric.weight} kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">BMI</span>
                          <span className="font-semibold">{latestMetric.bmi?.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Heart Rate</span>
                          <span className="font-semibold">{latestMetric.heart_rate} bpm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Blood Pressure</span>
                          <span className="font-semibold">
                            {latestMetric.blood_pressure_systolic}/{latestMetric.blood_pressure_diastolic} mmHg
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">No health metrics recorded yet</p>
                    )}
                    <Button variant="outline" className="w-full bg-transparent">
                      <Activity className="mr-2 h-4 w-4" />
                      Log New Metrics
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Nutrition Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Recommendations</CardTitle>
                  <CardDescription>Optimized for {athleteData.sport || "athletic performance"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">Protein</h4>
                      <p className="text-2xl font-bold text-primary mb-1">1.6-2.2g</p>
                      <p className="text-xs text-muted-foreground">per kg body weight</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">Carbohydrates</h4>
                      <p className="text-2xl font-bold text-accent mb-1">5-7g</p>
                      <p className="text-xs text-muted-foreground">per kg body weight</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">Hydration</h4>
                      <p className="text-2xl font-bold text-chart-2 mb-1">3-4L</p>
                      <p className="text-xs text-muted-foreground">water per day</p>
                    </div>
                  </div>
                  <Link href="/meal-plans">
                    <Button className="w-full mt-4">View Personalized Meal Plans</Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
