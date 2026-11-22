# 作業用の元データの控え（公開のページとは別）

このブランチは、アプリの元データ（2次の過去問・テキスト・ドリルの Python の元、検証の結果、1次の模擬試験の元、ビルドの道具）を1つの圧縮ファイルにまとめた控えです。公開のページ（main ブランチ）には影響しません。

- src_backup.tgz：`niji/`（2次の元・build.py・GUIDE.md・VERIFY.md・_status.md・verified.json）、`text/`（図の道具と元）、`review/niji/`（検証の結果）、`mock/`（1次の模擬試験の元）、作業フォルダ直下のビルドと試験の道具。
- 戻し方：作業フォルダで `tar xzf src_backup.tgz`。
