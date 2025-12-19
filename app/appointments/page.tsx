import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus } from "lucide-react"
import Link from "next/link"

export default async function AppointmentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch upcoming appointments
  const { data: upcomingAppointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", user.id)
    .gte("appointment_date", new Date().toISOString())
    .order("appointment_date", { ascending: true })

  // Fetch past appointments
  const { data: pastAppointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", user.id)
    .lt("appointment_date", new Date().toISOString())
    .order("appointment_date", { ascending: false })
    .limit(5)

  return (
    <div className="flex h-screen">
      <DashboardNav userType={profile?.user_type} />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-muted-foreground mt-1">Manage your consultations</p>
            </div>
            <Link href="/appointments/book">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            {upcomingAppointments && upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((apt: any) => (
                  <Card key={apt.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{apt.appointment_type}</h3>
                            <Badge
                              variant={
                                apt.status === "confirmed"
                                  ? "default"
                                  : apt.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {apt.status}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-2 h-4 w-4" />
                              {new Date(apt.appointment_date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-2 h-4 w-4" />
                              {new Date(apt.appointment_date).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              ({apt.duration_minutes} minutes)
                            </div>
                          </div>
                          {apt.notes && <p className="text-sm text-muted-foreground mt-2">{apt.notes}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Reschedule
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No upcoming appointments</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Book a consultation with our healthcare providers
                  </p>
                  <Link href="/appointments/book">
                    <Button>Book Your First Appointment</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments && pastAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
              <div className="space-y-4">
                {pastAppointments.map((apt: any) => (
                  <Card key={apt.id} className="opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{apt.appointment_type}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(apt.appointment_date).toLocaleDateString()} at{" "}
                            {new Date(apt.appointment_date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <Badge variant="outline">{apt.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
