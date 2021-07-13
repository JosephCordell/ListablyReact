const router = require('express').Router();
const mediaRoutes = require('./mediaRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/media', mediaRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
