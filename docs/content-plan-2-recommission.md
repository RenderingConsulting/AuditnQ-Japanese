# 計画2: 再委託の note + 自社記事（新規ペア）

別スレで実装する。計画1（既存 note 受けの拡張）は [`content-plan-1-existing-note-pages.md`](content-plan-1-existing-note-pages.md)。

## 目的

既存 note に **再委託** がない。定義の本編を note に新設し、自社サイトには「Nth グラフで持つ」製品記事を置く。Lens RM が弱い語であり、AuditnQ の楔（再委託 / Nth）と一致する。VendorTrustLink が「再委託とは」でオーガニック1位。

## スコープ

**やる**

- 公式 note に再委託の本編を1本書く（このリポジトリ外。note.com）
- `content/blog/` に受けページを1本新設（要約 + 製品での解き方）
- 計画1のピラー（`/blog/0Rh0DlOw/`）および `/service/#nth-party` と相互リンク
- 自社ページは中身が入ってから index（空で出さない）

**やらない**

- 既存 6 本の拡張・noindex 外し（計画1）
- note 全文の自社への再掲
- note に画面マニュアルを置く
- 「脱 Excel」「Resilire より災害アラートが強い」
- リーガル見解・契約書の正式ひな形（一般論に留める）

## 前提

- 検索ベンチマークは Lens。カテゴリは「委託先管理とは」ピラー（計画1）。差別化がこの計画。
- 役割: note = 定義・禁止・承諾の正本。自社 = 案件グラフ・マスタ・集中への接続。
- 文字数に魔法の下限はない。note は解説として足りる量。自社は note なしでも「見えない再委託がどう困り、製品でどう持つか」が完結する量。
- URL は他ブログに合わせ当面 opaque スラッグ。可読スラッグにする場合は旧 URL の 301 が必須（`docs/url-mapping.md`）。

## 狙う語

| キーワード | 月間 Vol（JP・ Semrush） | 使い方 |
| --- | --- | --- |
| 再委託 / 再委託とは | 1,300 | note の主語。VTL が1位 |
| 再委託禁止 | 260 | note の契約実務 |
| 再々委託 / 再委託先 | 140〜170 | 自社の Nth に接続 |
| 再委託 契約 | 110 | 後続で可 |

## 出す順番

1. **note を先に公開**（本編の正本）
2. 自社ページを書いてから公開。最初から index してよい（空で出さない）
3. 計画1ピラーから「再委託はこちら」を張る。ピラー未完了なら `/service/#nth-party` のみでも可
4. note 起稿は計画1と並行してよい。自社の公開はピラーの H1・導線が決まってからがきれい

## note（本編）— リポジトリ外

**題名案:** 再委託とは？再委託先の禁止・承諾・再々委託まで、再委託先管理で見るべき点

含めること:

- 定義。委託元 / 委託先 / 再委託先
- 禁止条項、承諾書、契約上の注意（一般論。法律助言にしない）
- 実務の困り: 回答欄や別表に埋もれる、委託先一覧に出てこない
- 「システムで可視化する」は1節だけ。製品名は薄く

含めないこと:

- AuditnQ の画面手順・タブ名の詳細（自社ページ側）
- 星計算・格付け・リアルタイム災害警報

分量の目安: 4,000〜8,000 字。

下書き: [`note-draft-recommission.md`](note-draft-recommission.md)

公開後、URL を自社 front matter の `noteURL` に入れる。

## 自社ページ — `content/blog/` 新規

### front matter 方針

既存ブログに合わせる。

```yaml
title: "再委託先（Nth Party）を、案件のグラフで持つ"
description: "再委託が見えないと集中も災害も説明が切れる。回答や契約に埋もれた再委託先を、案件グラフからマスタと集中につなぐ。"
date: YYYY-MM-DD
category: "記事掲載"   # 既存に合わせる。必要なら後で変更
coverLocal: "/images/blog/{slug}.webp"  # 用意できなければ cover のみでも可
noteURL: "https://note.com/ren_con_com/n/n2f8268310ade"
# robots / sitemap.disable は付けない（中身完成後に公開）
```

受けページ: `content/blog/oUJK3GBZ.md`（`/blog/oUJK3GBZ/`）。`slug` は他記事と同様、opaque。

### 本文

- **H1:** 再委託先（Nth Party）を、案件のグラフで持つ
- **独自本文:** 3,000〜5,000 字（製品・運用が過半）
- 定義は 200〜400 字。禁止・承諾の詳細は note

見出し案:

1. 再委託が見えないと何が困るか（集中・災害・監査の説明が切れる）
2. 回答 Excel / 契約書だけにある状態
3. 案件タブの再委託グラフ（3rd → Nth）
4. マスタへの集約、業者集中との接続
5. 地理・災害は「委託先拠点の説明」まで（Resilire の警報とは分けて書く）
6. 定義・禁止・承諾の詳細は note
7. CTA + `/service/#nth-party`

製品コピーは `data/site.yaml` の `nth-party` `analyze` と `workflow.3` に合わせる。

内部リンク:

- `/service/#nth-party`
- `/service/#analyze`
- `/blog/0Rh0DlOw/`（計画1ピラー。未公開なら省略可）
- `noteURL`

### レイアウト

`layouts/_default/single.html` を流用。`noteURL` があれば「公式noteで読む」ボタンが出る。カバー画像は既存記事と同様 `coverLocal` または `cover`。

### 公開判定

- [x] note が先に公開され、`noteURL` が入っている
- [x] H1 が検索語＋製品の角度になっている
- [x] note なしでも「見えない → グラフで持つ → 集中につながる」が読める
- [x] コピペがない。リーガル断定がない
- [x] noindex を付けていない
- [x] ピラーまたは service からリンクがある
- [ ] Search Console で URL 検査

## 参照

- 機能: `data/site.yaml`（`nth-party` `analyze`）
- アンカー: `docs/url-mapping.md` の `#nth-party` `#analyze`
- 計画1: [`content-plan-1-existing-note-pages.md`](content-plan-1-existing-note-pages.md)
- 競合メモ（VMS 側・参考）: `~/dev/VMS-dependencies/doc/competitive-benchmark-map-jp.md` の Lens / 再委託 / 地理・災害
