var express = require('express');
var router = express.Router();

var posts = [
  {title:'title0', body:'body0'},
  {title:'title1', body:'body1'},
  {title:'title1', body:'body2'}
];

/* GET home page. */

// index
// 配列内の複数要素を渡すのでposts。送り方：送られるもの。後者はvarで定義したposts
router.get('/', function(req, res) {
  res.render('./post/index', { posts: posts });
});

// show（詳細を表示する）
// express3系だと関数を分けるが4系であれば最初の引数に「どこへのアクセス？」を指定すればOK
// 単体にpostする内容なのでpost
router.get('/posts/:id([0-9]+)', function(req, res) {
  res.render('./post/show', { post: posts[req.params.id] });
});

// new（新規作成ページを表示する）
// idに正規表現をつけないと、上から処理していくためidの前にこれを置くとエラーする
router.get('/posts/new', function(req, res) {
  res.render('./post/new');
});

// post（新規投稿）
router.post('/posts/create', function(req, res) {
  var post = {
  	title: req.body.title,
  	body: req.body.body
  };
  posts.push(post);
  res.redirect('/');
});

// edit（情報を引っ張った上でページを表示する）
router.get('/posts/:id/edit', function(req, res) {
  res.render('./post/edit', { post: posts[req.params.id], id: req.params.id });
});

//  update（更新処理）
router.put('/posts/:id([0-9]+)', function(req, res) {
  posts[req.body.id] = {
  	title: req.body.title,
  	body: req.body.body
  };
  res.redirect('/');
});

// delete
router.delete('/posts/:id([0-9]+)', function(req, res) {
  posts.splice(req.body.id, 1);
  res.redirect('/');
});


module.exports = router;