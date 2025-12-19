import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, Plus } from "lucide-react"
import Link from "next/link"

export default async function MealPlansPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch meal plans
  const { data: mealPlans } = await supabase
    .from("meal_plans")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch today's food log
  const today = new Date().toISOString().split("T")[0]
  const { data: todayLog } = await supabase
    .from("food_log")
    .select("*")
    .eq("user_id", user.id)
    .gte("consumed_at", `${today}T00:00:00`)
    .lte("consumed_at", `${today}T23:59:59`)

  const totalCalories = todayLog?.reduce((sum, item) => sum + (item.calories || 0), 0) || 0
  const totalProtein = todayLog?.reduce((sum, item) => sum + (item.protein || 0), 0) || 0
  const totalCarbs = todayLog?.reduce((sum, item) => sum + (item.carbs || 0), 0) || 0
  const totalFats = todayLog?.reduce((sum, item) => sum + (item.fats || 0), 0) || 0

  return (
    <div className="flex h-screen">
      <DashboardNav userType={profile?.user_type} />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Meal Plans</h1>
              <p className="text-muted-foreground mt-1">Track your nutrition and manage meal plans</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Food
            </Button>
          </div>

          {/* Today's Nutrition */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Nutrition</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Calories</p>
                  <p className="text-2xl font-bold text-primary">{totalCalories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Protein</p>
                  <p className="text-2xl font-bold text-accent">{totalProtein.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">grams</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                  <p className="text-2xl font-bold text-chart-3">{totalCarbs.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">grams</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Fats</p>
                  <p className="text-2xl font-bold text-chart-4">{totalFats.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">grams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Plans */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Meal Plans</h2>
            {mealPlans && mealPlans.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {mealPlans.map((plan: any) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Apple className="h-5 w-5" />
                        {plan.title}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Daily Calories:</span>
                          <span className="font-semibold">{plan.daily_calories} kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Protein:</span>
                          <span className="font-semibold">{plan.daily_protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Carbs:</span>
                          <span className="font-semibold">{plan.daily_carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fats:</span>
                          <span className="font-semibold">{plan.daily_fats}g</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(plan.start_date).toLocaleDateString()} -{" "}
                          {plan.end_date ? new Date(plan.end_date).toLocaleDateString() : "Ongoing"}
                        </p>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Apple className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No meal plans yet</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Get a personalized meal plan from your nutritionist
                  </p>
                  <Link href="/messages/new">
                    <Button>Contact a Nutritionist</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Recent Food Log */}
          {todayLog && todayLog.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Food Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayLog.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{item.food_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.meal_type} • {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.calories} kcal</p>
                        <p className="text-xs text-muted-foreground">
                          P:{item.protein}g C:{item.carbs}g F:{item.fats}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
