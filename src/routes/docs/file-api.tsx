import { createFileRoute } from "@tanstack/react-router";
import { DocPage, CodeBlock, DocTable } from "@/components/DocPage";
import { Heading } from "@/components/Heading";

export const Route = createFileRoute("/docs/file-api")({
  component: FileApiPage,
});

function FileApiPage() {
  return (
    <DocPage
      title="File Management API"
      description="REST endpoints for uploading, downloading, moving, copying, renaming, searching, starring, and trashing files."
    >
      <p className="text-sm text-muted-foreground mb-6">
        All file management endpoints require password authentication if
        enabled. All responses are JSON.
      </p>

      {/* List Files */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-8 mb-3">
        List Files
      </Heading>
      <CodeBlock title="GET /files">
        {`GET /files?path=<relative_path>`}
      </CodeBlock>
      <DocTable
        headers={["Parameter", "Required", "Description"]}
        rows={[
          [
            "path",
            "No",
            "Relative path within the shared directory. Defaults to root.",
          ],
        ]}
      />
      <CodeBlock title="Response" language="json">
        {`[\n  {\n    "name": "documents",\n    "isDir": true,\n    "size": "4.0 KB",\n    "modTime": "2025-01-15 10:30:00",\n    "path": "documents",\n    "isStarred": false\n  },\n  {\n    "name": "photo.jpg",\n    "isDir": false,\n    "size": "2.5 MB",\n    "modTime": "2025-01-15 09:00:00",\n    "path": "photo.jpg",\n    "isStarred": true\n  }\n]`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">
        If <code className="text-primary">path</code> points to a file, the file
        content is served directly.
      </p>

      {/* Upload File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Upload File
      </Heading>
      <CodeBlock title="POST /upload">
        {`POST /upload\nContent-Type: multipart/form-data`}
      </CodeBlock>
      <DocTable
        headers={["Field", "Type", "Description"]}
        rows={[["file", "File", "The file to upload (max 100 MB)"]]}
      />
      <CodeBlock title="Response" language="json">
        {`{\n  "message": "Uploaded",\n  "file": "photo.jpg"\n}`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">
        Errors: <code className="text-primary">413</code> File too large (&gt;
        100 MB), <code className="text-primary">415</code> MIME type not
        allowed.
      </p>

      {/* Download File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Download File
      </Heading>
      <CodeBlock title="GET /download">
        {`GET /download?file=<filename>`}
      </CodeBlock>
      <p className="text-sm text-muted-foreground">Returns raw file content.</p>

      {/* Create Directory */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Create Directory
      </Heading>
      <CodeBlock title="POST /mkdir">
        {`POST /mkdir\nContent-Type: application/json\n\n{ "dirPath": "path/to/new-directory" }\n\n# Response:\n{\n  "message": "Directory created successfully",\n  "path": "path/to/new-directory"\n}`}
      </CodeBlock>

      {/* Move File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Move File
      </Heading>
      <CodeBlock title="POST /move">
        {`POST /move\nContent-Type: application/json\n\n{\n  "sourcePath": "old/location/file.txt",\n  "targetPath": "new/location/file.txt"\n}\n\n# Response:\n{\n  "message": "File moved successfully",\n  "from": "old/location/file.txt",\n  "to": "new/location/file.txt"\n}`}
      </CodeBlock>

      {/* Copy File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Copy File
      </Heading>
      <CodeBlock title="POST /copy">
        {`POST /copy\nContent-Type: application/json\n\n{\n  "sourcePath": "original/file.txt",\n  "targetPath": "copy/file.txt"\n}\n\n# Response:\n{\n  "message": "File copied successfully",\n  "from": "original/file.txt",\n  "to": "copy/file.txt"\n}`}
      </CodeBlock>

      {/* Rename File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Rename File
      </Heading>
      <CodeBlock title="POST /rename">
        {`POST /rename\nContent-Type: application/json\n\n{\n  "oldPath": "documents/report.txt",\n  "newName": "final-report.txt"\n}\n\n# Response:\n{\n  "message": "Renamed successfully",\n  "oldPath": "documents/report.txt",\n  "newPath": "documents/final-report.txt"\n}`}
      </CodeBlock>

      {/* Trash File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Trash File
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        Moves a file to <code className="text-primary">.beamdrop_trash/</code>{" "}
        instead of permanently deleting it.
      </p>
      <CodeBlock title="POST /trash">
        {`POST /trash\nContent-Type: application/json\n\n{ "sourcePath": "file-to-delete.txt" }\n\n# Response:\n{\n  "message": "File moved to trash successfully",\n  "from": "file-to-delete.txt",\n  "to": ".beamdrop_trash/file-to-delete.txt"\n}`}
      </CodeBlock>

      {/* Write File */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Write File
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        Write content directly to a file (creates parent directories
        automatically).
      </p>
      <CodeBlock title="POST /write">
        {`POST /write\nContent-Type: application/json\n\n{\n  "filePath": "notes/readme.txt",\n  "content": "Hello, World!"\n}\n\n# Response:\n{\n  "message": "File written successfully",\n  "filePath": "notes/readme.txt"\n}`}
      </CodeBlock>

      {/* Search Files */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Search Files
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        Recursively search for files by name (case-insensitive substring match).
      </p>
      <CodeBlock title="GET /search">
        {`GET /search?q=<query>&path=<optional_path>`}
      </CodeBlock>
      <DocTable
        headers={["Parameter", "Required", "Description"]}
        rows={[
          ["q", "Yes", "Search query"],
          ["path", "No", "Restrict search to a subdirectory"],
        ]}
      />
      <CodeBlock title="Response" language="json">
        {`{\n  "query": "report",\n  "path": "",\n  "results": [\n    {\n      "name": "final-report.txt",\n      "isDir": false,\n      "size": "1.2 KB",\n      "modTime": "2025-01-15 10:30:00",\n      "path": "documents/final-report.txt",\n      "isStarred": false\n    }\n  ],\n  "count": 1\n}`}
      </CodeBlock>

      {/* Star / Unstar */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Star / Unstar File
      </Heading>
      <p className="text-sm text-muted-foreground mb-3">
        Toggle the starred status of a file (starred → unstarred, unstarred →
        starred).
      </p>
      <CodeBlock title="POST /star">
        {`POST /star\nContent-Type: application/json\n\n{ "filePath": "documents/important.pdf" }\n\n# Response (starred):\n{ "message": "File starred", "filePath": "documents/important.pdf", "starred": "true" }\n\n# Response (unstarred):\n{ "message": "File unstarred", "filePath": "documents/important.pdf", "starred": "false" }`}
      </CodeBlock>

      {/* Get Starred */}
      <Heading as="h2" className="text-xl font-bold font-mono uppercase tracking-tight mt-10 mb-3">
        Get Starred Files
      </Heading>
      <CodeBlock title="GET /starred">
        {`GET /starred\n\n# Response:\n{\n  "starred": [\n    {\n      "filePath": "documents/important.pdf",\n      "createdAt": "2025-01-15T10:30:00Z"\n    }\n  ]\n}`}
      </CodeBlock>
    </DocPage>
  );
}
