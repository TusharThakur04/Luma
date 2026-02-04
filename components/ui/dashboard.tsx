import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardProps {
  classname?: string;
  userId: string;
}

const Dashboard = ({ classname, userId }: DashboardProps) => {
  const [isOpen, setOpen] = useState(false);

  const trpc = useTRPC();
  const router = useRouter();

  const { data: projects } = useQuery(
    trpc.project.getProjects.queryOptions({ userId }),
  );

  return (
    <div
      className={cn(
        "p-2 text-neutral-400 bg-neutral-900 h-full flex flex-col",
        classname,
      )}
    >
      <div className="p-2 inline-flex w-fit gap-1  items-center h-13">
        <Image
          className="h-7 w-7"
          src="/logo.png"
          alt="Luma"
          height={30}
          width={30}
        />

        <span className="text-2xl text-gray-50 font-extrabold">Luma</span>
      </div>
      <div className="p-1 mt-5 overflow-auto flex-1">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 text-[1rem] inline-flex items-center text-gray-200 rounded-lg hover:bg-gray-700/50 transition-all"
        >
          {isOpen ? <ChevronDown height={20} /> : <ChevronRight height={20} />}
          <span>Projects</span>
        </button>
        {isOpen && (
          <ul
            className={cn(
              "mt-2 ml-6 space-y-1 transition-all",
              !isOpen && "hidden",
            )}
          >
            {projects &&
              projects.map((project, index) => (
                <li
                  onClick={() => router.push(`/projects/${project.id}`)}
                  key={index}
                  className="text-[0.9rem] text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  {project.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;








<explanation> Below is a tailored guide, based on your file tree and README, for drawing a precise system-architecture diagram of this Next.js project. 1. Project Type and Purpose • Full-stack Next.js (App Router) application • Frontend: React-based UI library under components/ui & app pages • Backend: Next.js API routes (REST), tRPC endpoints, Inngest background functions • Database: Prisma ORM managing PostgreSQL (per prisma/schema.prisma) 2. Main Components A. Client–Browser Layer – app/layout.tsx, app/page.tsx and dynamic pages (app/projects/[projectId]/page.tsx) – React UI components (components/ui/**) – Hooks (hooks/use-mobile.ts) – trpc/client.tsx or fetch calls to API routes B. Next.js Server (Server-Side Rendering & API) – App Router endpoints under app/api: • /hello (app/api/hello/route.ts) – simple health check/demo • /inngest (app/api/inngest/route.ts) – HTTP trigger for Inngest functions • /trpc (app/api/trpc/[trpc]/route.ts) – tRPC HTTP adaptor – Custom Express-style routes under routes/*.ts (messageRoute.ts, projectRoute.ts) – Proxy logic (proxy.ts) for dev or special routing C. Business-Logic & Services – trpc/server.tsx + routers in trpc/routers/_app.ts – Inngest functions (inngest/functions.ts) – background jobs/events – Utility modules (lib/utils.ts, utils/prompts.ts) – Prisma client (lib/prisma.ts) D. Data Layer – Prisma schema & migrations (prisma/) – PostgreSQL or other SQL database E. External/Deployment – Vercel (per README deploy recommendation) – Inngest cloud (if using hosted event engine) 3. Interactions & Data Flows 1. User → Next.js Frontend (SSR/CSR) 2a. Frontend → tRPC client → /api/trpc → tRPC server → business logic → Prisma → DB 2b. Frontend → fetch(‘/api/hello’) or fetch(‘/api/inngest’) as needed 2c. Frontend → custom REST routes (routes/messageRoute.ts) for legacy or specialized endpoints 3. Inngest: HTTP trigger enqueues background function → business logic → Prisma → DB 4. DB sends results back upstream to UI via SSR or client re-fetch 4. Architectural Patterns & Principles • Layered Architecture: Presentation (UI), API Layer (Next.js routes, tRPC), Business Logic, Data Access (Prisma) • Event-Driven for background jobs via Inngest • Modular UI with atomic components (components/ui) • Code-gen & type safety via tRPC + Prisma 5. Diagram Tailoring Guidelines – Use distinct shapes/colors: • Blue boxes for Frontend (Next.js pages, React components) • Green boxes for API layers (Next.js API, tRPC, Inngest) • Orange boxes for Business Logic modules (trpc/server, inngest/functions, utils) • Gray cylinder for Database (PostgreSQL) • Dashed box for external services (Vercel, Inngest cloud) – Label arrows with protocol/tech: “HTTP/REST”, “tRPC”, “Prisma client” – Show directional data flow: Browser → Next.js SSR/API → Business Logic → Database → Business Logic → Browser – Highlight background/event path separately: Inngest HTTP → Inngest Function → DB 6. Diagram Elements to Include • Boxes for: – Next.js Frontend (app/) – API Routes (/app/api/hello, /app/api/trpc, /app/api/inngest) – tRPC Server + Routers – Inngest Functions – Custom Routes (routes/) – Prisma Client & Schema – Utility modules (utils/, lib/) • Arrows for each interaction path, labeled appropriately • Color-code or shape-code per layer/component type • Clear component names matching directories/files • Notes on SSR vs. CSR where applicable (e.g., app/page.tsx = SSR entry) By following these steps, you’ll produce a clear, accurate system design diagram that reflects this project’s multi-layered architecture, from React UIs through Next.js API surfaces and background workers down to the database. </explanation>





Checking if its cached...
Step 0/3
Explanation:

<explanation> 1. Project Type and Purpose - This is a full-stack, monolithic Next.js (App Router) web application. - It provides project-based messaging functionality (“projects,” “messages,” “fragments”). - It uses tRPC for type-safe RPC endpoints, Inngest for background jobs, and Prisma as the ORM. 2. File Structure Analysis - **app/** • `app/page.tsx`, `app/layout.tsx`, `app/globals.css`: main layout, styling, and home page. • `app/api/…`: Next.js serverless Route Handlers for HTTP endpoints (`hello`, `inngest`, `trpc`). • `app/projects/[projectId]/page.tsx`: dynamic route for project-specific UI. - **components/ui/** • Reusable React UI primitives (buttons, tables, dialogs, etc.). - **trpc/** • `trpc/server.tsx`, `trpc/routers/_app.ts`, client setup, and query client. - **routes/** • Express-style custom endpoints (`messageRoute.ts`, `projectRoute.ts`) probably proxied from `proxy.ts`. - **inngest/** • `client.ts`, `functions.ts`: background job definitions and invocation code. - **lib/** and **utils/** • `prisma.ts`: Prisma client instantiation. • `utils.ts`, `prompts.ts`: shared utility functions. - **prisma/** • Schema, migrations, DB definitions (projects, messages, fragments). - **hooks/** and **views/** • Client hooks (`use-mobile.ts`) and higher-order view components (project_view, signedInHomePage). 3. System Components to Draw a. Client Browser • Loads React pages/SSR from Next.js (app directory). • Executes tRPC client calls and standard fetch to Next.js API. b. Next.js Web Server • Serves SSR/SSG pages. • Hosts serverless Route Handlers under `app/api`. • Hosts tRPC server endpoint under `app/api/trpc` or `trpc/server.tsx`. c. Custom Express Routes (if used) • Hosted behind `proxy.ts`, routing `/api/projects`, `/api/messages`. d. Inngest Worker • Background job runner that picks up tasks defined in `inngest/functions.ts`. e. Prisma ORM & PostgreSQL • `lib/prisma.ts` provides a single Prisma client to both HTTP handlers and Inngest functions. f. External/Hosting Services • Vercel or Node server hosting. • Inngest Cloud or self-hosted Inngest webhook receiver. 4. Relationships and Data Flows - **Browser → Next.js SSR/SSG**: HTTP GET for pages (React components render). - **Browser → tRPC HTTP endpoint**: JSON‐RPC over HTTP for data fetching/mutations. - **Browser → app/api Route Handlers**: fetch or Axios to REST endpoints (hello, inngest). - **Next.js API / tRPC → Prisma → PostgreSQL**: reads/writes project, message, fragment models. - **Next.js API → Inngest Client**: enqueues background jobs (e.g., send notification, fragment analysis). - **Inngest Worker → Prisma → PostgreSQL**: performs async work, updates database, emits events. - **Inngest Worker → External Systems** (optional): email/SMS, third-party integrations. 5. Architectural Patterns and Principles - **Separation of Concerns**: • UI layer (React + components/ui) • API layer (Next.js Route Handlers + tRPC) • Data layer (Prisma + PostgreSQL) • Background processing (Inngest) - **Type Safety End-to-End** via tRPC and TypeScript. - **Serverless Functions** under Next.js App Router architecture. - **Modularity**: isolated routers in `trpc/routers`, and standalone Inngest functions. 6. Diagram Tailoring Guidelines - Use **boxes** to group: • Frontend (Browser + Next.js page SSR) • Backend (API routers, tRPC server, Express routes) • Data Layer (Prisma client, PostgreSQL) • Worker Layer (Inngest) - Draw **directional arrows**: • From Browser to Next.js pages & API endpoints • From API to Data Layer & Inngest • From Inngest Worker back to Data Layer & external services - **Color-code**: • Blue for UI / Browser • Green for HTTP/API Layer • Orange for Database Layer • Purple for Background Worker Layer - **Annotate** each arrow with HTTP method or protocol (e.g., GET/POST, RPC, DB Query). 7. Diagram Elements Checklist - Clear **labels** on every component box. - **Arrows** with direction and annotated protocols. - **Legend** for colors/shapes. - **Grouping** boxes (e.g., Next.js App Router vs. standalone Worker). - Note key files/modules inside each box (e.g., `app/api`, `trpc/routers`, `prisma/schema.prisma`, `inngest/functions.ts`). By following these guidelines and mapping each directory/module to its runtime role, you’ll capture a precise architecture diagram that reflects how the Next.js frontend, API layers, background workers, and database interconnect in this project.

Mermaid.js diagram:

flowchart TB
    subgraph "Frontend Layer"
        Browser["Browser"]:::frontend
        SSR["Next.js SSR/SSG\n(app/page.tsx, app/layout.tsx, app/projects/[projectId]/page.tsx)"]:::frontend
        UI["UI Components\n(components/ui)"]:::frontend
        HOViews["Hooks & Views\n(hooks/use-mobile.ts, views/project_view.tsx, views/signedInHomePage.tsx)"]:::frontend
    end

    subgraph "API Layer"
        NextAPI["Next.js Route Handlers\n(app/api/hello/route.ts, app/api/inngest/route.ts, app/api/trpc/[trpc]/route.ts)"]:::api
        tRPCServer["tRPC Server\n(trpc/server.tsx, trpc/routers/_app.ts)"]:::api
        tRPCClient["tRPC Client\n(trpc/client.tsx, trpc/query-client.ts, trpc/init.ts)"]:::api
        ExpressRoutes["Express-style Routes\n(routes/projectRoute.ts, routes/messageRoute.ts, proxy.ts)"]:::api
    end

    subgraph "Data Layer"
        PrismaClient["Prisma Client\n(lib/prisma.ts)"]:::db
        Postgres["PostgreSQL\n(prisma/schema.prisma, prisma/migrations/)"]:::db
    end

    subgraph "Worker Layer"
        InngestClient["Inngest Client\n(inngest/client.ts)"]:::worker
        InngestFunctions["Inngest Functions\n(inngest/functions.ts)"]:::worker
        InngestWorker["Inngest Worker"]:::worker
    end

    Utils["Utilities\n(lib/utils.ts, utils/prompts.ts)"]:::util
    External["External Systems\n(email/SMS, 3rd party)"]:::external

    Browser -->|"GET pages"| SSR
    SSR -->|"renders pages"| Browser
    Browser -->|"tRPC RPC"| tRPCClient
    Browser -->|"Fetch REST"| NextAPI

    tRPCClient -->|"RPC HTTP"| tRPCServer
    NextAPI -->|"HTTP REST"| PrismaClient
    tRPCServer -->|"RPC→ORM"| PrismaClient
    NextAPI -->|"Enqueue job"| InngestClient

    InngestClient -->|"Define job"| InngestFunctions
    InngestWorker -->|"Invoke functions"| InngestFunctions
    InngestFunctions -->|"ORM access"| PrismaClient
    InngestWorker -->|"Uses ORM"| PrismaClient
    PrismaClient -->|"SQL queries"| Postgres
    InngestWorker -->|"External calls"| External

    classDef frontend fill:#AEDFF7,stroke:#333,stroke-width:1px
    classDef api fill:#C6F7DD,stroke:#333,stroke-width:1px
    classDef db fill:#FFD8B8,stroke:#333,stroke-width:1px
    classDef worker fill:#E0C4FE,stroke:#333,stroke-width:1px
    classDef util fill:#ECECEC,stroke:#333,stroke-width:1px
    classDef external fill:#F0F0F0,stroke:#333,stroke-width:1px

    click SSR "https://github.com/tusharthakur04/luma/blob/main/app/layout.tsx"
    click SSR "https://github.com/tusharthakur04/luma/blob/main/app/page.tsx"
    click SSR "https://github.com/tusharthakur04/luma/blob/main/app/projects/[projectId]/page.tsx"
    click UI "https://github.com/tusharthakur04/luma/tree/main/components/ui"
    click NextAPI "https://github.com/tusharthakur04/luma/blob/main/app/api/hello/route.ts"
    click NextAPI "https://github.com/tusharthakur04/luma/blob/main/app/api/inngest/route.ts"
    click NextAPI "https://github.com/tusharthakur04/luma/blob/main/app/api/trpc/[trpc]/route.ts"
    click tRPCServer "https://github.com/tusharthakur04/luma/blob/main/trpc/server.tsx"
    click tRPCServer "https://github.com/tusharthakur04/luma/blob/main/trpc/routers/_app.ts"
    click tRPCClient "https://github.com/tusharthakur04/luma/blob/main/trpc/client.tsx"
    click tRPCClient "https://github.com/tusharthakur04/luma/blob/main/trpc/query-client.ts"
    click tRPCClient "https://github.com/tusharthakur04/luma/blob/main/trpc/init.ts"
    click ExpressRoutes "https://github.com/tusharthakur04/luma/blob/main/routes/projectRoute.ts"
    click ExpressRoutes "https://github.com/tusharthakur04/luma/blob/main/routes/messageRoute.ts"
    click ExpressRoutes "https://github.com/tusharthakur04/luma/blob/main/proxy.ts"
    click PrismaClient "https://github.com/tusharthakur04/luma/blob/main/lib/prisma.ts"
    click Postgres "https://github.com/tusharthakur04/luma/blob/main/prisma/schema.prisma"
    click Postgres "https://github.com/tusharthakur04/luma/tree/main/prisma/migrations/"
    click InngestFunctions "https://github.com/tusharthakur04/luma/blob/main/inngest/functions.ts"
    click InngestClient "https://github.com/tusharthakur04/luma/blob/main/inngest/client.ts"
    click Utils "https://github.com/tusharthakur04/luma/blob/main/lib/utils.ts"
    click Utils "https://github.com/tusharthakur04/luma/blob/main/utils/prompts.ts"
    click HOViews "https://github.com/tusharthakur04/luma/blob/main/hooks/use-mobile.ts"
    click HOViews "https://github.com/tusharthakur04/luma/blob/main/views/project_view.tsx"
    click HOViews "https://github.com/tusharthakur04/luma/blob/main/views/signedInHomePage.tsx"