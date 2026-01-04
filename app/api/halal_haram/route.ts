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

    const flaskResponse = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: flaskForm,
    });

    const data = await flaskResponse.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "API crashed" },
      { status: 500 }
    );
  }
}
