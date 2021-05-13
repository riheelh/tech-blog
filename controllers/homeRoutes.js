const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({include: [{ model: User, attributes: ['name']}]});
        const posts = postData.map((item)=> item.get({plain: true}));
        // res.status(200).json(posts)
        console.log(req.session.logged_in)
        res.render('homepage', {
            posts, 
            logged_in: req.session.logged_in} )
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

router.get('/dashboard', withAuth ,async (req, res) => {
    try {
        const userData = await User.findByPk( req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{ model: Post}],
        });
        const userItem = userData.get({ plain: true });
        console.log(userItem)
        res.render('dashboard', {
            ...userItem,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);     
    }
});

router.get('/dashboard/edit/:id', withAuth ,async (req, res) => {
    try {
        const postData = await Post.findOne({ where: {id: req.params.id},
            attributes: [
                'id', 
                'title',
                'content',
            ],
            include: [
            {
                model: User,
                attributes: ['name']
            }]
        }) 
        const postItem = postData.get({ plain: true});
        console.log(postItem)
        res.render('postEdit', {
            ...postItem,
            logged_in: true,
        });


    } catch (err) {
        res.status(500).json(err);     
    }
})



router.get('/signin', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});


module.exports = router;