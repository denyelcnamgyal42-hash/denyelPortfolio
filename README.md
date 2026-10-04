# DENYEL — DIGITAL LAB

Phase 1 and Phase 2 of Denyel Chokey Namgyal’s portfolio: a procedural research facility in a stylized Himalayan landscape. The 3D environment provides atmosphere and spatial navigation; all identity, navigation and section content remains HTML.

## Run locally

Use Node.js 20.9+ (a current LTS release is recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To verify and run a production build:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real origin before deployment. The default is localhost; no deployment or contact destination is invented.

## Stack

Next.js 16 App Router, React, strict TypeScript, Tailwind CSS 4, Three.js, React Three Fiber, Drei, Framer Motion and Lucide. Prettier and ESLint handle source quality. Exact resolved dependency versions are in `package-lock.json`.

## Architecture

- `src/app`: page shell, global design tokens and responsive styles, metadata, generated OpenGraph image and icon.
- `src/components/layout`: persistent navigation and mobile menu.
- `src/components/ui`: HTML hero, first-frame loading screen and reusable section panel.
- `src/components/scene`: dynamically imported Canvas, error/WebGL fallback, lighting and dedicated camera controller.
- `src/components/scene/world`: faceted mountains, central platform, bridges and six architectural station placeholders.
- `src/components/scene/ai`: reusable neural core using buffered points, connections and orbital rings.
- `src/components/scene/effects`: deterministic atmospheric points.
- `src/lib/scene`: minimal React Context, quality presets and typed camera targets.
- `src/lib/constants/portfolio.ts`: supplied identity, focus areas and project records, independent of the scene.

Navigation is React Context rather than an extra state library. `entered` and the camera destination are derived from the current section. HOME and LAB are implemented; add named presets in `cameraTargets.ts` when future sections need their own destinations. All camera movement stays in `CameraController`.

## Scene and interaction

The boot overlay ends when the first scene frame runs, with no artificial timer. Visitors can immediately continue to HTML while loading. Enter Lab moves toward the platform and opens a concise introduction. Navigation and station buttons open honest previews; full project pages, a resume download, contact delivery and experience content are intentionally absent.

The core uses a Fibonacci sphere of neural points, short connections, three thin orbits and a central wireframe. Hover increases its light; click opens a small HTML explanation. Six stations use a shared architectural vocabulary with monitor, table and server variants. Mountains are deterministic triangular geometry, with distance fog and directional lighting. There are no external models, textures, sound or custom shaders.

## Performance

The Canvas is a client-only dynamic import with Suspense. DPR is capped at 1.6 / 1.25 / 1 for high / medium / low quality. Viewport width chooses the tier; resizing updates it. Lower tiers reduce particle and mountain counts, and mobile removes projected labels and antialiasing. Atmospheric and neural points each use a single point buffer. Geometry is memoized where constructed, and R3F owns scene resource disposal. No postprocessing is installed: emissive accents and local light achieve the restrained lighting without full-screen passes.

This is a viewport-based baseline, not GPU benchmarking or measured frame-rate adaptation. Real-device profiling is still required. Reduced motion stops orbit/particle loops, removes parallax and applies camera destinations immediately. A CSS mountain/core silhouette and HTML remain if WebGL fails or the context is lost.

## Accessibility

Semantic main/navigation/footer, HTML headings and buttons, visible focus rings, a skip link, mobile navigation state, focused panel headings and Escape-to-home navigation. Important content is not drawn in WebGL. Every station has an equivalent persistent navigation destination. The canvas does not capture keyboard focus. The mobile layout retains the core and mountain environment while keeping content readable.

## Validation and known limits

The local preview returns HTTP 200. Lint, TypeScript and production build commands are the primary automated checks; browser automation was unavailable in the implementation session, so visual composition, touch interaction, keyboard sequences and real GPU performance need manual review on desktop and mobile.

`npm audit --omit=dev` reports no production vulnerabilities. The full audit currently reports five high-severity findings through the development-only Next ESLint plugin → fast-glob → micromatch → braces chain. npm’s proposed forced fix downgrades the Next lint configuration to version 14, so it has not been applied. Recheck when upstream packages update.

## Phase 3 (not implemented)

Add accessible project case studies from the supplied project constants, real repository/demo links, confirmed experience and contact information, and an actual resume. Then extend camera destinations to accompany those HTML sections. Validate the current scene on real devices before adding visual complexity. No CMS, backend, authentication or contact API is included.
