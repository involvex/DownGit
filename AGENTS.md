# AGENTS.md

Instructions for AI agents and contributors working on the DownGit repository.

## Project Overview

DownGit is a lightweight, client-side web application that generates direct download links for GitHub public files and directories. It is a static site hosted on GitHub Pages and built with AngularJS 1.x.

Key characteristics:
- No build step or bundler; assets are served directly.
- No `package.json` or Node.js tooling in the repository.
- Primary goal is to remain simple and dependency-light.

## Useful Commands

Since this is a static site without a build pipeline, development is typically done by editing files and previewing locally.

- Serve locally with any static file server. Examples:
  - Python: `python -m http.server 8080`
  - Node.js: `npx http-server . -p 8080`
  - Go: `go run github.com/google/http2curl/v2/cmd/http-server@latest .`
- Git workflow:
  - `git status`
  - `git diff`
  - `git add <file>`
  - `git commit -m "message"`
  - `git push`

## Technologies

- **HTML5 / CSS3 / JavaScript (ES5)**
- **AngularJS 1.5.6** (legacy; keep code compatible with this version)
- **Bootstrap 3.3.6**
- **angular-toastr 2.0.0** (notifications)
- **JSZip 3.0.0** (client-side zip creation)
- **FileSaver.js** (client-side file saving)

## Repository Structure

```
.
├── index.html           # Main entry point; loads dependencies and bootstraps AngularJS
├── app/
│   ├── app.js           # Root AngularJS module and route configuration
│   ├── site.css         # Global styles
│   └── home/
│       ├── home.html    # Main view template
│       ├── home.js      # Route controller and view logic
│       └── down-git.js  # Service: URL parsing, GitHub API interaction, zip generation
├── lib/
│   ├── angular-toastr(2.0.0).min.css
│   ├── angular-toastr(2.0.0).tpls.min.js
│   └── filesaver.min.js
└── res/
    └── images/          # Images and icons
```

## Coding Conventions

- Maintain ES5-style JavaScript (no modern ES6+ syntax in `app/`).
- Follow the existing two-space indentation in JS/CSS.
- Keep changes minimal and aligned with the legacy AngularJS patterns already in use.
- Do not introduce new dependencies without discussion.
- Preserve existing comment headers at the top of JS files.

## Best Practices and Guidelines

- **Stay static**: Do not introduce a build system, bundler, or transpilation step unless explicitly requested.
- **AngularJS patterns**: Use existing module/controller/factory patterns (`angular.module`, `$scope`, `$http`, `$q`).
- **Client-side only**: All logic runs in the browser. Avoid server-side assumptions.
- **GitHub API usage**: Be mindful of unauthenticated rate limits when referencing GitHub API behavior.
- **Accessibility and usability**: Ensure inputs have labels/placeholders and error feedback is user-friendly via toastr.
- **Commit messages**: Keep them concise and descriptive; reference issue numbers if applicable.
- **License**: MIT. Preserve existing license headers in source files.

## Testing

- Manual browser testing is the primary validation method.
- Verify the following flows after changes:
  - Valid GitHub file URL downloads correctly.
  - Valid GitHub directory URL creates a zip with correct structure.
  - Invalid URLs show the expected warning toast.
  - Routing via query parameters (`?url=...`) works.

## Security

- All GitHub API calls are made from the client; do not proxy secrets through this site.
- Inputs are user-provided URLs; avoid introducing innerHTML or script injection paths.
- CDN dependencies are loaded over HTTPS; prefer keeping existing CDN sources unless updating is necessary.
