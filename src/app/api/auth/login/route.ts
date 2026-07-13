import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const secureEmail = process.env.ADMIN_EMAIL || "admin@ultimate.com";
    const securePassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === secureEmail && password === securePassword) {
      // Return success and a secure validation key (the admin password) to store in local session
      return NextResponse.json({
        success: true,
        token: securePassword,
        message: "Authentication successful"
      });
    } else {
      return NextResponse.json(
        { error: "Incorrect email or password. Please try again." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Authentication API Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
