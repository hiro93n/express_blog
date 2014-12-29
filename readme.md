* [express入門](http://dotinstall.com/lessons/basic_expressjs)がexpress3向けなのでいろいろ作り直さないと使えないのでざっと作りました
* express 4.9.0、node v0.10.33準拠です
* コマンドは下記の通り。dbは使ってません
```
git clone git@bitbucket.org:paeria/express_blog.git
cd express_blog
npm install -g nodemon // 編集後の再起動自動化する子
npm start
```
* npm startコマンドでnodemonが起動するようにしてます。package.json参照のこと。利用したくない場合はnodemon => npm に変更すればOK