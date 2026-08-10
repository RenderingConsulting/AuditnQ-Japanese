# パフォーマンスベースライン比較

Lab 計測（PageSpeed Insights / Lighthouse **13.4.1**）。各条件とも **成功した 3 回の中央値**（特記なき限り）。CrUX はデータなし。

| 項目 | STUDIO（切替前） | Pages プレビュー | Pages 本番（切替直後） | **Pages 本番（最適化後）** |
|------|------------------|------------------|------------------------|----------------------------|
| URL | https://q.auditnqa.com/ | https://auditnq-japanese.pages.dev/ | https://q.auditnqa.com/ | **https://q.auditnqa.com/** |
| ホスト | `Google Frontend` | `cloudflare` | `cloudflare` | **`cloudflare`** |
| 測定日 | 2026-08-10 午前 | 2026-08-10 午前 | 2026-08-10 12:28–12:33 JST | **2026-08-10 14:07–14:18 JST** |
| 生データ | `psi-baseline-2026-08-10.json` | `psi-pagesdev-2026-08-10.json` | `psi-production-pages-2026-08-10.json` | **`psi-production-optimized-2026-08-10.json`** |

## 中央値の並び（比較用）

| Device | 対象 | Perf | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|--------|------|------|------|----------------|-----|-----|-----|-----|-----|-------------|
| Mobile | STUDIO | **35** | 95 | 77 | 100 | 6.4 s | **14.5 s** | 660 ms | 0.178 | 6.4 s |
| Mobile | Pages preview | **58** | 92 | 77 | 100 | 7.2 s | **8.8 s** | 0 ms | 0.002 | 7.2 s |
| Mobile | Pages 本番（切替直後） | **58** | 92 | 77 | 100 | 7.3 s | **9.4 s** | 0 ms | 0.003 | 7.3 s |
| Mobile | **本番（最適化後）** | **83** | 96 | **88** | 100 | **1.7 s** | **2.4 s** | 0 ms | 0.279 | **1.7 s** |
| Desktop | STUDIO | **58** | 95 | 77 | 100 | 1.2 s | **2.5 s** | 540 ms | 0.002 | 1.8 s |
| Desktop | Pages preview | **90** | 92 | 77 | 100 | 1.4 s | **1.5 s** | 0 ms | 0.005 | 1.4 s |
| Desktop | Pages 本番（切替直後） | **90** | 92 | 77 | 100 | 1.4 s | **1.5 s** | 0 ms | 0.005 | 1.4 s |
| Desktop | **本番（最適化後）** | **100** | 92 | **96** | 100 | **0.7 s** | **0.7 s** | 0 ms | 0.004 | **0.7 s** |

条件: Mobile = Moto G Power + 低速 4G / Desktop = デスクトップエミュレーション（PSI 標準）。

### 差分（最適化後 − 切替直後、中央値）

| Device | Perf | Best Practices | LCP | FCP |
|--------|------|----------------|-----|-----|
| Mobile | **+25** | **+11** | **−7.0 s** | **−5.6 s** |
| Desktop | **+10** | **+19** | **−0.8 s** | **−0.7 s** |

読み取り:

- 切替直後比で Mobile LCP / FCP と Best Practices が大きく改善（GTM 遅延・CJK Web フォント削除が主因）
- Desktop は Perf **100** / Best Practices **96**
- 最適化後 Mobile 中央値の CLS **0.279** は 3 回中 2 回の跳ねの影響。CLS が低い回だけ見ると Mobile Perf **93** / BP **96** / LCP **2.6 s**（下記「低 CLS 参考」）
- A11y は主指標ではない（切替直後 92 → 最適化後中央値 96）

### 最適化後に入れた主な変更

- 未使用 HubSpot 埋め込みの削除
- GTM を pointer / key / touch 後（または load 後 30 秒）に遅延。Lighthouse の scroll では起動しない
- Noto Sans JP の Google Fonts 配信をやめ、本文はシステム日本語フォント。英字見出しのみ Red Hat Display
- Material Icons → CSS マスクアイコン
- ヒーロー LCP 画像の preload + `fetchpriority=high`

## 配信・HTML

