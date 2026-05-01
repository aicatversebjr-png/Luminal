import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Generation Proxy (Optional expansion)
  // Note: Per Gemini API guidelines, direct frontend calls are preferred.
  // This endpoint currently serves as a placeholder for backend-specific logic.
  app.post("/api/generate", async (req, res) => {
    const { prompt, config } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Logic for usage limits, logging, or pre-processing could go here
    console.log(`[Backend] Generation request received: ${prompt}`);
    
    // For this implementation, we handle the actual AI call on the frontend
    // to comply with optimized secret management and latency requirements.
    res.json({ 
      message: "Logic moved to frontend for performance. See App.tsx handleGenerate.",
      status: "ready"
    });
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
