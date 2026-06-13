---
description: CASA SORA の「今日のまとめ」ブログ記事ページを作成する。その日の活動・外出・出来事などをユーザーから聞き出し、既存デザインに合わせた HTML を生成してリポジトリに追加し、index.html のブロググリッド先頭にカードを追記する。
---

# daily-summary スキル

## 目的

CASA SORA ウェブサイトに「今日のまとめ」記事ページ（HTML）を追加する。

## ヒアリング項目

以下の情報をユーザーに確認する（不明なものはスキップ可）：

| 項目 | 例 |
|---|---|
| 日付 | `2026年6月13日` |
| 今日の主な活動 | `石山寺へ散歩、夕食はカレー` |
| カテゴリ | `日常レポート` / `お散歩レポート` / `活動報告` |
| 写真ファイル名（images/フォルダ内） | `images/photo-0613.jpg` |
| 一言コメント（スタッフや入居者の声） | 任意 |

ヒアリング後、以下の情報を自動生成する：
- ファイル名：`daily-YYYYMMDD.html`（例：`daily-20260613.html`）
- ページタイトル：`今日のまとめ（YYYY年M月D日）`
- カードタイトル：`📝 今日のまとめ｜YYYY年M月D日`

## 手順

1. ユーザーに上記項目をヒアリングする。
2. HTMLファイルを生成する（下記テンプレート使用）。
3. `index.html` の `#blog` グリッド先頭にカードを追加する。
4. `sitemap.xml` に新しい URL エントリを追加する（`<lastmod>` は今日の日付）。
5. `main` ブランチへコミット・プッシュする。

