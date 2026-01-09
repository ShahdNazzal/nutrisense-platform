"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function HealthChatbot() {
  const [chatMessage, setChatMessage] = useState("")
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([])
  const [chatLoading, setChatLoading] = useState(false)

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    // أضف رسالة المستخدم أولاً
    const userMsg = { sender: "user", content: chatMessage }
    setMessages((prev) => [...prev, userMsg])
    setChatMessage("")
    setChatLoading(true)

    try {
      const response = await fetch("https://healthbot-render.onrender.com/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      })
      const data = await response.json()
      const botMsg = { sender: "ai", content: data.response || "No response from health assistant." }
      setMessages((prev) => [...prev, botMsg])
    } catch (error) {
      const botMsg = { sender: "ai", content: "I'm having trouble reaching the health assistant. Please try again later." }
      setMessages((prev) => [...prev, botMsg])
      console.error(error)
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="min-h-[300px] border border-border rounded-lg p-4 space-y-4 flex flex-col overflow-y-auto max-h-[400px]">
        {messages.length === 0 && !chatLoading && (
          <div className="flex items-start space-x-2">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              AI
            </div>
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">
                Hello! I'm NutriBot, your AI nutrition assistant. Ask me anything about nutrition, diet,
                pregnancy nutrition, athletic performance, or healthy living!
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} space-x-2`}>
            {msg.sender === "user" ? (
              <>
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
                <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  You
                </div>
              </>
            ) : (
              <>
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  AI
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </>
            )}
          </div>
        ))}

        {chatLoading && (
          <div className="flex justify-start">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      <form onSubmit={handleChatSubmit} className="mt-4 flex space-x-2 items-center">
        <Input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Ask me about nutrition..."
          disabled={chatLoading}
        />
        <Button type="submit" disabled={chatLoading || !chatMessage.trim()}>
          Send
        </Button>
      </form>

      <div className="text-xs text-muted-foreground">
        <p>Try asking about:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Pregnancy nutrition and prenatal vitamins</li>
          <li>Athletic performance and sports nutrition</li>
          <li>Weight management strategies</li>
          <li>Balanced diet recommendations</li>
        </ul>
      </div>
    </div>
  )
}
