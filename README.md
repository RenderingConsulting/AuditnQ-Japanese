# AuditnQ-Japanese

日本語製品サイト（https://q.auditnqa.com/）を STUDIO から **Hugo + Cloudflare Pages** へ移行するリポジトリです。

| 項目 | 内容 |
|------|------|
| SSG | Hugo extended `0.147.9` |
| Hosting | Cloudflare Pages |
| デザイン | 現行踏襲（ピクセル一致は不要、LP として美しく） |
| 参照 | `corporate-site`（運用型）、`auditnq-web`（EN 製品） |

製品アプリ・課金・テナント開通は VMS。EN マーケは `auditnq-web`。会社サイトは `corporate-site`。

## 進捗

| Phase | 内容 | 状態 |
|-------|------|------|
| 0 | コンテンツ棚卸し | ✅ |
| 1 | Hugo skeleton / CI | ✅ |
| 2 | `/`・`/service` 見た目踏襲 | ✅ |
| 3 | blog / news 移行・体裁 | ✅（体裁） / 内容は継続 |
| 4 | Paperform / GA / GTM | ✅（HubSpot は未使用のため未導入） |
| 5 | SEO・DNS カットオーバー | ✅（`q.auditnqa.com` → Pages） |

詳細: `docs/phase0-inventory.md` / `docs/baseline-performance.md` / `docs/url-mapping.md` / `docs/design-tokens.md`

## ローカル

```bash
hugo server -D
hugo --minify
```

出力: `public/`（Pages の Publish directory）

## Cloudflare Pages（予定）

| Setting | Value |
|---------|-------|
| Build command | `hugo --minify` |
| Output directory | `public` |
| Env | `HUGO_VERSION=0.147.9` |

## 境界

```text
AuditnQ-Japanese  →  JP 製品 LP（本リポ）
auditnq-web       →  EN self-serve
corporate-site    →  ren-con.jp
VMS               →  製品 / Stripe webhook / Auth0
Paperform         →  資料請求・問い合わせ・ウェビナー（当面外部）
```
