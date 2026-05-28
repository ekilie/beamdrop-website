import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/typescript-guide")({
  component: TypeScriptGuidePage,
});

function TypeScriptGuidePage() {
  return (
    <DocPage
      title="TypeScript Guide"
      description="A complete TypeScript usage flow covering authentication, file management, S3 operations, presigned URLs, shares, and monitoring."
    >
      {/* Helper */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Setup Helper
      </Heading>
      <CodeBlock title="beamdrop.ts — base helper" language="typescript">
        {`import crypto from "crypto";\n\nconst BASE_URL = "http://localhost:7777";\n\nasync function request(\n  method: string,\n  path: string,\n  options: {\n    body?: any;\n    headers?: Record<string, string>;\n    token?: string;\n    formData?: FormData;\n  } = {},\n): Promise<any> {\n  const headers: Record<string, string> = {\n    ...options.headers,\n  };\n\n  if (options.token) {\n    headers["Authorization"] = \`Bearer \${options.token}\`;\n  }\n\n  let body: any;\n  if (options.formData) {\n    body = options.formData;\n  } else if (options.body) {\n    headers["Content-Type"] = "application/json";\n    body = JSON.stringify(options.body);\n  }\n\n  const res = await fetch(\`\${BASE_URL}\${path}\`, { method, headers, body });\n\n  const contentType = res.headers.get("content-type") || "";\n  if (contentType.includes("application/json")) {\n    return res.json();\n  }\n  return res;\n}`}
      </CodeBlock>

      {/* Auth */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        1. Check Auth & Login
      </Heading>
      <CodeBlock title="Authentication" language="typescript">
        {`// Check if auth is required\nconst authStatus = await request("GET", "/auth/status");\nconsole.log("Auth enabled:", authStatus.authEnabled);\nconsole.log("Authenticated:", authStatus.authenticated);\n\n// Login (if password auth enabled)\nlet authToken: string | undefined;\nif (authStatus.authEnabled && !authStatus.authenticated) {\n  const loginResult = await request("POST", "/auth/login", {\n    body: { password: "mysecretpassword" },\n  });\n  console.log("Login:", loginResult.message);\n  authToken = loginResult.token;\n}`}
      </CodeBlock>

      {/* File Operations */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        2. File Operations
      </Heading>
      <CodeBlock
        title="List, upload, download, manage files"
        language="typescript"
      >
        {`// List files\nconst files = await request("GET", "/files?path=documents", { token: authToken });\nconsole.log("Files:", files);\n\n// Upload a file\nconst formData = new FormData();\nformData.append("file", new Blob(["Hello from Beamdrop!"]), "hello.txt");\nconst uploadResult = await request("POST", "/upload", {\n  formData,\n  token: authToken,\n});\nconsole.log("Upload:", uploadResult);\n// => { message: "Uploaded", file: "hello.txt" }\n\n// Download a file\nconst res = await request("GET", "/download?file=hello.txt", { token: authToken });\nif (res instanceof Response) {\n  const content = await res.text();\n  console.log("Downloaded:", content);\n}\n\n// Create a directory\nconst mkdirResult = await request("POST", "/mkdir", {\n  body: { dirPath: "projects/my-app" },\n  token: authToken,\n});\nconsole.log("Mkdir:", mkdirResult);\n\n// Write file content directly\nconst writeResult = await request("POST", "/write", {\n  body: { filePath: "projects/my-app/README.md", content: "# My App\\n\\nBuilt with Beamdrop!" },\n  token: authToken,\n});\nconsole.log("Write:", writeResult);\n\n// Move a file\nawait request("POST", "/move", {\n  body: { sourcePath: "hello.txt", targetPath: "projects/my-app/hello.txt" },\n  token: authToken,\n});\n\n// Copy a file\nawait request("POST", "/copy", {\n  body: { sourcePath: "projects/my-app/hello.txt", targetPath: "hello-backup.txt" },\n  token: authToken,\n});\n\n// Rename a file\nawait request("POST", "/rename", {\n  body: { oldPath: "hello-backup.txt", newName: "hello-copy.txt" },\n  token: authToken,\n});\n\n// Search files\nconst searchResult = await request("GET", "/search?q=hello", { token: authToken });\nconsole.log("Search:", searchResult.count, "files found");\n\n// Star / Unstar a file\nawait request("POST", "/star", {\n  body: { filePath: "projects/my-app/README.md" },\n  token: authToken,\n});\nconst starred = await request("GET", "/starred", { token: authToken });\nconsole.log("Starred files:", starred.starred);\n\n// Trash a file (soft delete)\nawait request("POST", "/trash", {\n  body: { sourcePath: "hello-copy.txt" },\n  token: authToken,\n});`}
      </CodeBlock>

      {/* S3 Bucket Operations */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        3. S3 Bucket Operations
      </Heading>
      <CodeBlock title="Bucket CRUD" language="typescript">
        {`// Create an API key first (uses session auth)\nconst apiKey = await request("POST", "/api/v1/keys", {\n  body: { name: "my-app-key", permissions: "read,write", expiresIn: 2592000 },\n  token: authToken,\n});\nconsole.log("Access Key ID:", apiKey.accessKeyId);\nconsole.log("Secret Key:", apiKey.secretKey); // SAVE THIS! Shown only once.\n\nconst ACCESS_KEY_ID = apiKey.accessKeyId;\nconst SECRET_KEY = apiKey.secretKey;\n\n// HMAC signature helper\nfunction generateSignature(secretKey: string, method: string, path: string, timestamp: string) {\n  const message = \`\${method}\\n\${path}\\n\${timestamp}\`;\n  const hmac = crypto.createHmac("sha256", secretKey);\n  hmac.update(message);\n  return hmac.digest("base64");\n}\n\nasync function s3Request(method: string, path: string, options: { body?: any; stream?: Buffer } = {}) {\n  const timestamp = new Date().toISOString();\n  const signature = generateSignature(SECRET_KEY, method, path, timestamp);\n  const headers: Record<string, string> = {\n    Authorization: \`Bearer \${ACCESS_KEY_ID}:\${signature}\`,\n    "X-Beamdrop-Date": timestamp,\n  };\n  let body: any;\n  if (options.stream) body = options.stream;\n  else if (options.body) {\n    headers["Content-Type"] = "application/json";\n    body = JSON.stringify(options.body);\n  }\n  const res = await fetch(\`\${BASE_URL}\${path}\`, { method, headers, body });\n  if (res.status === 204) return null;\n  const ct = res.headers.get("content-type") || "";\n  return ct.includes("application/json") ? res.json() : res;\n}\n\n// Create a bucket\nconst createBucket = await s3Request("PUT", "/api/v1/buckets/my-bucket");\nconsole.log("Created bucket:", createBucket);\n\n// List buckets\nconst buckets = await s3Request("GET", "/api/v1/buckets");\nconsole.log("Buckets:", buckets);\n\n// Delete empty bucket\nawait s3Request("DELETE", "/api/v1/buckets/my-bucket");`}
      </CodeBlock>

      {/* S3 Object Operations */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        4. S3 Object Operations
      </Heading>
      <CodeBlock title="Upload, download, list objects" language="typescript">
        {`// Upload via PUT (raw body)\nconst putObject = await s3Request("PUT", "/api/v1/buckets/my-bucket/configs/app.json", {\n  stream: Buffer.from(JSON.stringify({ version: "1.0", debug: false })),\n});\nconsole.log("PUT object:", putObject);\n// => { bucket: "my-bucket", key: "configs/app.json", etag: "...", size: 38 }\n\n// Download object\nconst objectContent = await s3Request("GET", "/api/v1/buckets/my-bucket/configs/app.json");\nif (objectContent instanceof Response) {\n  console.log("Object:", await objectContent.text());\n}\n\n// List objects with prefix & delimiter\nconst allObjects = await s3Request("GET", "/api/v1/buckets/my-bucket?prefix=configs/");\nconsole.log("Objects:", allObjects);\n\n// List virtual directories\nconst virtualDirs = await s3Request("GET", "/api/v1/buckets/my-bucket?delimiter=/");\nconsole.log("Virtual directories:", virtualDirs.commonPrefixes);\n\n// Delete object\nawait s3Request("DELETE", "/api/v1/buckets/my-bucket/configs/app.json");`}
      </CodeBlock>

      {/* API Keys */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        5. API Key Management
      </Heading>
      <CodeBlock title="Create, list, delete API keys" language="typescript">
        {`// Create an API key (uses session auth, not API key auth)\nconst key = await request("POST", "/api/v1/keys", {\n  body: {\n    name: "ci-deploy",\n    permissions: "read,write",\n    bucketScope: "deployments",\n    expiresIn: 2592000,  // 30 days\n  },\n  token: authToken,\n});\nconsole.log("Access Key ID:", key.accessKeyId);\nconsole.log("Secret Key:", key.secretKey);  // shown only once!\n\n// List keys\nconst keys = await request("GET", "/api/v1/keys", { token: authToken });\nconsole.log("Active keys:", keys.keys);\n\n// Delete a key\nawait request("DELETE", \`/api/v1/keys?accessKeyId=\${key.accessKeyId}\`, {\n  token: authToken,\n});`}
      </CodeBlock>

      {/* Presigned URLs */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        6. Presigned URLs
      </Heading>
      <CodeBlock title="Client-side HMAC presigned URL" language="typescript">
        {`// Generate a presigned URL for direct download access\nfunction presign(bucket: string, key: string, accessKeyId: string, secretKey: string, ttl = 3600) {\n  const expires = Math.floor(Date.now() / 1000) + ttl;\n  const path = \`/api/v1/buckets/\${bucket}/\${key}\`;\n  const data = \`GET\\n\${path}\\n\${expires}\`;\n  const sig = crypto.createHmac("sha256", secretKey).update(data).digest("hex");\n  return \`\${BASE_URL}\${path}?X-Bd-Expires=\${expires}&X-Bd-KeyId=\${accessKeyId}&X-Bd-Signature=\${sig}\`;\n}\n\nconst presignedUrl = presign("my-bucket", "configs/app.json", ACCESS_KEY_ID, SECRET_KEY, 3600);\nconsole.log("Presigned URL:", presignedUrl);`}
      </CodeBlock>
      <CodeBlock title="Server-side presigned URLs" language="typescript">
        {`// Create a presigned download token via S3 API\nconst dl = await s3Request("POST", "/api/v1/buckets/my-bucket/configs/app.json/presign", {\n  body: { expiresIn: 86400 },\n});\nconsole.log("Download URL:", dl.url);  // /dl/{token}\n\n// List active presigned tokens\nconst tokens = await s3Request("GET", "/api/v1/buckets/my-bucket/configs/app.json/presign");\nconsole.log("Active tokens:", tokens);\n\n// Revoke a token\nawait s3Request("DELETE", \`/api/v1/buckets/my-bucket/configs/app.json/presign/\${dl.token}\`);`}
      </CodeBlock>

      {/* Shares */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        7. Shareable Links
      </Heading>
      <CodeBlock title="Create, access, delete shares" language="typescript">
        {`// Create a shareable link\nconst share = await request("POST", "/api/shares", {\n  body: {\n    filePath: "projects/my-app/README.md",\n    expiresIn: 86400,    // 24 hours (seconds)\n    maxDownloads: 100,\n    password: "secret",\n  },\n  token: authToken,\n});\nconsole.log("Share token:", share.token);\nconsole.log("URL:", share.url);\n\n// List all links\nconst shares = await request("GET", "/api/shares/list", { token: authToken });\nconsole.log("Active shares:", shares.shares?.length);\n\n// Access shared content (password required if set)\nconst shared = await request("POST", \`/api/shares/access/\${share.token}\`, {\n  body: { password: "secret" },\n});\nconsole.log("Shared file:", shared);\n\n// Delete a share\nawait request("DELETE", \`/api/shares/delete?token=\${share.token}\`, {\n  token: authToken,\n});`}
      </CodeBlock>

      {/* Health & Stats */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        8. Health & Monitoring
      </Heading>
      <CodeBlock title="Health, stats, logs" language="typescript">
        {`// Health check\nconst health = await request("GET", "/health");\nconsole.log("Service:", health.service);\nconsole.log("Database:", health.components.database.status, health.components.database.latency);\nconsole.log("Storage:", health.components.storage.status);\n\n// Server stats\nconst stats = await request("GET", "/stats");\nconsole.log("Downloads:", stats.downloads, "Uploads:", stats.uploads);\nconsole.log("Requests:", stats.requests, "Start time:", stats.startTime);\n\n// Query logs\nconst logs = await request("GET", "/api/logs?limit=10&level=error", { token: authToken });\nconsole.log("Errors:", logs.logs);\nconsole.log("Total:", logs.total, "Has more:", logs.hasMore);`}
      </CodeBlock>

      {/* WebSocket */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        9. Real-Time Stats (WebSocket)
      </Heading>
      <CodeBlock title="WebSocket connection" language="typescript">
        {`const ws = new WebSocket("ws://localhost:7777/ws/stats");\n\nws.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  console.log("Downloads:", data.downloads);\n  console.log("Uploads:", data.uploads);\n  console.log("Requests:", data.requests);\n  console.log("Memory:", data.system.memory);\n  console.log("Disk:", data.system.disk);\n  console.log("CPU:", data.system.cpu);\n};\n\nws.onerror = (err) => console.error("WebSocket error:", err);\nws.onclose = () => console.log("WebSocket closed");`}
      </CodeBlock>

      {/* Logout */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        10. Logout
      </Heading>
      <CodeBlock title="Logout" language="typescript">
        {`await request("POST", "/auth/logout", { token: authToken });\nauthToken = undefined;\nconsole.log("Logged out");`}
      </CodeBlock>
    </DocPage>
  );
}
