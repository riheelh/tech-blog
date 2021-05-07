const router = require('express').Router();
const { Post, User} = require('../models');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({include: [{ model: User, attributes: ['name']}]});
        const posts = postData.map((item)=> item.get({plain: true}));
        // res.status(200).json(posts)
        res.render('homepage', {posts} )
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {include: [{ model: User, attributes: ['name']}]});
        const postItem = postData.get({ plain: true });
        // res.status(200).json(posts)
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


module.exports = router;