# skyway-react-sample

WebRTC のクラウドサービス [SkyWay](https://webrtc.ecl.ntt.com) をReactで使ったサンプルアプリ。

Netlify で公開。 https://skyway-react-sample.netlify.com

https://github.com/skyway/skyway-js-skeleton を参考に作った。

簡単便利にビデオ通話がWebで実装できる時代なんだなと、しみじみ思うことができます。

コミュニティエディションなので万が一使われまくってもサービス止まるだけで1円もかからないので大丈夫。
(そもそもSFU使っていないのでシグナリング回数だけじゃ相当な数のユーザに使われないと制限いかない)

# 使い方
- ページにアクセス
- 自分のidをコピーして相手に教える
- 相手が自分のid を入力して Call
- ビデオ通話開始
1人で別タブでやって一人二役でもできる

LINEやってないおっさんとビデオ通話したいときに気軽に使えます

# 使っている技術
TypeScript, React, React Hooks, styled-components
ビルドツール周りは Webpack4, Babel7, typescript-eslint あたり。 

ナウさを追求した構成にしたつもり。
