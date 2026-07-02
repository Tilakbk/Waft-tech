import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const pageContext: Record<string, string> = {
  "/": "the homepage, where visitors get an overview of Waft Tech",
  "/works": "our portfolio of case studies and past projects",
  "/company": "our company story, team, and values",
  "/what-we-do": "our Discover, Design, and Build service process",
  "/insights": "our blog and industry articles",
  "/careers": "open roles, benefits, and company culture",
  "/contact": "getting in touch or starting a project",
};

function getPageContext(page: string): string {
  if (pageContext[page]) return pageContext[page];
  const base = "/" + page.split("/")[1];
  return pageContext[base] || "the Waft Tech website";
}

function mockReply(userText: string, page: string): string {
  const lower = userText.toLowerCase();
  const context = getPageContext(page);

  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget")) {
    return "Project costs depend on scope and complexity. The best next step is to send us a quick brief through the Contact page, and our team will follow up with a tailored estimate.";
  }
  if (lower.includes("contact") || lower.includes("talk") || lower.includes("call")) {
    return "You can reach our team directly from the Contact page, either send a message or schedule a call, whichever works best for you.";
  }
  if (lower.includes("job") || lower.includes("career") || lower.includes("hiring") || lower.includes("intern")) {
    return "We are always looking for talented people. Check out the Careers page for open roles, or send your resume to hr@wafttech.io if nothing currently fits.";
  }
  if (lower.includes("service") || lower.includes("what do you do") || lower.includes("offer")) {
    return "We help clients discover, design, and build digital products, from strategy and UX to full engineering. You can see the full breakdown on the What We Do page.";
  }

  return "Thanks for the question! I am currently connected to " + context + ". Once our backend is live, I will be able to give you much more detailed answers. In the meantime, feel free to explore the site or reach out through the Contact page.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];
    const page: string = body.page || "/";
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const reply = mockReply(lastUserMessage ? lastUserMessage.content : "", page);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Sorry, something went wrong processing your message." }, { status: 500 });
  }
}