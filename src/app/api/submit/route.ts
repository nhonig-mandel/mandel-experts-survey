import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const powerAutomateUrl = process.env.POWER_AUTOMATE_URL;

  if (!powerAutomateUrl || powerAutomateUrl === "https://example.invalid") {
    return NextResponse.json(
      { ok: false, message: "POWER_AUTOMATE_URL is not configured." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(powerAutomateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Power Automate request failed");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Submission could not be forwarded." },
      { status: 500 },
    );
  }
}
