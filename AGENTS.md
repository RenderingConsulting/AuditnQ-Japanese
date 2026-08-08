# AGENTS.md

## Purpose
Japanese product marketing site for **AuditnQ** (`q.auditnqa.com`), migrating from STUDIO to Hugo + Cloudflare Pages.

## Boundaries
- Deliver all site work in this repo.
- `auditnq-web` = English site. `corporate-site` = company site. `VMS` = product app (reference only).
- Keep Paperform / GA / GTM / HubSpot IDs in `hugo.toml` params.

## Stack
- Hugo extended **0.147.9**
- Content: `content/` + `data/site.yaml`
- Styles: `assets/css/main.css`
- Docs: `docs/phase0-inventory.md`, `docs/url-mapping.md`, `docs/design-tokens.md`

## Commands
```bash
hugo server -D
hugo --minify
```
