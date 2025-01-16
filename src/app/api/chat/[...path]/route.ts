import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const DOMAIN = "https://miuye.shibaura-it.ac";

  try {
    const response = await fetch(`${DOMAIN}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request.body,
    });

    // Server-Sent Eventsのレスポンスをそのまま転送
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to proxy request" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
