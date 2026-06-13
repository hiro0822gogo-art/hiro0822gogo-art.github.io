---
description: CASA SORA の新しい活動報告・ブログ記事ページ（HTML）を作成する。タイトル・カテゴリ・本文・画像ファイル名などを引数として受け取り、既存記事のデザインに合わせたHTMLを生成してリポジトリに追加し、index.html のブロググリッドにも新しいカードを追加する。
---

# new-post スキル

## 目的

CASA SORA ウェブサイト（GitHub Pages）に新しいブログ記事ページを追加する。

## 引数（ユーザーから受け取る情報）

| 項目 | 例 |
|---|---|
| ファイル名（スラッグ） | `koi-takebe.html` |
| ページタイトル | `建部大社へ散歩🎏 錦鯉に癒された一日` |
| カテゴリ | `お散歩レポート` / `活動報告` / `イベント報告` |
| カテゴリカラー | `#5aaa5a`（緑）/ `var(--sky-dark)`（青）/ `var(--accent)`（橙）/ `#8B0000`（赤）|
| ヒーロー背景グラデーション | `linear-gradient(160deg, #1a3a1a 0%, #2d4a2d 40%, #1a2a20 100%)` など |
| 見出し border-left カラー | `#5aaa5a` など |
| サマリーボックス背景 | `#f0f7f0` など |
| OGP 画像パス | `images/koi-takebe.jpg` |
| メタ description | 記事の説明文（〜120字） |
| 日付 | `2026年6月` |
| 本文（h2 見出し＋段落のセット） | 自由記述 |
| index.html カード用サムネ画像 | `images/koi-takebe.jpg` |
| index.html カードタイトル | ブロググリッドに表示するタイトル |

## 手順

1. **情報収集**：引数が不足している場合はユーザーに確認する。
2. **HTMLファイル生成**：下記テンプレートを使い、引数を埋め込んで `<slug>.html` を作成する。
3. **index.html 更新**：`#blog` セクションのブロググリッドの先頭に新しい `<a class="blog-card">` を追加する（カードは最大6件程度を目安に）。
4. **コミット＆プッシュ**：`main` ブランチにコミットしてプッシュする。

