const router = require('express').Router();

const adminController = require('../controllers/admin');

// question routes
router.get('/test/:id?', adminController.getTest);

// router.post('/test', );

// router.patch('/test/:id', );

// router.delete('/test/:id', );

// // test routes
// router.get('/question/:id');

// router.post('/question/:testId');

// router.patch('/question/:id');

// router.delete('/question/:id');

module.exports = router;