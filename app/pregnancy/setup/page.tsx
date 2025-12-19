"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardNav } from "@/components/dashboard-nav"

export default function PregnancySetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    dueDate: "",
    currentWeek: "",
    complications: "",
    dietaryRestrictions: "",
    prenatalVitamins: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const currentWeek = Number.parseInt(formData.currentWeek)
      const trimester = currentWeek <= 13 ? 1 : currentWeek <= 27 ? 2 : 3

      const { error: insertError } = await supabase.from("pregnancy_data").insert({
        user_id: user.id,
        due_date: formData.dueDate,
        current_week: currentWeek,
        trimester,
        complications: formData.complications || null,
        dietary_restrictions: formData.dietaryRestrictions || null,
        prenatal_vitamins: formData.prenatalVitamins || null,
      })

      if (insertError) throw insertError

      // Update user type to pregnant
      await supabase.from("profiles").update({ user_type: "pregnant" }).eq("id", user.id)

      router.push("/pregnancy")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      <DashboardNav />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Setup Your Pregnancy Profile</CardTitle>
              <CardDescription>Provide your pregnancy details for personalized care and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentWeek">Current Week</Label>
                    <Input
                      id="currentWeek"
                      type="number"
                      min="1"
                      max="42"
                      required
                      placeholder="e.g., 12"
                      value={formData.currentWeek}
                      onChange={(e) => setFormData({ ...formData, currentWeek: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenatalVitamins">Prenatal Vitamins & Supplements</Label>
                  <Input
                    id="prenatalVitamins"
                    placeholder="e.g., Prenatal Multi, Folic Acid 400mcg"
                    value={formData.prenatalVitamins}
                    onChange={(e) => setFormData({ ...formData, prenatalVitamins: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</Label>
                  <Textarea
                    id="dietaryRestrictions"
                    placeholder="e.g., Lactose intolerant, avoiding caffeine"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complications">Medical Complications or Notes</Label>
                  <Textarea
                    id="complications"
                    placeholder="Any pregnancy complications or medical conditions"
                    value={formData.complications}
                    onChange={(e) => setFormData({ ...formData, complications: e.target.value })}
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Saving..." : "Complete Setup"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
