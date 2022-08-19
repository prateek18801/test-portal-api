const router = require('express').Router();

const adminController = require('../controllers/admin');

// test routes
router.get('/test/:id?', adminController.getTest);

router.post('/test/:id?', adminController.postTest);

router.delete('/test/:id', adminController.deleteTest);

// question routes
router.get('/question/:id', adminController.getQuestion);

router.post('/question/:id?', adminController.postQuestion);

router.delete('/question/:id', adminController.deleteQuestion);

// evaluation routes
router.get('/evaluate/:id', adminController.evaluateTest);

router.get('/results/:id', adminController.getResults);

module.exports = router;