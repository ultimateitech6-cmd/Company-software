import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const leadsPath = path.join(process.cwd(), "src/data/leads.json");

function readLeads() {
  if (!fs.existsSync(leadsPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(leadsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading leads file:", error);
    return [];
  }
}

function writeLeads(data: any) {
  try {
    fs.writeFileSync(leadsPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing leads file:", error);
  }
}

export async function GET(request: Request) {
  try {
    const headerPass = request.headers.get("x-admin-password");
    const securePassword = process.env.ADMIN_PASSWORD || "admin123";
    if (headerPass !== securePassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = readLeads();
    // Sort by date (newest first)
    leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET leads error:", error);
    return NextResponse.json({ error: "Failed to read leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const leads = readLeads();
    const newLead = {
      id: "lead-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      name,
      email,
      phone: phone || "",
      message: message || "",
      status: "New",
      createdAt: new Date().toISOString()
    };

    leads.push(newLead);
    writeLeads(leads);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("POST lead error:", error);
    return NextResponse.json({ error: "Failed to save lead inquiry" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const headerPass = request.headers.get("x-admin-password");
    const securePassword = process.env.ADMIN_PASSWORD || "admin123";
    if (headerPass !== securePassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const leads = readLeads();
    const index = leads.findIndex((l: any) => l.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    leads[index].status = status;
    writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[index] });
  } catch (error) {
    console.error("PUT lead error:", error);
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const headerPass = request.headers.get("x-admin-password");
    const securePassword = process.env.ADMIN_PASSWORD || "admin123";
    if (headerPass !== securePassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
    }

    const leads = readLeads();
    const filteredLeads = leads.filter((l: any) => l.id !== id);

    if (leads.length === filteredLeads.length) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    writeLeads(filteredLeads);
    return NextResponse.json({ success: true, message: "Lead inquiry deleted successfully" });
  } catch (error) {
    console.error("DELETE lead error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
