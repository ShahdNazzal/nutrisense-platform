"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function UploadPage() {
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [predicting, setPredicting] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatResponse, setChatResponse] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setAnalyzing(true)
    setAnalysisResult(null)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch("/api/ml/analyze-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image")
      }

      setAnalysisResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleHealthPrediction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setPredicting(true)
    setPredictionResult(null)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        age: Number(formData.get("age")),
        weight: Number(formData.get("weight")),
        height: Number(formData.get("height")),
        bloodPressure: formData.get("bloodPressure"),
        bloodSugar: formData.get("bloodSugar"),
        cholesterol: formData.get("cholesterol"),
      }

      const response = await fetch("/api/ml/predict-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate prediction")
      }

      setPredictionResult(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setPredicting(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    setChatLoading(true)
    setChatResponse("")

    try {
      const response = await fetch("/api/ml/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      setChatResponse(data.response)
      setChatMessage("")
    } catch (err: any) {
      setChatResponse("Sorry, I couldn't process your message. Please try again.")
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI-Powered Health Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Upload medical results, get health predictions, or chat with our AI assistant
          </p>
        </div>

        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="image">Medical Image Analysis</TabsTrigger>
            <TabsTrigger value="prediction">Health Prediction</TabsTrigger>
            <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deep Learning Image Analysis</CardTitle>
                <CardDescription>Upload your medical test results for AI-powered analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleImageUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Medical Test Image</Label>
                    <Input id="image" name="image" type="file" accept="image/*" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="analysisType">Analysis Type</Label>
                    <Input
                      id="analysisType"
                      name="analysisType"
                      placeholder="e.g., Blood Test, X-Ray"
                      defaultValue="Blood Test"
                    />
                  </div>

                  <Button type="submit" disabled={analyzing} className="w-full">
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload & Analyze
                      </>
                    )}
                  </Button>
                </form>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {analysisResult && (
                  <div className="mt-6 space-y-4">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        Analysis complete! Confidence: {(analysisResult.confidence * 100).toFixed(0)}%
                      </AlertDescription>
                    </Alert>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Analysis Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {analysisResult.findings?.map((finding: any, idx: number) => (
                          <div key={idx} className="border-b border-border pb-3 last:border-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{finding.type}</p>
                                <p className="text-2xl font-bold text-primary mt-1">{finding.value}</p>
                                {finding.range && <p className="text-sm text-muted-foreground mt-1">{finding.range}</p>}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {(finding.confidence * 100).toFixed(0)}% confident
                              </span>
                            </div>
                          </div>
                        ))}

                        <div className="mt-6">
                          <h4 className="font-semibold mb-2">Recommendations</h4>
                          <ul className="space-y-2">
                            {analysisResult.recommendations?.map((rec: string, idx: number) => (
                              <li key={idx} className="text-sm flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">Processed by: {analysisResult.processedBy}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prediction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning Health Prediction</CardTitle>
                <CardDescription>Enter your health data to get AI-powered risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHealthPrediction} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" name="age" type="number" required placeholder="30" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" name="weight" type="number" step="0.1" required placeholder="70" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input id="height" name="height" type="number" required placeholder="170" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">Blood Pressure</Label>
                      <Input id="bloodPressure" name="bloodPressure" placeholder="120/80" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                      <Input id="bloodSugar" name="bloodSugar" placeholder="95" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                      <Input id="cholesterol" name="cholesterol" placeholder="180" />
                    </div>
                  </div>

                  <Button type="submit" disabled={predicting} className="w-full">
                    {predicting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Generate Health Prediction"
                    )}
                  </Button>
                </form>

                {predictionResult && (
                  <div className="mt-6 space-y-4">
                    <Card className="border-primary">
                      <CardHeader>
                        <CardTitle className="text-lg">Your Health Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-5xl font-bold text-primary">{predictionResult.healthScore}</div>
                          <p className="text-muted-foreground mt-2">Overall Status: {predictionResult.overallHealth}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Risk Factors</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {predictionResult.riskFactors?.map((risk: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{risk.factor}</p>
                              <p className="text-sm text-muted-foreground">{risk.status}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">{risk.score}</p>
                              <p
                                className={`text-sm ${
                                  risk.risk === "Low"
                                    ? "text-green-600"
                                    : risk.risk === "Medium"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {risk.risk} Risk
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {predictionResult.recommendations?.map((rec: string, idx: number) => (
                            <li key={idx} className="text-sm flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-muted-foreground mt-4">
                          Next checkup recommended in: {predictionResult.nextCheckup}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Nutrition Assistant</CardTitle>
                <CardDescription>Ask questions about nutrition, diet, and healthy living</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="min-h-[300px] border border-border rounded-lg p-4 space-y-4">
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

                  {chatResponse && (
                    <div className="flex items-start space-x-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        AI
                      </div>
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">{chatResponse}</p>
                      </div>
                    </div>
                  )}

                  {chatLoading && (
                    <div className="flex items-start space-x-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        AI
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleChatSubmit} className="flex space-x-2">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
