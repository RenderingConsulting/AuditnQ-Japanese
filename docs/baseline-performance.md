# 現行サイト パフォーマンスベースライン

移行前（STUDIO）の Lab 計測。Cloudflare Pages 切替後は同条件で再計測し、この中央値と比較する。

| 項目 | 値 |
|------|-----|
| 対象 URL | https://q.auditnqa.com/ |
| ホスト | STUDIO（`Google Frontend`） |
| 測定日 | 2026-08-10（JST） |
| ツール | [PageSpeed Insights](https://pagespeed.web.dev/)（Lighthouse **13.4.1**） |
| 回数 | 3（中央値を採用） |
| 実ユーザー（CrUX） | データなし（Lab のみで比較） |

生データ: `docs/_inventory/psi-baseline-2026-08-10.json`

## 中央値（比較用）

| Device | Perf | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|--------|------|------|----------------|-----|-----|-----|-----|-----|-------------|
| Mobile | **35** | 95 | 77 | 100 | 6.4 s | **14.5 s** | 660 ms | 0.178 | 6.4 s |
| Desktop | **58** | 95 | 77 | 100 | 1.2 s | **2.5 s** | 540 ms | 0.002 | 1.8 s |

条件: Mobile = Moto G Power + 低速 4G / Desktop = デスクトップエミュレーション（PSI 標準）。

## 配信・HTML（補助）

| 項目 | 値 |
|------|-----|
| `server` | Google Frontend |
| `cache-control` | `public, s-maxage=3, max-age=0` |
| 初回 HTML | 約 15 KB / `__NUXT_DATA__` あり / `#__nuxt` 本文ほぼ空（CSR） |
| curl TTFB（参考・単発） | 約 0.14 s（HTML シェルのみ。LCP とは別物） |

## 各回の結果

### Mobile

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|
| 1 | [itp3e0aojy](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/itp3e0aojy?form_factor=mobile) | 35 | 95 | 77 | 100 | 6.4 s | 14.5 s | 660 ms | 0.178 | 6.4 s |
| 2 | [d756eiak83](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/d756eiak83?form_factor=mobile) | 36 | 95 | 77 | 100 | 6.3 s | 14.6 s | 620 ms | 0.178 | 6.3 s |
| 3 | [wa6a9jo935](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/wa6a9jo935?form_factor=mobile) | 31 | 95 | 77 | 100 | 6.4 s | 13.3 s | 900 ms | 0.178 | 6.4 s |
| **中央値** | | **35** | **95** | **77** | **100** | **6.4 s** | **14.5 s** | **660 ms** | **0.178** | **6.4 s** |

### Desktop

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|
| 1 | [itp3e0aojy](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/itp3e0aojy?form_factor=desktop) | 52 | 95 | 77 | 100 | 1.2 s | 2.9 s | 640 ms | 0.002 | 2.1 s |
| 2 | [d756eiak83](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/d756eiak83?form_factor=desktop) | 58 | 95 | 77 | 100 | 1.2 s | 2.5 s | 540 ms | 0.002 | 1.8 s |
| 3 | [wa6a9jo935](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/wa6a9jo935?form_factor=desktop) | 66 | 95 | 77 | 100 | 1.2 s | 2.5 s | 370 ms | 0.002 | 1.6 s |
| **中央値** | | **58** | **95** | **77** | **100** | **1.2 s** | **2.5 s** | **540 ms** | **0.002** | **1.8 s** |

注:

- レポート作成時刻: #1 `10:54` / #2 `11:07` / #3 `11:09`（いずれも 2026-08-10 JST）
- #3 は連続取得時のキャッシュ疑いを避けるためクエリ付きで再分析したが、レポートパスは同一オリジン LP。内容差は実質なしとみなす
- `qp50impp91`（11:08）は #2 と数値が完全一致したため、独立試行として採用せず除外

## 主な Lab 指摘（#1 レポートより・傾向）

- 未使用 JavaScript（約 250 KiB 削減余地）
- キャッシュ期間が短い（`s-maxage=3` と整合）
- レンダリングブロック / メインスレッド長時間タスク
- 画像の width/height 未指定、未使用 CSS

## 切替後の再計測手順

1. 対象を同じ `https://q.auditnqa.com/` にする（プレビュー `*.pages.dev` は参考のみ）
2. PSI で Mobile / Desktop を **3 回**取り、中央値をこの表と同じ列で追記する
3. あわせて `server` / `cache-control` / 初回 HTML に本文があるかを記録する
