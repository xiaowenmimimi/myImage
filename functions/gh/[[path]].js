export async function onRequest(context) {
  // [[path]] 对应的参数名就是 path，这里会是一个数组
  const segments = context.params.path || [];
  const path = segments.join("/");

  // 组装成 GitHub Raw 地址
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
