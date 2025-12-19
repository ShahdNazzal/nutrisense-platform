import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import fs from "fs/promises"
import path from "path"

async function loadSampleChats() {
  try {
    const filePath = path.join(process.cwd(), "public", "ml_chatbot", "sample_chat.json")
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("[v0] Failed to load sample chats, using hardcoded fallback:", error)
    return [
      { user: "What should I eat today?", bot: "Include more vegetables and protein." },
      { user: "How is my health status?", bot: "Your vitals are stable. Keep tracking daily." },
    ]
  }
}

async function generateResponse(message: string, userType?: string): Promise<string> {
  const sampleChats = await loadSampleChats()
  const lowercaseMessage = message.toLowerCase()

  // Try to find a matching response from sample data
  for (const chat of sampleChats) {
    if (lowercaseMessage.includes(chat.user.toLowerCase().slice(0, 10))) {
      return chat.bot
    }
  }

  // Fallback responses by category
  const responses = {
    greeting: [
      "Hello! I'm NutriBot, your AI nutrition assistant. How can I help you today?",
      "Hi there! I'm here to help with your nutrition and health questions.",
    ],
    pregnancy: [
      "During pregnancy, it's important to focus on folate-rich foods like leafy greens, fortified cereals, and beans. Also ensure adequate calcium, iron, and omega-3 intake.",
      "Prenatal nutrition is crucial! Aim for 300-500 extra calories daily in the 2nd and 3rd trimesters.",
    ],
    athlete: [
      "Athletes need higher protein intake (1.6-2.2g per kg body weight) and proper carbohydrate timing around workouts.",
      "For optimal athletic performance, focus on complex carbs before exercise and protein after.",
    ],
    weight: [
      "Healthy weight loss involves creating a moderate calorie deficit (300-500 calories) and regular physical activity.",
      "For sustainable weight management, aim for 0.5-1kg per week loss.",
    ],
    diet: [
      "A balanced diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats.",
      "Focus on whole, minimally processed foods. Include all food groups in appropriate portions.",
    ],
    default: [
      "That's an interesting question! While I can provide general nutrition guidance, please consult with a registered dietitian for personalized advice.",
      "For detailed medical advice, please consult your doctor. I'm here to provide general nutrition and wellness information.",
    ],
  }

  // Check for greetings
  if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi") || lowercaseMessage.includes("hey")) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
  }

  // Check for pregnancy-related queries
  if (
    lowercaseMessage.includes("pregnan") ||
    lowercaseMessage.includes("prenatal") ||
    lowercaseMessage.includes("expecting")
  ) {
    return responses.pregnancy[Math.floor(Math.random() * responses.pregnancy.length)]
  }

  // Check for athlete-related queries
  if (
    lowercaseMessage.includes("athlete") ||
    lowercaseMessage.includes("sport") ||
    lowercaseMessage.includes("training")
  ) {
    return responses.athlete[Math.floor(Math.random() * responses.athlete.length)]
  }

  // Check for weight-related queries
  if (lowercaseMessage.includes("weight") || lowercaseMessage.includes("lose") || lowercaseMessage.includes("gain")) {
    return responses.weight[Math.floor(Math.random() * responses.weight.length)]
  }

  // Check for diet-related queries
  if (
    lowercaseMessage.includes("diet") ||
    lowercaseMessage.includes("eat") ||
    lowercaseMessage.includes("food") ||
    lowercaseMessage.includes("meal")
  ) {
    return responses.diet[Math.floor(Math.random() * responses.diet.length)]
  }

  return responses.default[Math.floor(Math.random() * responses.default.length)]
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

    console.log("[v0] Chatbot Query:", message)
    console.log("[v0] Using placeholder data from ml_chatbot folder")

    // Get user profile for context
    let userType = "general"
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()
      userType = profile?.user_type || "general"
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 800))

    const botResponse = await generateResponse(message, userType)

    return NextResponse.json({
      response: botResponse,
      conversationId: conversationId || `conv_${Date.now()}`,
      timestamp: new Date().toISOString(),
      modelVersion: "NutriBot NLP v1.5 (Placeholder)",
      userContext: userType,
      note: "Using placeholder data from /ml_chatbot folder. Replace with real ML API for production.",
    })
  } catch (error) {
    console.error("[v0] Chatbot Error:", error)
    return NextResponse.json(
      {
        error: "Failed to process message",
        response: "I'm having trouble processing your request. Please try again.",
      },
      { status: 500 },
    )
  }
}
