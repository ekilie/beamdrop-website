import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/error-codes")({
  component: ErrorCodesPage,
});

function ErrorCodesPage() {
  return (
    <DocPage
      title="Error Codes"
      description="Structured error responses with machine-readable codes for all failure scenarios."
    >
      {/* Error Format */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        Error Response Format
      </Heading>
      <CodeBlock title="JSON error structure" language="json">
        {`{\n  "code": "BUCKET_NOT_FOUND",\n  "category": "NOT_FOUND",\n  "message": "Bucket 'my-bucket' not found"\n}`}
      </CodeBlock>

      {/* Categories */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Error Categories
      </Heading>
      <DocTable
        headers={["Category", "Description"]}
        rows={[
          ["VALIDATION", "Input validation errors"],
          ["STORAGE", "Storage/filesystem errors"],
          ["AUTH", "Authentication/authorization"],
          ["NOT_FOUND", "Resource not found"],
          ["CONFLICT", "Resource conflict"],
          ["RATE_LIMIT", "Rate limiting"],
          ["INTERNAL", "Internal server errors"],
          ["UNAVAILABLE", "Service unavailable"],
        ]}
      />

      {/* Validation Errors */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Validation Errors (400)
      </Heading>
      <DocTable
        headers={["Code", "HTTP", "Description"]}
        rows={[
          ["INVALID_REQUEST", "400", "Malformed request body or parameters"],
          [
            "INVALID_BUCKET_NAME",
            "400",
            "Bucket name doesn't meet naming rules",
          ],
          [
            "INVALID_OBJECT_KEY",
            "400",
            "Invalid object key (empty, traversal, too long)",
          ],
          ["INVALID_PATH", "400", "Path traversal attempt or invalid path"],
          ["INVALID_MIME_TYPE", "415", "File MIME type not in allowed list"],
          ["FILE_TOO_LARGE", "413", "File exceeds 100 MB limit"],
          ["MISSING_FIELD", "400", "Required field missing"],
        ]}
      />

      {/* Storage Errors */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Storage Errors (500)
      </Heading>
      <DocTable
        headers={["Code", "HTTP", "Description"]}
        rows={[
          ["OBJECT_LOCKED", "423", "Object is locked by another operation"],
          ["WRITE_FAILED", "500", "Failed to write file"],
          ["READ_FAILED", "500", "Failed to read file"],
          ["DELETE_FAILED", "500", "Failed to delete file"],
          ["IO_ERROR", "500", "General filesystem I/O error"],
        ]}
      />

      {/* Auth Errors */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Authentication Errors (401/403)
      </Heading>
      <DocTable
        headers={["Code", "HTTP", "Description"]}
        rows={[
          ["UNAUTHORIZED", "401", "Missing or invalid auth credentials"],
          ["FORBIDDEN", "403", "Invalid signature or insufficient permissions"],
          ["INVALID_TOKEN", "401", "JWT token is invalid"],
          ["TOKEN_EXPIRED", "401", "JWT or timestamp expired"],
          ["INVALID_API_KEY", "401", "API key not found or disabled"],
          ["INVALID_PASSWORD", "401", "Wrong password"],
        ]}
      />

      {/* Not Found */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Not Found Errors (404)
      </Heading>
      <DocTable
        headers={["Code", "HTTP", "Description"]}
        rows={[
          ["BUCKET_NOT_FOUND", "404", "Bucket doesn't exist"],
          ["OBJECT_NOT_FOUND", "404", "Object doesn't exist"],
          ["FILE_NOT_FOUND", "404", "File doesn't exist"],
        ]}
      />

      {/* Conflict */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Conflict Errors (409)
      </Heading>
      <DocTable
        headers={["Code", "HTTP", "Description"]}
        rows={[
          ["BUCKET_EXISTS", "409", "Bucket already exists"],
          ["FILE_EXISTS", "409", "File already exists"],
          ["BUCKET_NOT_EMPTY", "409", "Cannot delete non-empty bucket"],
        ]}
      />

      {/* Rate Limit */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Rate Limit Errors (429)
      </Heading>
      <DocTable
        headers={["Code", "HTTP", "Description"]}
        rows={[
          ["RATE_LIMIT_EXCEEDED", "429", "Per-IP rate limit exceeded"],
          ["TOO_MANY_REQUESTS", "429", "Too many requests"],
        ]}
      />

      <CodeBlock title="Rate limit response example" language="markup">
        {`HTTP/1.1 429 Too Many Requests\nRetry-After: 60\nX-Retryable: true\n\n{\n  "error": {\n    "code": "RATE_LIMIT_EXCEEDED",\n    "message": "Rate limit exceeded",\n    "category": "RATE_LIMIT"\n  }\n}`}
      </CodeBlock>
    </DocPage>
  );
}
