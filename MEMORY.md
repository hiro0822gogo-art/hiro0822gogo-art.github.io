# MEMORY.md

## 2026-06-20

### ユーザーの操作メモ
- 「ホームページ出して」と言われたら https://casasora.jp をリンク（青いリンク）で表示する
- URLを伝える時は常にリンクとして貼る（「〇〇にアクセスしてください」の場合もリンクを貼る）

## 2026-06-19

### Google Search Console 所有権確認
- **決定**：DNS TXTレコード方式で確認
- **理由**：casasora.jpのドメインプロパティとして登録するため
- **却下**：HTMLファイル方式（ドメインプロパティには使えないため）
- **作業**：お名前.comでTXTレコード（google-site-verification=_PMnRIQ__sQtqBCOtB5y...）を追加し確認完了

### サイトマップ送信
- **決定**：https://casasora.jp/sitemap.xml を送信
- **結果**：正常に処理、9ページ検出

### _redirects 修正
- **決定**：ドメイン名を `casa-sora.jp`（誤）→ `casasora.jp`（正）に修正
- **理由**：ハイフンありのドメインが書かれており、リダイレクトが機能していなかった
- **追加**：www.casasora.jp → casasora.jp のリダイレクトも整備
