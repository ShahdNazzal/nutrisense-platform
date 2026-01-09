import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function generateResponse(message: string): Promise<string> {
  try {
    const response = await fetch(
      "https://healthbot-render.onrender.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }
    )

    if (!response.ok) {
      throw new Error("Render API failed")
    }

    const data = await response.json()
    return data.response || "No response from health assistant."
  } catch (error) {
    console.error("HealthBot Render error:", error)
    return "I'm having trouble reaching the health assistant. Please try again later."
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await request.json()
    const { message, conversationId } = body

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 })
    }

    console.log("[v1] Chatbot Query:", message)
    console.log("[v1] Forwarding request to Render backend")

    // 🔹 الآن نستدعي generateResponse بدون userType
    const botResponse = await generateResponse(message)

    return NextResponse.json({
      response: botResponse,
      conversationId: conversationId || `conv_${Date.now()}`,
      timestamp: new Date().toISOString(),
      modelVersion: "HealthBot Render v1",
      note: "Responses are fetched from Render backend",
    })
  } catch (error) {
    console.error("[v1] Chatbot Error:", error)
    return NextResponse.json(
      {
        error: "Failed to process message",
        response: "I'm having trouble processing your request. Please try again.",
      },
      { status: 500 }
    )
  }
}
