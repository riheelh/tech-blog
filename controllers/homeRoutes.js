const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({include: [{ model: User, attributes: ['name']}]});
        const posts = postData.map((item)=> item.get({plain: true}));
        // res.status(200).json(posts)
        res.render('homepage', {posts, logged_in: req.session.logged_in} )
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {include: [{ model: User, attributes: ['name']}, {model: Comment}]});
        const postItem = postData.get({ plain: true });
        // res.status(200).json(postItem)
        res.render('post', {postItem})
    } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {attributes: { exclude: ['password'] }, include: [{ model: Post}]});
        const userItem = userData.get({ plain: true });
        // res.status(200).json(userItem)
        res.render('dashboard', {userItem})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signin', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/signin');
      return;
    }
    res.render('signup');
});


module.exports = router;