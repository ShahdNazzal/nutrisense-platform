"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewMessagePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [doctors, setDoctors] = useState<any[]>([])
  const [formData, setFormData] = useState({
    receiverId: searchParams.get("doctor") || "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const fetchDoctors = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("doctors")
        .select("id, specialization, profiles!inner(full_name)")
        .order("profiles(full_name)")

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

      const { error: insertError } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: formData.receiverId,
        subject: formData.subject || null,
        message: formData.message,
        status: "unread",
      })

      if (insertError) throw insertError

      router.push("/messages")
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
              <CardTitle>New Message</CardTitle>
              <CardDescription>Send a message to your healthcare provider</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="receiver">To (Doctor)</Label>
                  <Select
                    required
                    value={formData.receiverId}
                    onValueChange={(value) => setFormData({ ...formData, receiverId: value })}
                  >
                    <SelectTrigger id="receiver">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor: any) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.profiles.full_name} - {doctor.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief subject line"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={8}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Sending..." : "Send Message"}
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
