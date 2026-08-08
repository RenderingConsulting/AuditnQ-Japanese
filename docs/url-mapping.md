# URL 対応表（STUDIO → Hugo）

方針: **既存 URL をできるだけ維持**し、整理したいパスだけ 301 する。

| 現行 | Hugo（推奨） | リダイレクト |
|------|--------------|--------------|
| `/` | `/` | — |
| `/service` | `/service/` | `/service` → `/service/`（CF/Hugo 標準） |
| `/blog/all` | `/blog/` | `/blog/all` → `/blog/`（301） |
| `/blog/{opaque}` | `/blog/{opaque}/` | スラッグは当面そのまま（リンク切れ防止） |
| `/blog/tag/{tag}` | （初回スキップ可） | 必要なら後で |
| `/news/{opaque}` | `/news/{opaque}/` | 同上 |
| `/announce/...` | （コンテンツなし） | 404 のまま可 |
| `/webinar-thanks` | `/webinar-thanks/` | noindex |
| `/inquiry-thanks` | `/inquiry-thanks/` | noindex |
| `/dl-thanks` | `/dl-thanks/` | noindex |

## アンカー（ホーム / service）

現行アンカーを維持する。

| ページ | ID |
|--------|-----|
| `/` | `#features` `#news` `#faq` |
| `/service` | `#function` `#regular` `#individual` `#excel` `#share` `#answer` `#outbound-in` `#multicompany` `#nth-party` `#analyze` `#security` |

## Cloudflare `_redirects`（案）

```
/blog/all /blog/ 301
/blog/all/ /blog/ 301
```

ホスト切替（STUDIO → Pages）は DNS 側。`www` 有無はゾーン設定を確認してから揃える。

## 可読スラッグへの変更（任意・後続）

例: `/blog/y2rW70OF` → `/blog/isms-vendor-management-iso27001/`  
やる場合は旧 opaque URL を **永続 301** 必須。Phase 2–3 では opaque 維持を推奨。
