"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DashboardNav } from "@/components/dashboard-nav"

export default function AthleteSetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    sport: "",
    trainingLevel: "",
    trainingFrequency: "",
    performanceGoals: "",
    bodyFatPercentage: "",
    muscleMass: "",
    vo2Max: "",
    restingHeartRate: "",
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

      const { error: insertError } = await supabase.from("athlete_data").insert({
        user_id: user.id,
        sport: formData.sport,
        training_level: formData.trainingLevel,
        training_frequency: Number.parseInt(formData.trainingFrequency) || null,
        performance_goals: formData.performanceGoals || null,
        body_fat_percentage: formData.bodyFatPercentage ? Number.parseFloat(formData.bodyFatPercentage) : null,
        muscle_mass: formData.muscleMass ? Number.parseFloat(formData.muscleMass) : null,
        vo2_max: formData.vo2Max ? Number.parseFloat(formData.vo2Max) : null,
        resting_heart_rate: formData.restingHeartRate ? Number.parseInt(formData.restingHeartRate) : null,
      })

      if (insertError) throw insertError

      // Update user type to athlete
      await supabase.from("profiles").update({ user_type: "athlete" }).eq("id", user.id)

      router.push("/athletes")
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
              <CardTitle>Setup Your Athletic Profile</CardTitle>
              <CardDescription>Provide your training details for personalized performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sport">Sport/Activity</Label>
                    <Input
                      id="sport"
                      required
                      placeholder="e.g., Running, Weightlifting"
                      value={formData.sport}
                      onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trainingLevel">Training Level</Label>
                    <Select
                      value={formData.trainingLevel}
                      onValueChange={(value) => setFormData({ ...formData, trainingLevel: value })}
                    >
                      <SelectTrigger id="trainingLevel">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trainingFrequency">Training Frequency (days per week)</Label>
                  <Input
                    id="trainingFrequency"
                    type="number"
                    min="1"
                    max="7"
                    placeholder="e.g., 5"
                    value={formData.trainingFrequency}
                    onChange={(e) => setFormData({ ...formData, trainingFrequency: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="performanceGoals">Performance Goals</Label>
                  <Textarea
                    id="performanceGoals"
                    placeholder="e.g., Increase strength, improve endurance, compete in marathons"
                    value={formData.performanceGoals}
                    onChange={(e) => setFormData({ ...formData, performanceGoals: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bodyFatPercentage">Body Fat %</Label>
                    <Input
                      id="bodyFatPercentage"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 15.5"
                      value={formData.bodyFatPercentage}
                      onChange={(e) => setFormData({ ...formData, bodyFatPercentage: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="muscleMass">Muscle Mass (kg)</Label>
                    <Input
                      id="muscleMass"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 45.2"
                      value={formData.muscleMass}
                      onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vo2Max">VO2 Max (ml/kg/min)</Label>
                    <Input
                      id="vo2Max"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 52.5"
                      value={formData.vo2Max}
                      onChange={(e) => setFormData({ ...formData, vo2Max: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restingHeartRate">Resting Heart Rate (bpm)</Label>
                    <Input
                      id="restingHeartRate"
                      type="number"
                      placeholder="e.g., 55"
                      value={formData.restingHeartRate}
                      onChange={(e) => setFormData({ ...formData, restingHeartRate: e.target.value })}
                    />
                  </div>
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
