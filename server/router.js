const express = require('express');

const router = express.Router();

const { checkEmail, createUser } = require('./controllers/user');
const createItem = require('./controllers/item');
const createOffer = require('./controllers/offer');
const createAddress = require('./controllers/address');

const { getAllItems, getOwnItems } = require('./controllers/home');


const authMiddleware = require('./middleware/auth');
router.post('/item', authMiddleware, createItem);


router.post('/user', createUser);
router.post('/check-email', checkEmail);
router.post('/offer', createOffer);
router.post('/address', createAddress);

router.get('/', getAllItems);
router.get('/:userId', getOwnItems);

module.exports = router;