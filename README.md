# 作業用の元データの控え（公開のページとは別）

このブランチは、アプリの元データ（2次の過去問・テキスト・ドリルの Python の元、検証の結果、1次の模擬試験の元、ビルドの道具）を1つの圧縮ファイルにまとめた控えです。公開のページ（main ブランチ）には影響しません。

- src_backup.tgz：`niji/`（2次の元・build.py・GUIDE.md・VERIFY.md・_status.md・verified.json）、`text/`（図の道具と元）、`review/niji/`（検証の結果）、`mock/`（1次の模擬試験の元・sx.json・verified.json）、`qbank/`・`seed/`・`keys/`（演習の元と過去問の正解・配点）、`qc/*.py`（点検の道具。本試験の PDF とテキスト qc/real は入れない）、`review/` の模擬試験と演習の直し（mk2・mk3・qb_abs など）、`wip/mk2/`（作業の決まりと検証の結果）、作業フォルダ直下のビルドと試験の道具。2026-11-24（v75 の時点）
- 戻し方：作業フォルダで `tar xzf src_backup.tgz`。
