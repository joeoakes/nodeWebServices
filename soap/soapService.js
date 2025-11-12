import express from "express";
import http from "http";
import morgan from "morgan";
import { createSoapService } from "./soap/soapService.js";
import itemsRouter from "./routes/items.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Simple REST routes
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "REST & SOAP server", timestamp: new Date().toISOString() });
});

app.use("/api/items", itemsRouter);

// Create HTTP server so SOAP can attach to the same port
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Attach SOAP service at /ws/hello
await createSoapService(server, "/ws/hello");

server.listen(PORT, () => {
  console.log(`HTTP server listening on http://localhost:${PORT}`);
  console.log(`REST:  GET  http://localhost:${PORT}/api/health`);
  console.log(`REST:  GET  http://localhost:${PORT}/api/items`);
  console.log(`SOAP WSDL:     http://localhost:${PORT}/ws/hello?wsdl`);
});
