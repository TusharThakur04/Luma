# Luma

**Luma** is a full-stack AI website generator inspired by tools like Lovable.
You describe the landing page you want in natural language, and Luma generates a **complete Next.js landing page**

---

## ✨ What Luma Does

- Accepts a **single natural-language prompt**
- Generates **Next.js + Tailwind components** for a landing page
- Runs AI code securely inside **E2B sandboxes**
- Handles long-running AI workflows using **Inngest**
- Persists projects and metadata using **PostgreSQL + Prisma**
- Focuses on **final output**, not iterative editing

---

## 🏗️ Tech Stack

### Frontend

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- Modular UI components (`components/ui`)

### Backend

- **Next.js Route Handlers**
- **tRPC** (end-to-end type safety)
- **Inngest** for background & long-running jobs
- **E2B Sandboxes** to execute LLM-generated code safely

### AI

- Currently wired with **Gemini Flash 2.5** (testing only)
- LLM calls are isolated inside background jobs

### Database

- **PostgreSQL**
- **Prisma ORM**
- Default setup uses **Neon**, but any Postgres provider works

---

## 📐 System Architecture (High Level)

![Luma Architecture](public/luma-architecture.png)

- UI requests trigger **tRPC mutations**
- Long AI tasks are queued via **Inngest**
- Generated code is executed and validated in a **sandbox**
- Results are persisted and rendered as a **landing page**

---

## 📁 Project Structure (Simplified)

```txt
app/                # Next.js App Router pages & API routes
components/ui/      # Reusable UI components
trpc/               # tRPC server & router set up
inngest/            # Background functions & client
prisma/             # DB schema & migrations
lib/                # Shared services (Prisma, utils)
utils/              # Prompt builders, helpers
routes/             # Message and Project Routes
```

## 🚀 Getting Started (Local Setup)

Follow these steps to run **Luma** locally.

---

## 1. Clone the repository

```bash
git clone https://github.com/your-username/luma.git
cd luma
```

## 3. Install dependencies

```bash
npm install
```

## 4. Environment variables

Create a .env file in the project root:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
LLM_API_KEY=your_llm_api_key
```

> ⚠️ Important
> This project does not ship with free LLM credits.
> You must provide your own API key (Gemini / OpenAI / etc.).

## 5. Database setup (Prisma)

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Supported PostgreSQL providers

Neon

Supabase

Local PostgreSQL

Any hosted PostgreSQL instance

## 6. Run Inngest locally

```bash
  npx inngest dev
```

This is required for background LLM jobs and long-running workflows.
Keep this running in a separate terminal.

## 7. Start the development server

```bash
npm run dev
```

## 8. Open the app

Visit the application at:

> http://localhost:3000
