// server.mjs
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// Optional but recommended security headers:
// import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const CANONICAL_HOST = "www.chosentitle.com";

// Heroku sits behind a proxy. This lets req.secure work with x-forwarded-proto.
app.enable("trust proxy");

// Force HTTPS and canonical host
app.use((req, res, next) => {
  const isHttps =
    req.secure || req.headers["x-forwarded-proto"] === "https";

  // Redirect http -> https
  if (!isHttps) {
    return res.redirect(
      301,
      `https://${req.headers.host}${req.originalUrl}`
    );
  }

  // Redirect apex to www
  const host = req.headers.host?.toLowerCase();
  if (host && host.startsWith("brixbuilds.com")) {
    return res.redirect(
      301,
      `https://${CANONICAL_HOST}${req.originalUrl}`
    );
  }

  // Set HSTS after we are on https
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains"
  );

  return next();
});

// Optional extra security headers
// app.use(helmet());

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
