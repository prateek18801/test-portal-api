const router = require('express').Router();

const adminController = require('../controllers/admin');

// question routes
router.get('/test/:id?', adminController.getTest);

router.post('/test/:id?', adminController.postTest);

router.delete('/test/:id', adminController.deleteTest);

// // test routes
// router.get('/question/:id');

// router.post('/question/:testId');

// router.patch('/question/:id');

// router.delete('/question/:id');

module.exports = router;