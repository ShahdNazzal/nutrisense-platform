import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Dummy ML prediction fallback
const DUMMY_PREDICTIONS = {
  overallHealth: "Good",
  healthScore: 78,
  riskFactors: [
    { factor: "BMI", status: "Normal", risk: "Low", score: 85 },
    { factor: "Blood Pressure", status: "Optimal", risk: "Low", score: 92 },
    { factor: "Cholesterol", status: "Borderline", risk: "Medium", score: 68 },
    { factor: "Blood Sugar", status: "Normal", risk: "Low", score: 88 },
  ],
  predictions: {
    cardiovascularRisk: { level: "Low", percentage: 12, nextYears: 10 },
    diabetesRisk: { level: "Low", percentage: 8, nextYears: 5 },
    nutritionalDeficiency: { level: "Low", percentage: 15 },
  },
  recommendations: [
    "Maintain current exercise routine",
    "Monitor cholesterol levels",
    "Increase omega-3 intake",
    "Consider vitamin D supplementation",
  ],
  nextCheckup: "3 months",
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { age, weight, height, bloodPressure, bloodSugar, cholesterol, lifestyle } = body

    console.log("[v0] ML Health Prediction - Using dummy data fallback")
    console.log("[v0] Patient data:", { age, weight, height, bloodPressure })

    // TODO: Replace with real ML API endpoint
    // Example: const response = await fetch('https://your-ml-api.com/predict-health', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.ML_API_KEY}`
    //   },
    //   body: JSON.stringify(body)
    // })

    // Simulate ML model processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate BMI from input
    const bmi = weight && height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null

    const result = {
      ...DUMMY_PREDICTIONS,
      patientData: {
        age,
        weight,
        height,
        bmi,
        bloodPressure,
        bloodSugar,
        cholesterol,
      },
      modelVersion: "NutriSense ML v2.1 (Demo)",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] ML Health Prediction Error:", error)
    return NextResponse.json(
      { error: "Failed to generate health prediction", details: DUMMY_PREDICTIONS },
      { status: 500 },
    )
  }
}
