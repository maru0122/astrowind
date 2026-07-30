---
title: "X（旧Twitter）のツイートを無料で全削除！AIに聞いたAPI不要の裏ワザ"
publishDate: 2026-07-30
author: "シン"
excerpt: "XのAPI有料化（完全従量課金制）の壁を突破！AIに教えてもらった、ブラウザコンソールを使った完全無料の全削除テクニックと、アカウント凍結リスクを回避する注意点を解説します。"
image: ~/assets/images/blog/20260730_x-tweet-delete-free.png
category: "chrome-extension"
tags:
  - "X"
  - "Twitter"
  - "JavaScript"
  - "自動化"
  - "AI活用"
metadata:
  canonical: "https://e-shikumi-labo.com/blog/"
---

こんにちは、e-Shikumi-Laboのシンです。 このブログでは、スプレッドシート＆GASやChrome拡張機能をはじめとする、自動化のTipsを紹介しています。

今回は、「過去のX（旧Twitter）の投稿を全削除したい」というテーマを取り上げます！

心機一転、アカウントをクリーンな状態にしたい時に「プログラムで全自動一括削除したい」と考える方は多いはず。しかし、いざGAS（Google Apps Script）などで作ろうとすると大きな壁にぶつかります。

そこで今回、**AIに「無料でXの過去ポストを一括削除する方法」を聞いてみたところ、APIを使わない現実的な裏ワザを教えてもらった**ので、その手順と注意点をシェアします！

### GAS（API）経由の無料削除は不可能に！現在のX API仕様

「GASでツイート一覧を取得して順番にDELETEリクエストを叩けばいいのでは？」と思いがちですが、現在のXの仕様ではこの手法を無料で行うことはできません。

かつて存在したAPIの「無料枠（Freeプラン）」はすでに廃止されており、現在は**「Pay-Per-Use（完全な従量課金制）」**へ移行しています。

つまり、「自分の過去ツイートをAPIで一覧取得して、APIで1件ずつ削除する」という処理を組もうとすると、**データの読み取り・書き込み（削除）のリクエストごとに費用が発生**してしまうのです。完全無料でAPIを叩き続ける手段は存在しません。

外部の有料サービスを使う手もありますが、「できればお金をかけずに無料で消したい…」というのが本音ですよね。

### AIが教えてくれた対策：ブラウザのコンソール（DevTools）で直接自動化する

公式APIを通した無料全自動化がダメならどうするか？ AIが提案してくれた答えは**「公式APIを通さず、自分のPCブラウザ上で、削除ボタンを押す操作をJavaScriptで自動化する」**という方法でした。

ChromeやEdgeなどのデベロッパーツール（コンソール）を使い、自分の画面上で削除処理を行わせます。これならXの有料APIを通さないため、**完全無料**で実行可能です。

#### ⚠️ 実行前の準備と注意点
- **データのバックアップ：** 削除したポストは元に戻せません。残したいデータがある場合は「設定」＞「データのアーカイブをダウンロード」を実行しておきましょう。
- **タブを開いたままにする：** ブラウザのタブを閉じると処理が停止します。

### 【コピペで動く】ブラウザ用自動削除スクリプト

手順は非常にシンプルです。

1. PCブラウザでXにログインし、自分のプロフィール画面（`https://x.com/ユーザー名`）を開く。
2. キーボードの `F12` キー（Macは `Cmd + Option + I`）を押してデベロッパーツールを開く。
3. **「Console（コンソール）」** タブをクリックする。
4. 以下のコードを貼り付けて `Enter` キーを押す。

```javascript
(async function deleteAllTweets() {
  // 1回の操作ごとの待機時間（ミリ秒）。1.5秒〜2秒推奨
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  let count = 0;

  console.log("🚀 ポスト削除処理を開始します...");

  while (true) {
    // 画面上の投稿メニュー（「…」ボタン）とリポスト解除ボタンを取得
    const carets = document.querySelectorAll('[data-testid="caret"]');
    const unretweets = document.querySelectorAll('[data-testid="unretweet"]');

    // 削除対象が画面内に見つからない場合、自動でスクロールする
    if (carets.length === 0 && unretweets.length === 0) {
      console.log("画面上に投稿が見つかりません。下へスクロール中...");
      window.scrollBy(0, 800);
      await sleep(2000);

      // スクロール後も投稿が見つからなければ終了判断
      if (document.querySelectorAll('[data-testid="caret"]').length === 0 && 
          document.querySelectorAll('[data-testid="unretweet"]').length === 0) {
        console.log("🎉 これ以上投稿が見つかりませんでした。完了です！");
        break;
      }
    }

    // 1. リポストの解除処理
    if (unretweets.length > 0) {
      try {
        unretweets[0].click();
        await sleep(500);
        const confirmUnretweet = document.querySelector('[data-testid="unretweetConfirm"]');
        if (confirmUnretweet) {
          confirmUnretweet.click();
          count++;
          console.log(`[${count}件目] リポストを解除しました`);
          await sleep(1500);
          continue;
        }
      } catch (e) {
        console.error("リポスト解除エラー:", e);
      }
    }

    // 2. 自分の投稿の削除処理
    if (carets.length > 0) {
      try {
        carets[0].click();
        await sleep(600);

        // ドロップダウンメニューから「削除」を選択
        const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
        const deleteBtn = menuItems.find(item => 
          item.textContent.includes('削除') || item.textContent.includes('Delete')
        );

        if (deleteBtn) {
          deleteBtn.click();
          await sleep(600);

          // ポップアップの確定「削除」ボタンをクリック
          const confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');
          if (confirmBtn) {
            confirmBtn.click();
            count++;
            console.log(`[${count}件目] ポストを削除しました`);
            await sleep(1500);
          }
        } else {
          document.body.click();
          await sleep(500);
        }
      } catch (e) {
        console.error("削除処理中にエラーが発生しました:", e);
      }
    }
  }
})();
```

#### 実際の動作イメージ
スクリプトを実行すると、以下のように画面上で自動的にメニューが開き、削除が繰り返されていきます。

![ブラウザコンソールによるXポスト自動削除の動作イメージ](~/assets/images/20260730_x-tweet-delete-free.gif)

### ⚠️ 大量削除時の注意点：アカウント凍結のリスク

上記スクリプトを使えば自動で次々と削除してくれますが、**やりすぎには十分な注意が必要**です。

短時間に大量の投稿を一気に削除しようとすると、XのシステムからスパムやBOT（機械的な異常操作）と判定され、アカウントが一時的に制限（レートリミット）されたり、最悪の場合は**アカウント凍結**のペナルティを受けるリスクがあります。

一度の実行で安全に消せる件数の上限は、状況によって変動しますが、**数百件〜2,000件程度**が一つの目安になることが多いようです。そのため、膨大なポストがある場合は、一度に全てを消そうとせず、**数日間に分けて少しずつスクリプトを実行する**など、安全第一で無理のないペースで進めるようにしてください。

### まとめ

X（旧Twitter）のAPI仕様変更（従量課金制への完全移行）により、GASを使った全自動の無料削除は不可能になりました。

しかし、今回AIから教わった「ブラウザコンソールによる自動化」を利用すれば、現在でも完全無料で一括削除を進めることが可能です。アカウント凍結などのリスクに気をつけつつ、過去の投稿をクリーンにしたい方は自己責任の上でぜひ試してみてください！
