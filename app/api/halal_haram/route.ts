import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const flaskForm = new FormData();
    flaskForm.append("file", file);

    const flaskResponse = await fetch(
      "https://orange-spoon-r4v5rv4qp94whx45j-5000.app.github.dev/predict", // URL العام مع /predict
      { method: "POST", body: flaskForm }
    );

    if (!flaskResponse.ok) {
      throw new Error(`Flask server error: ${flaskResponse.status}`);
    }

    const data = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "API crashed" },
      { status: 500 }
    );
  }
}