## HTMLテンプレート

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>今日のまとめ（{{日付}}）| CASA SORA（カーサ・ソラ）</title>
  <meta name="description" content="{{日付}}のCASA SORAの一日まとめ。{{活動の一言要約}}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://casasora.jp/{{slug}}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="今日のまとめ（{{日付}}）| CASA SORA" />
  <meta property="og:description" content="{{活動の一言要約}}" />
  <meta property="og:url" content="https://casasora.jp/{{slug}}" />
  <meta property="og:image" content="https://casasora.jp/{{写真}}" />
  <meta property="og:site_name" content="CASA SORA" />
  <meta property="og:locale" content="ja_JP" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": "今日のまとめ（{{日付}}）",
        "description": "{{活動の一言要約}}",
        "image": "https://casasora.jp/{{写真}}",
        "url": "https://casasora.jp/{{slug}}",
        "datePublished": "{{YYYY-MM-DD}}",
        "dateModified": "{{YYYY-MM-DD}}",
        "author": {"@type": "Organization", "name": "CASA SORA", "url": "https://casasora.jp/"},
        "publisher": {
          "@type": "Organization",
          "name": "CASA SORA",
          "logo": {"@type": "ImageObject", "url": "https://casasora.jp/images/logo.png"}
        },
        "mainEntityOfPage": {"@type": "WebPage", "@id": "https://casasora.jp/{{slug}}"}
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://casasora.jp/"},
          {"@type": "ListItem", "position": 2, "name": "活動報告", "item": "https://casasora.jp/#blog"},
          {"@type": "ListItem", "position": 3, "name": "今日のまとめ（{{日付}}）", "item": "https://casasora.jp/{{slug}}"}
        ]
      }
    ]
  }
  </script>

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --sky: #5BAEC7; --sky-light: #EAF6FB; --sky-dark: #3A8FAD;
      --warm: #F7F3EE; --text: #2D2D2D; --text-light: #666; --accent: #E8874A;
    }
    body { font-family: 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif; color: var(--text); line-height: 1.8; background: #fff; }
    header { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); z-index: 100; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 64px; box-shadow: 0 1px 12px rgba(0,0,0,0.08); }
    .logo { display: flex; align-items: center; text-decoration: none; }
    .logo img { height: 48px; width: auto; display: block; }
    nav a { margin-left: 1.8rem; text-decoration: none; color: var(--text-light); font-size: 0.9rem; transition: color 0.2s; }
    nav a:hover { color: var(--sky-dark); }

    .article-hero { padding: 96px 2rem 0; background: linear-gradient(160deg, #1a2a35 0%, #2d4055 40%, #1a2535 100%); }
    .article-hero-inner { max-width: 800px; margin: 0 auto; padding: 3rem 0 2rem; }
    .breadcrumb { font-size: 0.82rem; color: rgba(255,255,255,0.5); margin-bottom: 1.2rem; }
    .breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
    .article-category { display: inline-block; background: var(--sky-dark); color: #fff; font-size: 0.78rem; padding: 0.3rem 1rem; border-radius: 2rem; margin-bottom: 1rem; letter-spacing: 0.08em; font-weight: 600; }
    .article-title { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; line-height: 1.4; margin-bottom: 1rem; color: #fff; }
    .article-meta { font-size: 0.85rem; color: rgba(255,255,255,0.6); display: flex; gap: 1.5rem; align-items: center; }

    .article-eyecatch { max-width: 800px; margin: 0 auto; }
    .article-eyecatch img { width: 100%; max-height: 480px; object-fit: cover; border-radius: 1.2rem 1.2rem 0 0; display: block; }

    .article-body { max-width: 800px; margin: 0 auto; padding: 3rem 2rem 5rem; }
    .article-body h2 { font-size: 1.4rem; font-weight: 700; color: var(--sky-dark); margin: 2.5rem 0 1rem; padding-left: 1rem; border-left: 4px solid var(--sky-dark); }
    .article-body p { margin-bottom: 1.2rem; font-size: 1rem; line-height: 1.9; color: var(--text); }
    .article-body strong { color: var(--sky-dark); font-weight: 700; }

    .summary-box { background: var(--sky-light); border-radius: 1rem; padding: 1.8rem 2rem; margin: 2rem 0; border-left: 4px solid var(--sky-dark); }
    .summary-box h3 { font-size: 1rem; font-weight: 700; color: var(--sky-dark); margin-bottom: 0.8rem; }
    .summary-box ul { margin-left: 1.2rem; }
    .summary-box ul li { font-size: 0.95rem; margin-bottom: 0.4rem; }

    .comment-box { background: var(--warm); border-radius: 1rem; padding: 1.5rem 2rem; margin: 2rem 0; border-left: 4px solid var(--accent); font-style: italic; color: var(--text-light); }

    .back-link-wrap { text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; }
    .btn { display: inline-block; background: var(--sky-dark); color: #fff; padding: 0.9rem 2.2rem; border-radius: 3rem; text-decoration: none; font-weight: 600; font-size: 1rem; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(58,143,173,0.3); }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,143,173,0.4); }

    footer { background: #1a2a30; color: rgba(255,255,255,0.5); text-align: center; padding: 2rem; font-size: 0.85rem; }
    footer strong { color: rgba(255,255,255,0.8); }
    @media (max-width: 768px) { nav { display: none; } .article-body { padding: 2rem 1.2rem 4rem; } }
  </style>
</head>
<body>

<header>
  <a href="index.html" class="logo"><img src="images/logo.png" alt="CASA SORA（カーサ・ソラ）" /></a>
  <nav>
    <a href="index.html#about">ホームについて</a>
    <a href="index.html#services">支援内容</a>
    <a href="index.html#blog">活動報告</a>
    <a href="index.html#contact">お問い合わせ</a>
  </nav>
</header>

<div class="article-hero">
  <div class="article-hero-inner">
    <div class="breadcrumb"><a href="index.html">ホーム</a> &gt; <a href="index.html#blog">活動報告</a> &gt; 今日のまとめ（{{日付}}）</div>
    <span class="article-category">{{カテゴリ}}</span>
    <h1 class="article-title">今日のまとめ（{{日付}}）</h1>
    <div class="article-meta">
      <span>📅 {{日付}}</span>
      <span>CASA SORA スタッフ</span>
    </div>
  </div>
  <div class="article-eyecatch">
    <img src="{{写真}}" alt="{{日付}}の様子" />
  </div>
</div>

<div class="article-body">

  <div class="summary-box">
    <h3>📋 今日のハイライト</h3>
    <ul>
      {{ハイライトリスト}}
    </ul>
  </div>

  {{本文（活動ごとにh2＋p）}}

  {{スタッフ・入居者コメントがあれば↓}}
  <div class="comment-box">
    「{{コメント本文}}」
  </div>

  <div class="back-link-wrap">
    <a href="index.html#blog" class="btn">← 活動報告一覧へ戻る</a>
  </div>
</div>

<footer>
  <strong>CASA SORA</strong>（カーサ・ソラ）<br>
  〒520-2141 滋賀県大津市大江七丁目10-61　TEL: 077-500-8269<br><br>
  © 2024 CASA SORA. All rights reserved.
</footer>

</body>
</html>
```

## sitemap.xml 追記テンプレート

```xml
  <url>
    <loc>https://casasora.jp/{{slug}}</loc>
    <lastmod>{{YYYY-MM-DD}}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
```

## index.html ブログカード追記テンプレート

```html
<a href="{{slug}}" class="blog-card">
  <img src="{{写真}}" alt="今日のまとめ {{日付}}" class="blog-card-img" />
  <div class="blog-card-body">
    <span class="blog-card-category">日常レポート</span>
    <div class="blog-card-title">📝 今日のまとめ｜{{日付}}</div>
    <div class="blog-card-date">📅 {{年月}}</div>
  </div>
</a>
```
