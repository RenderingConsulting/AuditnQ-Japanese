# Phase 0 — 現行サイト棚卸し

対象: https://q.auditnqa.com/（STUDIO / Nuxt クライアント描画）  
調査日: 2026-08-09

## 結論（移行理由の裏付け）

| 観点 | 現行 | 移行後の狙い |
|------|------|--------------|
| 初回 HTML | `#__nuxt` ほぼ空 + `__NUXT_DATA__` | 本文入りの静的 HTML |
| ホスト | Google Frontend（STUDIO） | Cloudflare Pages |
| キャッシュ | `s-maxage=3` | CDN 長期キャッシュ |
| メンテ | STUDIO GUI | Git + Markdown |
| AI / クローラ | JS 実行前提 | 静的テキストをそのまま読める |
| パフォーマンス | PSI Lab 中央値 Mobile Perf **35** / Desktop **58**（LCP 14.5 s / 2.5 s） | 静的配信 + CDN で Lab 改善を確認 |

パフォーマンス詳細（3 回中央値・レポート URL）: [`docs/baseline-performance.md`](./baseline-performance.md)

## ページ一覧

| URL | 種別 | robots | 備考 |
|-----|------|--------|------|
| `/` | 固定 LP | index | Hero / About / Features / Functions / News / FAQ / Download / Contact |
| `/service` | 固定 | index | Workflow / Functions 詳細 / FAQ / Blog 抜粋 |
| `/blog/all` | 一覧 | index | CMS blog |
| `/blog/:slug` | 記事×6 | index | 多くが公式 note への誘導 |
| `/blog/tag/:slug` | タグ | — | sitemap 空。移行初回は必須ではない |
| `/news/:slug` | お知らせ×2 | index | プレス/リリース系本文あり |
| `/announce/:slug` | CMS | — | sitemap 空 |
| `/webinar-thanks` | thanks | **noindex** | Paperform 完了後 |
| `/inquiry-thanks` | thanks | **noindex** | 同上 |
| `/dl-thanks` | thanks | **noindex** | 同上 |
| `/404` | 404 | noindex | |

詳細メタと CMS 投稿は `docs/_inventory/pages-meta.json` / `data/cms-posts.json`。

## ナビ・外部 CTA

| ラベル | 先 |
|--------|-----|
| できること | `/#features` |
| 機能一覧 | `/service#function` |
| お知らせ | `/#news` |
| よくある質問 | `/#faq` |
| Blog | `/blog/all` |
| 資料請求 | `https://auditnq-dl-lp-202503.paperform.co?...` |
| ウェビナー | `https://webinar-202410.paperform.co/...` |
| お問い合わせ | `https://auditnq-inquiry-lp-202503.paperform.co?...` |
| 運営会社 | `https://ren-con.jp/#company` |
| プライバシー | `https://ren-con.jp/privacy-policy-jp` |

フォーム本体はサイト内ではなく **Paperform**。移行後も当面は外部リンク維持でよい。

## 計測・埋め込み

| 種別 | ID / 内容 |
|------|-----------|
| Google Analytics | `G-2Q1QNWF0R0` |
| Google Tag Manager | `GTM-NPD8FMJS` |
| HubSpot chat | `//js-na2.hs-scripts.com/241956367.js` |

## デザイン（現行トークン）

| 用途 | 値 |
|------|-----|
| ブラック | `#000000` |
| ネイビー | `#262d4f` |
| ブルー | `#286ee6` |
| グレー字 | `#7b7b7b` |
| オレンジ CTA | `#ff4e13` |
| 背景 | `#fafbfc` |
| ボーダー | `#d2d5db` |
| 英字 | Red Hat Display |
| 日本語 | Noto Sans JP（一部 TypeSquare） |

詳細は `docs/design-tokens.md`。

## トップ構成（文言は現行踏襲）

1. Hero: 「委託先/再委託先を一元管理して可視化」「企業全体のサプライチェーンリスクを低減」+ CTA
2. About
3. Features（01–03）→ `/service`
4. Functions（1–9）アンカー
5. News（2件）
6. FAQ（4問）
7. Download / Webinar
8. Contact

## `/service` 構成

1. Intro
2. Workflow（1–4）
3. 資料 DL
4. Functions（10項目、第三者評価連携含む）
5. FAQ
6. Blog 抜粋
7. Download / Webinar / Contact

## アセット

- Favicon / OG: `static/images/` に取得済み
- ヘッダーロゴ SVG/透過 PNG: Phase 2 で再取得（STUDIO 埋め込み画像）
- CMS カバー画像: GCS URL（`data/cms-posts.json`）。必要に応じて `static/` へミラー

## スコープ外（このリポ）

- EN サイト → `auditnq-web`（getauditnq.com）
- 会社サイト → `corporate-site`（ren-con.jp）
- 製品アプリ / テナント開通 → VMS
