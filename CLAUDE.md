# CASA SORA プロジェクト

## サイト概要

**CASA SORA（カーサ・ソラ）** — 滋賀県大津市にある障害者グループホーム（共同生活援助）のウェブサイト。

- **住所**：〒520-2141 滋賀県大津市大江七丁目10-61
- **電話**：077-500-8269
- **ドメイン**：https://casasora.jp/
- **GitHub Pages** で公開中（静的HTML）

## ファイル構成

```
index.html                  # トップページ（About / 支援内容 / 活動報告 / お問い合わせ）
bcp-training-report.html    # 活動報告：BCP訓練レポート
shiga-lastfort-hanabi.html  # 活動報告：しがラストフォート花火大会
takebe-taisha-koi.html      # 活動報告：建部大社 鯉
ishiyamadera-walk.html      # 活動報告：石山寺散歩
otsukan-suiren.html         # 活動報告：琵琶湖大津館 睡蓮
images/                     # 画像ディレクトリ
robots.txt                  # クローラー制御（Sitemap: https://casasora.jp/sitemap.xml）
sitemap.xml                 # サイトマップ
```

## スキル一覧（.claude/skills/）

| スキル | 呼び出し方 | 用途 |
|--------|-----------|------|
| `Skill.md` | `/Skill` | 新しい活動報告ページ（HTML）を作成する |
| `daily-summary.md` | `/daily-summary` | 今日のセッションの作業をgit差分から日本語でまとめる |
| `real-estate-search.md` | `/real-estate-search` | 障害福祉サービス用不動産を大津市周辺で検索する |

## SEO 実装済み

- 全ページに `BlogPosting` + `BreadcrumbList` JSON-LD 構造化データ
- `index.html` に `FAQPage` + `LocalBusiness` JSON-LD
- `robots.txt` のサイトマップURL修正済み（casasora.jp）
- `sitemap.xml` の `<lastmod>` 更新済み

## 不動産検索条件（保存済み）

障害福祉サービス（グループホーム / 生活訓練 / 自立準備ホーム）向け

| 項目 | 条件 |
|------|------|
| エリア | 滋賀県大津市周辺 |
| 建物 | 新耐震基準（1981年6月以降） |
| 間取り | 5LDK以上 |
| 駐車場 | 2台以上 |
| 用途 | 店舗利用可 / 事務所利用可 / 法人歓迎 |

## 開発ブランチ

`claude/create-skill-md-91magw`

## 注意事項

- 画像は `images/` 以下に配置。ファイル名は各HTMLの `<img src>` と対応させること。
- 構造化データの `datePublished` / `dateModified` は必ず更新すること。
- `sitemap.xml` に新ページを追加する際は `<lastmod>` も更新すること。
- `canonical` URLは `https://casasora.jp/` ベースで統一。