## HTMLテンプレート

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{タイトル}} | CASA SORA（カーサ・ソラ）</title>
  <meta name="description" content="{{description}}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://casasora.jp/{{slug}}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{{タイトル}} | CASA SORA" />
  <meta property="og:description" content="{{description}}" />
  <meta property="og:url" content="https://casasora.jp/{{slug}}" />
  <meta property="og:image" content="https://casasora.jp/{{OGP画像}}" />
  <meta property="og:site_name" content="CASA SORA" />
  <meta property="og:locale" content="ja_JP" />

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

    .article-hero { padding: 96px 2rem 0; background: {{ヒーローグラデーション}}; }
    .article-hero-inner { max-width: 800px; margin: 0 auto; padding: 3rem 0 2rem; }
    .breadcrumb { font-size: 0.82rem; color: rgba(255,255,255,0.5); margin-bottom: 1.2rem; }
    .breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
    .article-category { display: inline-block; background: {{カテゴリカラー}}; color: #fff; font-size: 0.78rem; padding: 0.3rem 1rem; border-radius: 2rem; margin-bottom: 1rem; letter-spacing: 0.08em; font-weight: 600; }
    .article-title { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; line-height: 1.4; margin-bottom: 1rem; color: #fff; }
    .article-meta { font-size: 0.85rem; color: rgba(255,255,255,0.6); display: flex; gap: 1.5rem; align-items: center; }

    .article-eyecatch { max-width: 800px; margin: 0 auto; }
    .article-eyecatch img { width: 100%; max-height: 480px; object-fit: cover; border-radius: 1.2rem 1.2rem 0 0; display: block; }

    .article-body { max-width: 800px; margin: 0 auto; padding: 3rem 2rem 5rem; }
    .article-body h2 { font-size: 1.4rem; font-weight: 700; color: {{見出しカラー}}; margin: 2.5rem 0 1rem; padding-left: 1rem; border-left: 4px solid {{見出しカラー}}; }
    .article-body p { margin-bottom: 1.2rem; font-size: 1rem; line-height: 1.9; color: var(--text); }
    .article-body strong { color: {{見出しカラー}}; font-weight: 700; }

    .summary-box { background: {{サマリーBG}}; border-radius: 1rem; padding: 1.8rem 2rem; margin: 2rem 0; border-left: 4px solid {{見出しカラー}}; }
    .summary-box h3 { font-size: 1rem; font-weight: 700; color: {{見出しカラー}}; margin-bottom: 0.8rem; }
    .summary-box ul { margin-left: 1.2rem; }
    .summary-box ul li { font-size: 0.95rem; margin-bottom: 0.4rem; }

    .back-link-wrap { text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; }
    .btn { display: inline-block; background: var(--sky-dark); color: #fff; padding: 0.9rem 2.2rem; border-radius: 3rem; text-decoration: none; font-weight: 600; font-size: 1rem; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(58,143,173,0.3); }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,143,173,0.4); }

    footer { background: #1a2a30; color: rgba(255,255,255,0.5); text-align: center; padding: 2rem; font-size: 0.85rem; }
    footer strong { color: rgba(255,255,255,0.8); }
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
    <div class="breadcrumb"><a href="index.html">ホーム</a> &gt; <a href="index.html#blog">活動報告</a> &gt; {{タイトル}}</div>
    <span class="article-category">{{カテゴリ}}</span>
    <h1 class="article-title">{{タイトル}}</h1>
    <div class="article-meta">
      <span>📅 {{日付}}</span>
      <span>CASA SORA スタッフ</span>
    </div>
  </div>
  <div class="article-eyecatch">
    <img src="{{OGP画像}}" alt="{{タイトル}}" />
  </div>
</div>

<div class="article-body">

  <!-- サマリーボックス -->
  <div class="summary-box">
    <h3>📋 この記事のポイント</h3>
    <ul>
      <li>{{ポイント1}}</li>
      <li>{{ポイント2}}</li>
      <li>{{ポイント3}}</li>
    </ul>
  </div>

  <!-- 本文 -->
  {{本文（h2＋p のセット）}}

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

## index.html ブログカード追記テンプレート

```html
<a href="{{slug}}" class="blog-card">
  <img src="{{サムネ画像}}" alt="{{alt}}" class="blog-card-img" />
  <div class="blog-card-body">
    <span class="blog-card-category" style="background: {{カテゴリカラー}};">{{カテゴリ}}</span>
    <div class="blog-card-title">{{カードタイトル}}</div>
    <div class="blog-card-date">📅 {{日付}}</div>
  </div>
</a>
```

## カテゴリとカラーの対応表

| カテゴリ | カラー | ヒーロー背景 | 見出しカラー |
|---|---|---|---|
| 活動報告 | `var(--sky-dark)` | `linear-gradient(160deg, #1a2a35 0%, #2d4055 40%, #1a2535 100%)` | `var(--sky-dark)` |
| イベント報告 | `var(--accent)` | `linear-gradient(160deg, #3a1a0a 0%, #5a3020 40%, #2a1a0a 100%)` | `#c06030` |
| お散歩レポート（緑） | `#5aaa5a` | `linear-gradient(160deg, #1a3a1a 0%, #2d4a2d 40%, #1a2a20 100%)` | `#3a7a3a` |
| お散歩レポート（茶） | `#7a5c20` | `linear-gradient(160deg, #2a1a08 0%, #4a3010 40%, #2a1808 100%)` | `#7a5c20` |
| 自立準備ホーム | `#8B0000` | `linear-gradient(160deg, #2a0808 0%, #4a1010 40%, #2a0a0a 100%)` | `#8B0000` |