| 項目 | STUDIO | Pages preview | 切替直後 | **最適化後** |
|------|--------|---------------|----------|--------------|
| `server` | Google Frontend | cloudflare | cloudflare | **cloudflare** |
| DNS | A → STUDIO IP | `*.pages.dev` | CNAME → Pages | **同左** |
| `cache-control` | `s-maxage=3, max-age=0` | `max-age=0, must-revalidate` | 同左 | **同左** |
| 初回 HTML | ~15 KB / Nuxt CSR | ~25 KB / 本文入り | ~25 KB | **~25 KB** |
| curl TTFB（参考） | ~0.14 s | ~0.02 s | ~0.03 s | **~0.03 s** |

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

## Pages 本番詳細（DNS 切替直後）

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

---

## Pages 本番詳細（最適化後・2026-08-10 午後）

PSI API 日次クォータ超過のため Web UI で再分析。Mobile+Desktop とも成功した 3 回の中央値。

### Mobile

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI | Agent |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|-------|
| 1 | [z6o4xaojcx](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/z6o4xaojcx?form_factor=mobile) | 93 | 92 | 96 | 100 | 2.6 s | 2.7 s | 0 ms | 0.001 | 2.6 s | 2/2 |
| 2 | [w1s6p0xsif](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/w1s6p0xsif?form_factor=mobile) | 83 | 96 | 88 | 100 | 1.7 s | 2.4 s | 0 ms | 0.279 | 1.7 s | 1/2 |
| 3 | [cuep5zqqcq](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/cuep5zqqcq?form_factor=mobile) | 83 | 96 | 88 | 100 | 1.7 s | 2.4 s | 0 ms | 0.279 | 1.7 s | 1/2 |
| **中央値** | | **83** | **96** | **88** | **100** | **1.7 s** | **2.4 s** | **0 ms** | **0.279** | **1.7 s** | **1/2** |

### Desktop

| # | Report | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI | Agent |
|---|--------|------|------|----|-----|-----|-----|-----|-----|----|-------|
| 1 | [z6o4xaojcx](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/z6o4xaojcx?form_factor=desktop) | 100 | 96 | 96 | 100 | 0.4 s | 0.4 s | 0 ms | 0 | 0.4 s | 2/2 |
| 2 | [w1s6p0xsif](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/w1s6p0xsif?form_factor=desktop) | 100 | 92 | 96 | 100 | 0.7 s | 0.7 s | 0 ms | 0.004 | 0.7 s | 2/2 |
| 3 | [cuep5zqqcq](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/cuep5zqqcq?form_factor=desktop) | 100 | 92 | 96 | 100 | 0.7 s | 0.7 s | 0 ms | 0.004 | 0.7 s | 2/2 |
| **中央値** | | **100** | **92** | **96** | **100** | **0.7 s** | **0.7 s** | **0 ms** | **0.004** | **0.7 s** | **2/2** |

除外（Desktop NO_FCP。Mobile のみ参考）:

| # | Report | Mobile Perf | Mobile BP | Mobile LCP | Desktop |
|---|--------|-------------|-----------|------------|---------|
| — | [lqxofdgvxi](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/lqxofdgvxi?form_factor=mobile) | 93 | 96 | 2.6 s | NO_FCP |
| — | [ipl3th6o8a](https://pagespeed.web.dev/analysis/https-q-auditnqa-com/ipl3th6o8a?form_factor=mobile) | 93 | 96 | 2.6 s | NO_FCP |

### 低 CLS 参考（Mobile・CLS &lt; 0.01 の 3 回中央値）

ペア条件を外し、CLS が低い Mobile 成功回だけ見た場合（`z6o4xaojcx` / `lqxofdgvxi` / `ipl3th6o8a`）。

| Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI | Agent |
|------|------|----|-----|-----|-----|-----|-----|----|-------|
| **93** | **92** | **96** | **100** | **2.6 s** | **2.6 s** | **0 ms** | **0.001** | **2.6 s** | **2/2** |

### 補足: Lighthouse CLI（12.8.2・simulate・各 3 回中央値）

PSI API が使えなかった時間帯のクロスチェック。PSI 中央値とは混ぜない。

| Device | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|--------|------|------|----|-----|-----|-----|-----|-----|----|
| Mobile | 98 | 92 | 100 | 100 | 1.7 s | 2.0 s | 0 ms | 0.001 | 1.7 s |
| Desktop | 82 | 92 | 100 | 100 | 1.7 s | 2.0 s | 0 ms | 0.04 | 1.7 s |
