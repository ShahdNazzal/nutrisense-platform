import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send } from "lucide-react"
import Link from "next/link"

export default async function MessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch all messages (sent and received)
  const { data: messages } = await supabase
    .from("messages")
    .select(
      `
      *,
      sender:sender_id(full_name, role),
      receiver:receiver_id(full_name, role)
    `,
    )
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order("created_at", { ascending: false })

  // Fetch doctors for starting new conversations
  const { data: doctors } = await supabase
    .from("doctors")
    .select("id, specialization, profiles!inner(full_name)")
    .limit(5)

  return (
    <div className="flex h-screen">
      <DashboardNav userType={profile?.user_type} />
      <main className="flex-1 overflow-auto bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground mt-1">Communicate with your healthcare providers</p>
            </div>
            <Link href="/messages/new">
              <Button>
                <Send className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </Link>
          </div>

          {messages && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message: any) => {
                const isSender = message.sender_id === user.id
                const otherPerson = isSender ? message.receiver : message.sender
                return (
                  <Card key={message.id} className={message.status === "unread" && !isSender ? "border-primary" : ""}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            {isSender ? `To: ${otherPerson?.full_name}` : `From: ${otherPerson?.full_name}`}
                            {otherPerson?.role === "doctor" && (
                              <span className="ml-2 text-xs font-normal text-muted-foreground">(Doctor)</span>
                            )}
                          </CardTitle>
                          {message.subject && (
                            <p className="text-sm text-muted-foreground mt-1">Subject: {message.subject}</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                      <Link href={`/messages/${message.id}`}>
                        <Button variant="ghost" size="sm" className="mt-2">
                          View Message
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No messages yet</h3>
                <p className="text-sm text-muted-foreground mb-6">Start a conversation with your healthcare provider</p>
                {doctors && doctors.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Available Doctors:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {doctors.map((doctor: any) => (
                        <Link key={doctor.id} href={`/messages/new?doctor=${doctor.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            {doctor.profiles.full_name} - {doctor.specialization}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
