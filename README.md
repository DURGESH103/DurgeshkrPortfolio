# Durgesh Kumar — Portfolio

A modern, premium portfolio website built with **Next.js 16**, **React 19**, **Tailwind CSS**, **Framer Motion**, and **TypeScript**.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **UI**: React 19 + Tailwind CSS
- **Animations**: Framer Motion + react-type-animation
- **Icons**: Lucide React
- **Theme**: next-themes (Dark/Light mode)
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles + CSS variables
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Home page (all sections composed)
│   ├── sitemap.ts        # Auto sitemap
│   └── robots.ts         # robots.txt
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Reveal.tsx        # Scroll reveal wrapper
│   │   └── ThemeToggle.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Achievements.tsx
│       ├── Education.tsx
│       ├── Certifications.tsx
│       ├── GithubDashboard.tsx
│       ├── Resume.tsx
│       └── Contact.tsx
├── data/
│   ├── config.ts         # Site config, nav links, social URLs
│   └── portfolio.ts      # All portfolio data (skills, projects, etc.)
└── lib/
    └── utils.ts          # cn() helper
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✏️ Customization

All content lives in **`src/data/`** — no need to touch component code:

| File | What to edit |
|------|-------------|
| `src/data/config.ts` | Name, social links, resume URL, nav items |
| `src/data/portfolio.ts` | Skills, projects, experience, achievements, education, certifications |

### Replace placeholder content

1. **Profile photo**: Replace the `DK` initials div in `Hero.tsx` with a `<Image>` component pointing to your photo in `public/`
2. **Resume**: Add your PDF as `public/resume.pdf`
3. **GitHub username**: Update `GITHUB_USERNAME` in `GithubDashboard.tsx`
4. **Contact form**: Wire up `Contact.tsx` submit handler to [Formspree](https://formspree.io) or an API route

### Update social links in `src/data/config.ts`:
```ts
github: 'https://github.com/YOUR_USERNAME',
linkedin: 'https://linkedin.com/in/YOUR_USERNAME',
email: 'your@email.com',
leetcode: 'https://leetcode.com/YOUR_USERNAME',
```

## 🌐 Deploy to Vercel (Recommended)

### Option 1 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option 2 — GitHub Integration
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Click **Deploy** — zero config needed

### Option 3 — Vercel Dashboard
1. Zip the project and upload at [vercel.com/new](https://vercel.com/new)

## 🎨 Color Theme

| Token | Dark | Light |
|-------|------|-------|
| Background | `#0F172A` | `#FFFFFF` |
| Card | `#1E293B` | `#F8FAFC` |
| Primary | `#3B82F6` | `#2563EB` |
| Accent | `#38BDF8` | — |
| Text | `#F8FAFC` | `#0F172A` |

## 📄 License

MIT © Durgesh Kumar
