# Agent Code Academy

An open, vendor-neutral catalog of technical learning paths for AI coding
agents.

[Live site](https://agent-code-academy.danielsan7.chatgpt.site) ·
[Report an issue](https://github.com/davila7/agent-code-academy/issues) ·
[Contribute](CONTRIBUTING.md)

## What it does

- Searches courses by title, agent, skill, level, tag, or learning path.
- Filters resources for Claude Code, Codex, Cursor, GitHub Copilot,
  Antigravity, and Pi.
- Keeps the catalog in a reviewable static JSON file.
- Requires no account, database, or external API.

## Tech stack

- React 19
- TypeScript
- Vinext and Vite
- Tailwind CSS
- Cloudflare Workers-compatible output

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
git clone https://github.com/davila7/agent-code-academy.git
cd agent-code-academy
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Catalog

Resources live in [`data/catalog.json`](data/catalog.json). Each course has a
stable ID, agent identifier, title, summary, level, learning path, tags, and
source URL.

When adding a resource:

1. Prefer an official or first-party technical source.
2. Verify that the URL resolves without authentication when possible.
3. Write a neutral summary; do not copy marketing text.
4. Use a stable, lowercase, hyphenated ID.
5. Run `npm run check` before opening a pull request.

## Project commands

| Command                | Purpose                            |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the local development server |
| `npm run lint`         | Run static analysis                |
| `npm run format:check` | Verify formatting                  |
| `npm run build`        | Create the production build        |
| `npm run check`        | Run all required project checks    |

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before
opening an issue or pull request. Security reports should follow
[SECURITY.md](SECURITY.md).

## License and trademarks

The application code is available under the [MIT License](LICENSE). Product
names and logos belong to their respective owners and are used only to identify
the tools represented in the catalog. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
