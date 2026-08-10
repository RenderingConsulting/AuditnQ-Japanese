# リポジトリセットアップ（一度だけ）

GitHub リポジトリ `RenderingConsulting/AuditnQ-Japanese` は作成済み想定。初回プッシュ後に Cloudflare Pages を接続する。

## Cloudflare Pages

1. Workers & Pages → Create → Connect to Git → `AuditnQ-Japanese`
2. Build settings:
   - Framework preset: Hugo
   - Build command: `hugo --minify`
   - Build output directory: `public`
   - Environment variable: `HUGO_VERSION=0.147.9`（**extended** が必要）
3. 本番ブランチ: `main` / Preview: PR
4. カスタムドメイン `q.auditnqa.com` は DNS カットオーバー時（Phase 5）に付与

## カットオーバー前チェック

- [ ] `/` `/service/` `/blog/` `/news/` 文言・CTA 確認
- [ ] Paperform / GTM 動作（GTM は初回操作または load 後約 12 秒で読み込み）
- [ ] `_redirects`（`/blog/all` → `/blog/`、`/index.html` → `/`）
- [ ] OGP / favicon / sitemap（thanks ページが sitemap に含まれないこと）
- [ ] `robots.txt`（thanks Disallow）と `_headers`（セキュリティヘッダ）
- [ ] 404 ページ表示
- [ ] キーボード操作（スキップリンク・ナビ・カルーセル・FAQ）
- [ ] STUDIO 側バックアップ・編集凍結
