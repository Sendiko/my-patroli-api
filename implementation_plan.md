# Next.js Frontend Implementation Plan for Lost & Found Mobile Tracker

This plan outlines the steps to create a Next.js (App Router) project based on the Google Stitch "Lost & Found Mobile Tracker" design system, focusing on a strict mobile-first approach, client-side authentication, and specific API integrations.

## User Review Required

> [!IMPORTANT]
> **API Base URL Configuration**
> Since the frontend will interact with an external Express backend (as built in a previous task), I will use an environment variable `NEXT_PUBLIC_API_URL` to define the base URL for the backend. Please confirm if the backend is running on a specific port (e.g., `http://localhost:5000`) so I can configure it correctly in `.env.local` or Next.js rewrites.

> [!WARNING]
> **File Uploads**
> For the `/tambah` page, the design calls for a native file picker. If the backend `PATCH` or `POST` expects `multipart/form-data` for file uploads, I will format the `FormData` accordingly. Please confirm if the backend endpoint `POST /api/barang` expects a field named `image` or `file` for the Multer middleware.

## Open Questions

1. **API Port**: What is the default base URL for the backend API? (e.g., `http://localhost:5000/api`)
2. **Endpoints**: Are the endpoints strictly `/api/barang` and `/api/laboratorium` for fetching the list, or is there a specific prefix?
3. **JWT Storage**: You mentioned storing JWT in cookies or localStorage. Since Next.js Middleware runs on the Edge and cannot read `localStorage`, it is highly recommended to store the JWT in **cookies** to allow the middleware to read it and protect routes server-side. Is storing the token in cookies acceptable?

## Proposed Changes

### Setup & Foundation

#### [NEW] `npx create-next-app` initialization
- Initialize the Next.js app in the current directory using `npx -y create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes`.
- Clear the default `globals.css` and `page.tsx`.

#### [MODIFY] `src/app/globals.css`
- Apply the Stitch design system tokens:
  - Corporate Academic theme with deep blue primary (`#004080`) and active secondary (`#0056b3`).
  - Inter font family integration.
  - Soft border radius (`rounded-md` and `rounded-lg`) and Level 1 drop shadows for cards (`shadow-[0px_2px_8px_rgba(0,0,0,0.05)]`).
- Apply the `max-w-md mx-auto` constraints to the `body` or a global layout wrapper to enforce the mobile-first view on desktop.

### Authentication & Middleware

#### [NEW] `src/middleware.ts`
- Intercept requests to `/` and `/tambah`.
- Check for the presence of the `token` cookie.
- Redirect to `/login` if the cookie is missing.

#### [NEW] `src/lib/api.ts`
- Create an API utility to handle fetches, automatically attaching the JWT cookie to the `Authorization` header for protected endpoints, and handling loading/error states.

### Pages & Components

#### [NEW] `src/app/login/page.tsx`
- A login form requiring `email` and `password`.
- On successful authentication, save the token to cookies (e.g., using `js-cookie`) and redirect to `/`.
- Show friendly error messages on failure.

#### [NEW] `src/app/page.tsx` (Dashboard)
- Fetch data from `GET /api/barang`.
- Display items in a vertical Card list.
- Cards will have 2-column layouts for item details (image on left, details on right) based on Stitch guidelines.
- If an item status is `belum_diambil`, render a fast-action "Telah Diambil" button.
- Implement the `PATCH /api/barang/:id` request when the action button is clicked, and optimistically update the UI or refresh the list.

#### [NEW] `src/app/tambah/page.tsx` (Add Item Form)
- Dynamic form with fields: Name, Location Source, Description, and Image.
- **Location Source**: Radio or Select. If `Laboratorium`, fetch and display a dropdown of labs. If `Lainnya`, show a text input for manual description.
- **File Picker**: Use `<input type="file" accept="image/*" capture="environment" />` to trigger the native camera on mobile devices.
- Handle form submission with loading states and display success/error feedback.

## Verification Plan

### Automated Tests
- N/A for this phase, focusing on manual verification of UI and integration.

### Manual Verification
- Test routing: Unauthenticated access to `/` or `/tambah` should redirect to `/login`.
- Test login flow: Verify the token is set in cookies.
- Test dashboard: Ensure data is fetched and rendered correctly, and the PATCH action updates the status.
- Test add item: Verify dynamic form logic works (showing Lab dropdown vs text input) and camera file picker triggers properly.
