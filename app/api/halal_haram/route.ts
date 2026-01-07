/*import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const flaskForm = new FormData();
    flaskForm.append("file", file);

   // const flaskResponse = await fetch(
 // "https://halal-haram-api.onrender.com",
 // { method: "POST", body: flaskForm }
//);


const flaskResponse = await fetch(
  `${process.env.FLASK_API_URL}/predict`,
  {
    method: "POST",
    body: flaskForm,
  }
);
const data = await flaskResponse.json();
console.log("FROM FLASK:", data);
return NextResponse.json(data);




    if (!flaskResponse.ok) {
      throw new Error(`Flask server error: ${flaskResponse.status}`);
    }

    
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "API crashed" },
      { status: 500 }
    );
  }
}
*/


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
      "https://halal-haram-api.onrender.com/predict", // ⬅⬅⬅ مهم
      {
        method: "POST",
        body: flaskForm,
      }
    );

    if (!flaskResponse.ok) {
      const text = await flaskResponse.text();
      console.error("Flask error:", text);
      throw new Error("Flask request failed");
    }

    const data = await flaskResponse.json();
    console.log("FROM FLASK:", data);

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "API crashed" },
      { status: 500 }
    );
  }
}
