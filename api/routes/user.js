const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/test/:id', userController.getTest);

router.post('/response/:id', userController.postResponse);

router.delete('/response/:id', userController.deleteResponse);

module.exports = router;