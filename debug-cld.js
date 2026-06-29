import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '.env');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8').split('\n').filter(Boolean).map(l => l.split('=').map(s => s.trim()))
);

const auth = Buffer.from(env.CLOUDINARY_API_KEY + ':' + env.CLOUDINARY_API_SECRET).toString('base64');
const url = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?max_results=5`;

const res = await fetch(url, { headers: { Authorization: 'Basic ' + auth } });
console.log('Status:', res.status, res.statusText);
const text = await res.text();
console.log('Response:', text.slice(0, 500));
