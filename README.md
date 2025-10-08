import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node via IIS!" });
});

// Optional: Serve React app as fallback
app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(process.env.PORT || 3000);
