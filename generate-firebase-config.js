import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = resolve(__dirname, ".env");
  if (!existsSync(envPath)) return {};
  return Object.fromEntries(
    readFileSync(envPath, "utf-8")
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        const idx = l.indexOf("=");
        if (idx === -1) return null;
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      })
      .filter(Boolean),
  );
}

const env = loadEnv();
const get = (key) => process.env[key] || env[key] || "";

const config = {
  apiKey: get("FIREBASE_API_KEY"),
  authDomain: get("FIREBASE_AUTH_DOMAIN"),
  databaseURL: get("FIREBASE_DATABASE_URL"),
  projectId: get("FIREBASE_PROJECT_ID"),
  storageBucket: get("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: get("FIREBASE_MESSAGING_SENDER_ID"),
  appId: get("FIREBASE_APP_ID"),
};

const missing = Object.entries(config)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  console.error("Missing Firebase config:", missing.join(", "));
  process.exitCode = 1;
} else {
  const outPath = resolve(
    __dirname,
    "wp-content/themes/js/firebase-config.json",
  );
  writeFileSync(outPath, JSON.stringify(config, null, 2) + "\n");
  console.log("Generated " + outPath);
}
