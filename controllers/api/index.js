const router = require('express').Router();
const userRoutes = require('./userRouters');
const postRoutes = require('./postRoutes');
const commentRouters = require('./commentRouters');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRouters);

module.exports = router;