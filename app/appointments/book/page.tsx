"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BookAppointmentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [doctors, setDoctors] = useState<any[]>([])
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentType: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  })

  useEffect(() => {
    const fetchDoctors = async () => {
      const supabase = createClient()
      const { data } = await supabase
  .from("doctors")
  .select("id, full_name, specialization, consultation_fee")
  .eq("verified", true)
  .order("full_name")




      if (data) setDoctors(data)
    }
    fetchDoctors()
  }, [])

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

      const appointmentDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`)

      const { error: insertError } = await supabase.from("appointments").insert({
        patient_id: user.id,
        doctor_id: formData.doctorId || null,
        appointment_date: appointmentDateTime.toISOString(),
        appointment_type: formData.appointmentType,
        patient_notes: formData.notes || null,
        status: "pending",
      })

      if (insertError) throw insertError

      router.push("/appointments")
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
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Schedule a consultation with a healthcare provider</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="doctor">Select Doctor (Optional)</Label>
                  <Select
                    value={formData.doctorId}
                    onValueChange={(value) => setFormData({ ...formData, doctorId: value })}
                  >
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Any available doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor: any) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                         {doctor.full_name} - {doctor.specialization} (${doctor.consultation_fee})

                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <Select
                    required
                    value={formData.appointmentType}
                    onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
                  >
                    <SelectTrigger id="appointmentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Initial Consultation">Initial Consultation</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Nutrition Assessment">Nutrition Assessment</SelectItem>
                      <SelectItem value="Meal Plan Review">Meal Plan Review</SelectItem>
                      <SelectItem value="Pregnancy Consultation">Pregnancy Consultation</SelectItem>
                      <SelectItem value="Athletic Performance">Athletic Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDate">Date</Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime">Time</Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      required
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    placeholder="Any specific concerns or questions you'd like to discuss..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Booking..." : "Book Appointment"}
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
