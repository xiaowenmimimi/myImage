export async function onRequest(context) {
  const path = context.params.path.join("/");
  const url = `https://raw.githubusercontent.com/${path}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000"
    },
    status: res.status
  });
}