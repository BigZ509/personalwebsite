import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT || 4179);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".glb": "model/gltf-binary", ".txt": "text/plain" };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    try { if ((await stat(file)).isDirectory()) file = path.join(file, "index.html"); } catch { /* 404 below */ }
    let data;
    let status = 200;
    try { data = await readFile(file); } catch {
      file = path.join(root, "404.html");
      data = await readFile(file);
      status = 404;
    }
    response.writeHead(status, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(400).end("Bad request");
  }
}).listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
