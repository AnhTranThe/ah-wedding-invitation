# 💍 Wedding Thế Anh & Lệ Huỳnh

Digital wedding invitation website with guest wish ticker, photo albums, countdown, and audio playlist.

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **HTML5 / CSS3 / JavaScript (ES6+)** | Core web technologies |
| **UIkit 3.17.11** | UI framework (countdown, scrollspy, grid, animations) |
| **Bootstrap 5.2.3** | Responsive layout & utility classes |
| **jQuery 3.7.1** | DOM manipulation |
| **Swiper 11** | Touch-enabled photo carousels |
| **Fancybox 5** | Lightbox gallery |
| **GLightbox** | Touch-friendly album lightbox |
| **AOS (Animate On Scroll)** | Scroll-triggered animations |
| **Lazysizes 5.3.2** | Lazy loading for images |
| **Remixicon 4.0** | Icon set |
| **Disable Devtool 0.3.9** | Blocks DevTools on production |

### Fonts
- **Google Fonts:** Playfair Display, Be Vietnam Pro, Dancing Script, Great Vibes, Srisakdi, Noto Serif Display, Quicksand, WindSong
- **Local:** SVN-Gilroy (Bold, Medium, Regular)

### Backend & Services
| Service | Usage |
|---|---|
| **Firebase Realtime Database** | Stores & streams guest wishes in real-time |
| **Cloudinary** | Image/video CDN for all wedding photos and album assets |
| **AWS S3 (ap-southeast-1)** | Supplementary image hosting, video, and background audio |

### Build & CI/CD
| Tool | Purpose |
|---|---|
| **npm** | Package management & scripts |
| **live-server** | Local dev server with hot reload |
| **clean-css-cli** | CSS minification |
| **html-minifier** | HTML minification |
| **terser** | JS minification |
| **GitHub Actions** | CI/CD — generates config from secrets, deploys to GitHub Pages |
| **generate-firebase-config.js** | Reads `.env` / secrets, writes `firebase-config.json` |
| **list-cloudinary.js** | Fetches all Cloudinary assets, writes `cloudinary-images.json` |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The dev script generates `firebase-config.json` from `.env` and starts a local server on port 5501.

## Deployment

Push to `main` → GitHub Actions generates configs from repository secrets and deploys to GitHub Pages.

### Required Secrets

| Secret | Description |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `FIREBASE_API_KEY` | Firebase Web API key |
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `FIREBASE_DATABASE_URL` | Firebase Realtime Database URL |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `FIREBASE_APP_ID` | Firebase app ID |

## Project Structure

```
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── index.html                      # Main wedding page
├── gallery.html                    # Photo gallery page
├── cloudinary-images.json          # Auto-generated asset list
├── generate-firebase-config.js     # Firebase config generator
├── list-cloudinary.js              # Cloudinary asset fetcher
├── wp-content/
│   ├── themes/
│   │   ├── assets/                 # Custom CSS & JS
│   │   ├── css/                    # Framework & theme CSS
│   │   ├── js/                     # Scripts & firebase-config.json
│   │   ├── pic/                    # Static images
│   │   └── font/                   # Local fonts
│   └── ...
└── .env                            # Local environment variables
```
