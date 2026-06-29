import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
let CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
let CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  const envPath = resolve(__dirname, ".env");
  if (existsSync(envPath)) {
    const env = Object.fromEntries(
      readFileSync(envPath, "utf-8")
        .split("\n")
        .filter(Boolean)
        .map((l) => l.split("=").map((s) => s.trim())),
    );
    CLOUDINARY_CLOUD_NAME ||= env.CLOUDINARY_CLOUD_NAME;
    CLOUDINARY_API_KEY ||= env.CLOUDINARY_API_KEY;
    CLOUDINARY_API_SECRET ||= env.CLOUDINARY_API_SECRET;
  }
}

const auth = Buffer.from(
  `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`,
).toString("base64");

async function listAll(folder, cursor = null) {
  const params = { max_results: 500 };
  if (folder) params.prefix = folder + "/";
  if (cursor) params.next_cursor = cursor;
  const qs = new URLSearchParams(params);
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload?${qs}`;
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || res.statusText);
  }
  return res.json();
}

(async () => {
  try {
    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary credentials.");
      process.exitCode = 1;
      return;
    }

    const albums = [
      { name: 'OM.EDIT', folder: 'AH.WEDDING/OM.EDIT' },
      { name: 'HOPE.EDIT', folder: 'AH.WEDDING/HOPE.EDIT' },
      { name: 'NT.PICS', folder: 'AH.WEDDING/NT.PICS' },
      { name: 'SG.PICS', folder: 'AH.WEDDING/SG.PICS' },
      { name: 'MEMORIES.PICS', folder: 'AH.WEDDING/MEMORIES.PICS' },
    ];
    const result = { albums: [] };

    for (const { name, folder } of albums) {
      console.log(`Fetching ${name}...`);
      let all = [];
      let cursor = null;
      do {
        const data = await listAll(folder, cursor);
        all = all.concat(
          data.resources.map((r) => ({
            url: r.secure_url,
            publicId: r.public_id,
            format: r.format,
            width: r.width,
            height: r.height,
          })),
        );
        cursor = data.next_cursor || null;
      } while (cursor);

      console.log(`  ${all.length} assets`);
      result.albums.push({ name, folder: folder || "(root)", assets: all });
    }

    writeFileSync(
      resolve(__dirname, "cloudinary-images.json"),
      JSON.stringify(result, null, 2),
    );
    console.log(`\nSaved to cloudinary-images.json`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exitCode = 1;
  }
})();
