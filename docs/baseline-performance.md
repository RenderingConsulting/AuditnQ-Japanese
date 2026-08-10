# パフォーマンスベースライン比較

Lab 計測（PageSpeed Insights / Lighthouse **13.4.1**）。各条件とも **成功した 3 回の中央値**。CrUX はデータなし。

| 項目 | STUDIO（切替前） | Pages プレビュー | **Pages 本番（切替後）** |
|------|------------------|------------------|--------------------------|
| URL | https://q.auditnqa.com/ | https://auditnq-japanese.pages.dev/ | https://q.auditnqa.com/ |
| ホスト | `Google Frontend` | `cloudflare` | **`cloudflare`** |
| 測定日 | 2026-08-10 午前 | 2026-08-10 午前 | **2026-08-10 12:28–12:33 JST** |
| 生データ | `psi-baseline-2026-08-10.json` | `psi-pagesdev-2026-08-10.json` | `psi-production-pages-2026-08-10.json` |

## 中央値の並び（比較用）

| Device | 対象 | Perf | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|--------|------|------|------|----------------|-----|-----|-----|-----|-----|-------------|
| Mobile | STUDIO | **35** | 95 | 77 | 100 | 6.4 s | **14.5 s** | 660 ms | 0.178 | 6.4 s |
| Mobile | Pages preview | **58** | 92 | 77 | 100 | 7.2 s | **8.8 s** | 0 ms | 0.002 | 7.2 s |
| Mobile | **Pages 本番** | **58** | 92 | 77 | 100 | 7.3 s | **9.4 s** | 0 ms | 0.003 | 7.3 s |
| Desktop | STUDIO | **58** | 95 | 77 | 100 | 1.2 s | **2.5 s** | 540 ms | 0.002 | 1.8 s |
| Desktop | Pages preview | **90** | 92 | 77 | 100 | 1.4 s | **1.5 s** | 0 ms | 0.005 | 1.4 s |
| Desktop | **Pages 本番** | **90** | 92 | 77 | 100 | 1.4 s | **1.5 s** | 0 ms | 0.005 | 1.4 s |

条件: Mobile = Moto G Power + 低速 4G / Desktop = デスクトップエミュレーション（PSI 標準）。

### 差分（Pages 本番 − STUDIO、中央値）

| Device | Perf | LCP | TBT | CLS |
|--------|------|-----|-----|-----|
| Mobile | **+23** | **−5.1 s** | **−660 ms** | −0.175 |
| Desktop | **+32** | **−1.0 s** | **−540 ms** | +0.003 |

読み取り:

- 本番もプレビューと同水準。切替は性能面でも問題なし
- Perf / LCP / TBT は STUDIO 比で大きく改善（静的 HTML + Cloudflare）
- Mobile FCP は STUDIO よりやや遅い（フォント・画像・GTM 要確認）
- A11y は 95 → 92（移行効果の主指標ではない）

## 配信・HTML

| 項目 | STUDIO | Pages preview | Pages 本番 |
|------|--------|---------------|------------|
| `server` | Google Frontend | cloudflare | **cloudflare** |
| DNS | A → STUDIO IP | `*.pages.dev` | **CNAME → `auditnq-japanese.pages.dev`** |
| `cache-control` | `s-maxage=3, max-age=0` | `max-age=0, must-revalidate` | **同左** |
| 初回 HTML | ~15 KB / Nuxt CSR | ~25 KB / 本文入り | **~25 KB / 本文入り** |
| curl TTFB（参考） | ~0.14 s | ~0.02 s | **~0.03 s** |

---

## STUDIO 詳細（切替前）

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

注: `qp50impp91` は #2 と完全一致のため除外。

---

## Pages プレビュー詳細

### Mobile

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|
| 1 | [jhe7o7louz](https://pagespeed.web.dev/analysis/https-auditnq-japanese-pages-dev/jhe7o7louz?form_factor=mobile) | 58 | 92 | 77 | 100 | 7.2 s | 10.1 s | 0 ms | 0.002 | 7.2 s |
| 2 | [b0lewxn2tj](https://pagespeed.web.dev/analysis/https-auditnq-japanese-pages-dev/b0lewxn2tj?form_factor=mobile) | 58 | 92 | 77 | 100 | 7.2 s | 8.8 s | 0 ms | 0.002 | 7.2 s |
| 3 | [tp07yx3kku](https://pagespeed.web.dev/analysis/https-auditnq-japanese-pages-dev/tp07yx3kku?form_factor=mobile) | 59 | 92 | 77 | 100 | 7.2 s | 7.7 s | 0 ms | 0.002 | 7.2 s |
| **中央値** | | **58** | **92** | **77** | **100** | **7.2 s** | **8.8 s** | **0 ms** | **0.002** | **7.2 s** |

### Desktop

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|
| 1 | [jhe7o7louz](https://pagespeed.web.dev/analysis/https-auditnq-japanese-pages-dev/jhe7o7louz?form_factor=desktop) | 89 | 92 | 77 | 100 | 1.4 s | 1.5 s | 0 ms | 0.005 | 1.4 s |
| 2 | [b0lewxn2tj](https://pagespeed.web.dev/analysis/https-auditnq-japanese-pages-dev/b0lewxn2tj?form_factor=desktop) | 90 | 92 | 77 | 100 | 1.5 s | 1.5 s | 0 ms | 0.005 | 1.5 s |
| 3 | [tp07yx3kku](https://pagespeed.web.dev/analysis/https-auditnq-japanese-pages-dev/tp07yx3kku?form_factor=desktop) | 90 | 92 | 77 | 100 | 1.4 s | 1.5 s | 0 ms | 0.005 | 1.4 s |
| **中央値** | | **90** | **92** | **77** | **100** | **1.4 s** | **1.5 s** | **0 ms** | **0.005** | **1.4 s** |

---

## Pages 本番詳細（DNS 切替後）

### Mobile

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|
| 1 | [j43ttu8p1n](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/j43ttu8p1n?form_factor=mobile) | 58 | 92 | 77 | 100 | 7.2 s | 9.4 s | 0 ms | 0.033 | 7.2 s |
| 2 | [hkh478182r](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/hkh478182r?form_factor=mobile) | 59 | 92 | 77 | 100 | 7.3 s | 7.4 s | 0 ms | 0.003 | 7.3 s |
| 3 | [7c75uq3kgy](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/7c75uq3kgy?form_factor=mobile) | 58 | 92 | 77 | 100 | 7.3 s | 10.0 s | 0 ms | 0.002 | 7.3 s |
| **中央値** | | **58** | **92** | **77** | **100** | **7.3 s** | **9.4 s** | **0 ms** | **0.003** | **7.3 s** |

### Desktop

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|
| 1 | [j43ttu8p1n](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/j43ttu8p1n?form_factor=desktop) | 90 | 92 | 77 | 100 | 1.4 s | 1.5 s | 0 ms | 0.005 | 1.4 s |
| 2 | [hkh478182r](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/hkh478182r?form_factor=desktop) | 96 | 92 | 77 | 100 | 0.9 s | 1.1 s | 0 ms | 0.077 | 0.9 s |
| 3 | [7c75uq3kgy](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/7c75uq3kgy?form_factor=desktop) | 81 | 92 | 77 | 100 | 1.5 s | 2.5 s | 0 ms | 0.005 | 1.5 s |
| **中央値** | | **90** | **92** | **77** | **100** | **1.4 s** | **1.5 s** | **0 ms** | **0.005** | **1.4 s** |

注: `99ew8mil1o`（12:29）は Mobile が NO_FCP エラーのため中央値から除外。
