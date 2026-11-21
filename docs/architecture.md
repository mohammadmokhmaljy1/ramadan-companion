# Project Architecture Guide

## Project Structure

### `src/app/`

Contains the application entry point and app-level setup, such as the main App component and global application configuration.

### `src/features/`

Contains feature-specific modules. Each feature keeps its own components, hooks, API logic, types, and related files together.

### `src/shared/`

Contains reusable code shared across the application, such as UI components, utilities, and shared hooks.

### `src/mocks/`

Contains mock data and mock implementations used during development and testing.

### `docs/`

Contains project documentation and development guides.

---

## Import Rules

- The dependency direction is `shared → features → app`.
- `shared` must not import from `features` or `app`.
- `features` can import from `shared`, but must not import from another feature.
- `app` can import from `features` and `shared`.
- A feature must never import another feature directly.
- Do not use barrel files such as `index.ts` to re-export modules.
- Always use the `@/` alias for imports from `src`.
- Avoid relative imports when importing from other folders.

### Dependency Direction

`shared → features → app`

Dependencies should flow in one direction only. Lower-level shared modules must not depend on application-level or feature-level code.

---

## Data Flow

The data flow for API requests follows this sequence:

**Component → Hook (TanStack Query) → api.ts → Axios Client → API**

1. The component calls a custom hook.
2. The hook uses TanStack Query to manage the request and its state.
3. The hook calls the feature's `api.ts`.
4. `api.ts` uses the shared Axios client.
5. The Axios client sends the request to the API.

This keeps API communication separated from UI components.

---

## Naming Conventions

- Components: `PascalCase.tsx` — for example, `RamadanCard.tsx`.
- Hooks: `useSomething.ts` — for example, `usePrayerTimes.ts`.
- One component per file.
- Folder names: `kebab-case` — for example, `prayer-times`.
- Use the `@/` alias for imports from the `src` directory.

---

## Feature Organization

Each feature should contain only files related to that feature.

Keep related components, hooks, API logic, types, and other feature-specific files together, rather than placing all components or hooks into global folders.

Features must remain independent of one another. Shared functionality belongs in `shared`.

---

## General Rules

- Keep files in the folder that matches their responsibility.
- Avoid unnecessary duplication.
- Do not create barrel files.
- Keep imports consistent using `@/`.
- Follow the defined dependency direction.
- Keep components focused and maintainable.
