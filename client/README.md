# Vector — SaaS Resume Builder

A modern, full-featured resume builder built with **Next.js 15 (App Router)**, **TypeScript**, **TailwindCSS**, and **React**.

## ✨ Features

- **Live Preview** — Resume updates in real time as you type
- **ATS-Optimized Template** — Clean, parseable resume layout
- **6 Resume Sections** — Personal info, Education, Experience, Projects, Skills, Achievements
- **Collapsible Sections** — Clean, organized form editor
- **Persistent Storage** — Data saved to localStorage automatically
- **Responsive Design** — Mobile-friendly split-screen layout
- **Modern SaaS UI** — Linear/Stripe-inspired aesthetic

## 📁 Project Structure

```
resume-builder/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── globals.css         # Global styles + Tailwind
│   ├── page.tsx            # Landing page
│   ├── builder/page.tsx    # Resume builder (split screen)
│   ├── payment/page.tsx    # Payment/pricing page
│   └── download/page.tsx   # Download success page
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PricingCard.tsx
│   │   └── StepIndicator.tsx
│   └── resume/
│       ├── ResumeTemplate.tsx   # ATS-friendly resume layout
│       ├── ResumePreview.tsx    # Preview pane with zoom
│       ├── ResumeForm.tsx       # All form sections
│       └── SectionEditor.tsx   # Collapsible section wrapper
├── lib/
│   └── resume-context.tsx  # Global state + localStorage
├── types/
│   └── resume.ts           # TypeScript interfaces + default data
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🚀 Getting Started

### 1. Create a new Next.js app

```bash
npx create-next-app@latest resume-builder --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd resume-builder
```

### 2. Install additional dependencies

```bash
npm install geist nanoid
```

### 3. Copy all files

Replace the generated files with all the files from this project:
- Copy all files in `app/` → your `app/`
- Copy all files in `components/` → your `components/`
- Copy `lib/resume-context.tsx` → your `lib/`
- Copy `types/resume.ts` → your `types/`
- Replace `tailwind.config.ts` with ours

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, how-it-works |
| `/builder` | Split-screen resume builder |
| `/payment` | Pricing + checkout UI |
| `/download` | Success + PDF download page |

## 🎨 Design System

- **Colors**: Neutral palette + indigo accent (#4f46e5)
- **Font**: Geist Sans (from Vercel)
- **Resume Font**: Georgia (ATS-friendly serif)
- **Radius**: xl/2xl/3xl rounded corners
- **Shadows**: Soft layered shadows (no harsh drops)
- **Motion**: Staggered fade-in animations, hover lifts

## 🔧 Extending

### Adding PDF export
Install `@react-pdf/renderer` or `html2canvas` + `jspdf`:
```bash
npm install jspdf html2canvas
```
Then in the download page, target the `ResumeTemplate` DOM node and convert it.

### Adding a backend
Replace `localStorage` in `lib/resume-context.tsx` with API calls to save/load resumes per user.

### Adding more templates
Create new components in `components/resume/` following the `ResumeTemplate.tsx` pattern, then let the user pick.
