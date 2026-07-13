import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/db.json");

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database file not found" }, { status: 404 });
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const headerPass = request.headers.get("x-admin-password");
    const securePassword = process.env.ADMIN_PASSWORD || "admin123";
    if (headerPass !== securePassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Quick validation to check correct keys are present
    if (!body.pricingPlans || !body.blogPosts || !body.testimonials) {
      return NextResponse.json({ error: "Invalid database structure" }, { status: 400 });
    }

    fs.writeFileSync(dbPath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Database updated successfully" });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Failed to update database" }, { status: 500 });
  }
}
