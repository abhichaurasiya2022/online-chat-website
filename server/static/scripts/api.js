const express = require('express');
const apiController = require('../controllers/api')
const router = express.Router();


router.post('/test', apiController.test);

router.post('/signup', apiController.signup);

router.post('/signin', apiController.signin);

router.post('/dashboard', apiController.dashboard);

router.post('/search', apiController.search);

router.post('/addfriend', apiController.addfriend);

router.post('/addId', apiController.addId);

router.post('/getId', apiController.getId);


router.post('/gethello', apiController.gethello);


module.exports = router;
