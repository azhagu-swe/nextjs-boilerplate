# **CodeMaster Tutorial App \- Frontend**

## **Description**

This is the frontend repository for the **CodeMaster** tutorial platform, designed to offer comprehensive video content focused on programming and AI (including courses, series, vlogs, standalone tutorials, etc.). Aimed at beginners and younger learners, it features an attractive, engaging interface with Role-Based Access Control (Admin, Instructor, Student) and a playful, developer-centric tone.

Free video content may be hosted on YouTube but is viewable within the application. This initial phase focuses on establishing a scalable architecture using mock data.

## **Tech Stack**

- **Framework:** [Next.js](https://nextjs.org/) (v14+ with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Material-UI (MUI)](https://mui.com/) v5+
- **Styling:** [Emotion](https://emotion.sh/) (via MUI), `sx` prop, `styled` components
- **Icons:**
  - [Lucide Icons](https://lucide.dev/) (Primary UI icons)
  - [@iconify/react](https://iconify.design/) (Footer social media icons)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) (Login/Signup pages)
- **Data Fetching (Planned):** [TanStack Query (React Query)](https://tanstack.com/query/latest) / [SWR](https://swr.vercel.app/)
- **State Management (Planned):** [Zustand](https://zustand-demo.pmnd.rs/) / [Jotai](https://jotai.org/) / [Redux Toolkit](https://redux-toolkit.js.org/) (as needed)
- **Linting/Formatting:** ESLint / Prettier

## **Features Implemented (Initial Setup)**

- **Core Layout:** Responsive layout (`MainLayout`) with a persistent, collapsible MUI `Drawer` (`SideDrawer`) and fixed `AppBar` (`TopAppBar`). Applied via Next.js Route Groups (`(app)`). Includes logo and bottom toggle button.
- **Theming:** Dynamic Light/Dark mode (`CustomThemeProvider`) with `localStorage` persistence.
  - Light: Muted Blue (`#5A92C9`) / Soft Orange (`#F7A440`).
  - Dark: Bright Teal (`#4FD1C5`) / Bright Pink (`#E75A7C`).
  - Custom Typography (`Inter`, `JetBrains Mono` for code), responsive font sizes, global code block styling.
- **Authentication Flow (Mock):** Login, Signup, Forgot Password, Reset Password pages with unique UI, themed dialog, and Framer Motion animations. Mock `AuthProvider` manages state.
- **RBAC Navigation:** Sidebar (`SideDrawer`) and AppBar (`TopAppBar`) elements conditionally render based on mock authentication status and user role, driven by a central navigation config.
- **Content Pages (Mock Data):** Home (Goal-Oriented layout), Browse (with filter placeholders), Course List/Detail, Series List/Detail.
- **Utility Pages:** Custom 404, Maintenance, Contact Us, Privacy Policy, Terms of Service, Subscription, Donation pages with themed dialog.
- **Shared Components:** `ComingSoon` placeholder, `Footer` (with Iconify icons).
- **MUI Best Practices:** Uses `slotProps` API, `suppressHydrationWarning` for specific inputs.

## **Project Structure**

```
src/
├── app/
│   ├── (app)/          # Routes using the MainLayout (Courses, Series, Profile, etc.)
│   │   ├── courses/
│   │   │   ├── [courseId]/page.tsx
│   │   │   └── page.tsx
│   │   ├── series/
│   │   │   ├── [seriesId]/page.tsx
│   │   │   └── page.tsx
│   │   ├── browse/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── subscription/page.tsx
│   │   ├── watch/[contentId]/page.tsx # Added Watch Page
│   │   ├── layout.tsx      # Applies MainLayout to this group
│   │   └── page.tsx        # Home Page
│   ├── (auth)/           # Routes outside MainLayout (Login, Signup, etc.)
│   │   ├── forgot-password/page.tsx
│   │   ├── login/page.tsx
│   │   ├── reset-password/[token]/page.tsx
│   │   └── signup/page.tsx
│   ├── api/              # Mock API Route Handlers (if used)
│   ├── maintenance/page.tsx # Standalone maintenance page
│   ├── layout.tsx        # Root Layout (html, body, providers)
│   └── not-found.tsx     # Custom 404 page
├── components/
│   ├── layout/           # MainLayout, TopAppBar, SideDrawer, Footer
│   ├── shared/           # Reusable components (ComingSoon, etc.)
│   ├── video/            # Video player components (VideoPlayerWrapper)
│   └── ui/               # Generic UI elements (if needed)
├── config/               # App configuration (navigation.ts, subscriptions.ts)
├── data/                 # Static dummy JSON data files
├── features/             # Feature-specific modules (To be populated)
├── hooks/                # Shared custom React hooks (if needed)
├── lib/                  # Shared utility functions, constants
├── providers/            # Context providers (CustomThemeProvider, AuthProvider, ThemeRegistry)
├── styles/               # Potentially global styles beyond globals.css
└── types/                # Shared TypeScript types (index.ts)
public/                   # Static assets (favicon.ico, images, videos)
middleware.ts             # Middleware for route protection (RBAC) - Simulated
```

## **Getting Started**

### **Prerequisites**

- Node.js (v18+ recommended)
- npm or yarn

### **Installation**

1. Clone the repository:  
   Bash

```
git clone <repository-url>
```

2. Navigate to the directory:  
   Bash

```
cd <repository-directory>
```

2. Install dependencies:  
   Bash

```
npm install
# or
yarn install
```

### **Running Locally**

1. Start the development server:  
   Bash

```
npm run dev
```

2.

3.  Open [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser.

## **Key Concepts & Architecture**

### **Layout Strategy**

A primary layout (`MainLayout`) featuring a collapsible MUI `Drawer` and `AppBar` is applied to most authenticated pages using a Next.js Route Group (`(app)`). Standalone pages like Login, Signup, Maintenance, and 404 exist outside this main layout structure.

### **Theming**

The application uses a `CustomThemeProvider` to manage dynamic light/dark modes (persisted via `localStorage`) based on the defined palettes (Light: Muted Blue/Orange, Dark: Teal/Pink). It leverages MUI's `createTheme`, incorporates custom typography (`Inter`, `JetBrains Mono`), handles responsive font sizes, and applies global styles for elements like code blocks via `CssBaseline` overrides.

### **Authentication & RBAC**

Currently utilizes a mock `AuthProvider` for demonstrating UI changes based on `isAuthenticated` and `user.role`. Navigation items and AppBar actions are conditionally rendered. RBAC filtering for navigation is defined declaratively in `src/config/navigation.tsx` and applied in `SideDrawer`. Route-level protection via Next.js Middleware (`middleware.ts`) is planned and simulated.

### **Data Handling**

Initial development uses static JSON mock data (`src/data/`). Some Server Components (like `HomePage`) load this via direct `import`. Other components might use mock API Route Handlers (`src/app/api`) for simulating client-side fetching patterns. The data model (`VideoContent`, `Episode`) needs fields like `videoSource` and `sourceId` to handle external video sources (e.g., YouTube). The plan is to migrate to a real backend API using TanStack Query (React Query) or SWR for data fetching and state management.

### **Component Patterns**

Utilizes MUI v5+ best practices, including the `slotProps` API for customizing component internals. Employs Next.js App Router patterns with Server and Client Components (`'use client'`). `suppressHydrationWarning` is used on specific inputs potentially affected by browser extensions.

## **Next Steps / Future Enhancements**

- **Implement Real Authentication:** Replace mock `AuthProvider` with a production solution (e.g., `next-auth`, JWT).
- **Implement Real RBAC Protection:** Activate and refine route protection using Next.js Middleware.
- **Backend Integration:** Replace all mock data sources and API routes with calls to the live backend API (Spring Boot).
- **Data Fetching Library:** Integrate TanStack Query (React Query) or SWR.
- **Implement Core Features:** Build out user progress tracking, search functionality, comment sections, etc.
- **Flesh out RBAC Views:** Create Instructor/Admin dashboards and content management UIs.
- **Testing:** Develop unit, integration, and E2E test suites.
- **Performance & Optimization:** Analyze bundle sizes, optimize images (`next/image`), review component rendering.
- **Accessibility:** Conduct thorough a11y reviews and testing.
