# Adobe AEM Universal Editor Remote App

This Angular application acts as a remote front-end for Adobe Experience Manager (AEM) Universal Editor projects. It provides a scaffold for rapidly bootstrapping new projects against the same baseline and enables project-specific branding through a dedicated theme stylesheet.

## Table of Contents

- **Prerequisites**
- **Environment Configuration**
- **Running Locally**
- **Building for Production**
- **Using the GitHub Template Workflow**
- **Project-Theming via `main-style.css`**
- **Environment Variables Reference**
- **Troubleshooting**

---

## Prerequisites

- Node.js 18+
- npm 10+
- An AEM instance with Universal Editor enabled
- Optionally: GitHub access to clone from the project template repository

Install dependencies with:

```bash
npm install
```

---

## Environment Configuration

All runtime credentials and host-specific settings are provided via `.env` files located at the project root. A build-time script reads these values and generates the Angular environment configuration.

1. Copy `.env.example` to `.env` (create `.env.example` if you need a baseline)
2. Override sensitive or machine-specific values in `.env.local`
3. Run `npm run prebuild` or `npm run build` to regenerate `src/environments/environment.generated.ts`

> **Important:** `.env` and `.env.local` are ignored by Git. Do not commit credentials.

### Key Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `AEM_HOST_URI` | Base URL to the author/publish instance | `https://author.myco.com` |
| `GRAPHQL_ENDPOINT` | GraphQL execute endpoint path | `/graphql/execute.json` |
| `GRAPHQL_PROJECT` | Default GraphQL project name | `securbank` |
| `SITE_NAME` | Site identifier (used by services) | `securbank` |
| `UNIVERSAL_EDITOR_SERVICE_URL` | Universal Editor service URL | `https://localhost:8000` |
| `CORS_ORIGIN` | Allowed origin for Universal Editor | `https://experience.adobe.com` |
| `LOCAL_DEV_URL` | URL exposed to UE (dev) | `https://localhost:3000` |
| `USE_PROXY` | Whether to use the Angular dev proxy | `true` |
| `AUTH_METHOD` | `basic` or `none` | `basic` |
| `BASIC_AUTH_USER` | Username for basic auth | `admin` |
| `BASIC_AUTH_PASS` | Password for basic auth | `admin` |
| `REPO_TEMPLATE_URL` | GitHub template repository URL | `https://github.com/<org>/<template>` |

See [`scripts/generate-env.js`](scripts/generate-env.js) for defaults and parsing rules.

---

## Running Locally

1. Generate environment files (if not already)

   ```bash
   npm run prebuild
   ```

2. Start the HTTPS dev server with proxy support (recommended)

   ```bash
   npm run start:https
   ```

   This reads `ssl/cert.pem` and `ssl/key.pem`, proxies AEM calls via `proxy.conf.json`, and injects credentials.

3. Navigate to `https://localhost:3000` and verify content loads from AEM.

---

## Building for Production

```bash
npm run build
```

Build artifacts live in `dist/ue-remote-app`. The build pipeline runs `generate-env.js` to stamp environment values prior to compilation.

---

## Using the GitHub Template Workflow

This repository is designed to be published as a **GitHub template** so teams can spawn new project repos (e.g., `project-1`, `project-2`) with consistent tooling.

1. Publish the repository as a template in GitHub.
2. In each new project repository:
   - Clone the template repo
   - Update `.env` / `.env.local` with project-specific AEM targets
   - Adjust `package.json` metadata as needed
   - Customize `src/theme/main-style.css` (see below)
3. Configure your CI/CD pipeline to run `npm run build` and deploy the `dist` output.

The `REPO_TEMPLATE_URL` environment variable is available for runtime features that may need to surface template metadata (e.g., diagnostics or docs).

---

## Project-Theming via `main-style.css`

Each generated project ships with `src/theme/main-style.css` for brand theming. This stylesheet is included automatically by Angular (`angular.json` references it) so overrides apply globally.

- Adjust CSS variables or class selectors to theme headers, buttons, backgrounds, etc.
- Example snippet:

```css
:root {
  --brand-primary: #0045e5;
  --brand-secondary: #0c1f3f;
}

.app-hero {
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
}
```

Commit project-specific theme changes to keep variants isolated.

---

## Environment Variables Reference

Generated environment files (`environment.ts` / `environment.prod.ts`) now derive from `environment.generated.ts`. This ensures local overrides are captured during build.

- `environment.model.ts` defines the strong types and defaults
- `generate-env.js` populates the runtime data
- `ENVIRONMENT_TOKEN` is injectable for services needing configuration

See `AemHeadlessService` and `UniversalEditorService` for usage examples.

---

## Troubleshooting

- **CORS or auth errors:** confirm proxy config, credentials, and ensure `.env` values match your AEM instance.
- **Universal Editor connection issues:** verify meta tags update by checking browser dev tools for `urn:adobe:aue:*` tags.
- **Theming not applied:** ensure `src/theme/main-style.css` exists and rebuild the project.
- **New projects missing defaults:** run `npm run prebuild` to regenerate `environment.generated.ts` before serving/building.

Need more help? Consult the supplementary docs:

- [`UNIVERSAL_EDITOR_SETUP.md`](UNIVERSAL_EDITOR_SETUP.md)
- [`HERO_COMPONENT_README.md`](HERO_COMPONENT_README.md)

---

Happy authoring!
