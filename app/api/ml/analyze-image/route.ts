import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import fs from "fs/promises"
import path from "path"

async function loadSampleResults() {
  try {
    const filePath = path.join(process.cwd(), "public", "dl_model_images", "sample_results.json")
    const fileContent = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("[v0] Failed to load sample results, using hardcoded fallback:", error)
    return {
      test_name: "Blood Test",
      result: "Normal",
      recommendation: "Maintain current diet and hydration",
      confidence: 0.92,
      findings: [
        { type: "Blood Test", value: "Normal", confidence: 0.95 },
        { type: "Glucose Level", value: "95 mg/dL", confidence: 0.93, range: "Normal (70-100 mg/dL)" },
        { type: "Cholesterol", value: "180 mg/dL", confidence: 0.91, range: "Desirable (<200 mg/dL)" },
        { type: "Hemoglobin", value: "14.5 g/dL", confidence: 0.94, range: "Normal (13.5-17.5 g/dL)" },
      ],
      recommendations: [
        "Your test results are within normal ranges",
        "Continue maintaining a balanced diet",
        "Regular exercise recommended",
      ],
    }
  }
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

    const formData = await request.formData()
    const image = formData.get("image") as File
    const analysisType = formData.get("analysisType") as string

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const sampleResults = await loadSampleResults()

    console.log("[v0] ML Image Analysis - Using placeholder data from dl_model_images folder")
    console.log("[v0] Image size:", image.size, "bytes")
    console.log("[v0] Analysis type:", analysisType)

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = {
      status: "success",
      ...sampleResults,
      analysisType,
      imageName: image.name,
      imageSize: image.size,
      processedBy: "NutriSense DL Model v1.0 (Placeholder)",
      timestamp: new Date().toISOString(),
      note: "Using placeholder data from /dl_model_images folder. Replace with real ML API for production.",
    }

    // Save analysis result to database
    const { error: dbError } = await supabase.from("nutritional_analysis").insert({
      user_id: user.id,
      analysis_date: new Date().toISOString().split("T")[0],
      total_calories: 2000,
      total_protein: 75,
      total_carbs: 250,
      total_fats: 65,
      recommendations: result.recommendations.join(", "),
    })

    if (dbError) {
      console.error("[v0] Database error:", dbError)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] ML Image Analysis Error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze image",
        details: "Please ensure the dl_model_images folder exists with sample_results.json",
      },
      { status: 500 },
    )
  }
}
