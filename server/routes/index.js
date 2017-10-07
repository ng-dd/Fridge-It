const router = require('express').Router();
const messages = require('../controller/messageController');
const fridge = require('../controller/fridgeController');
const item = require('../controller/itemController');
const search = require('../controller/searchController');
const user = require('../controller/userController');

// Messages Routes
router.get('/allMessages/:id', messages.getMessages);
router.post('/allMessages', messages.postMessages);
router.delete('/allMessages/:messageId', messages.deleteMessages);
router.patch('/allMessages/:id', messages.updateMessages);

// Fridge Routes
router.post('/fridge', fridge.addFridge);
router.get('/fridge/:name', fridge.getFridge);
router.delete('/fridge/:fridgeId', fridge.deleteFridge);

// Items Routes
router.get('/items/:fridgeId', item.getAllItems);
router.post('/items', item.addItem);
router.patch('/items/:id', item.updateItem);
router.delete('/items/:id', item.deleteItem);

//macros shiiiit
router.post('/macros', item.getMacros);
router.post('/nutrients', item.getRealMacros);
//User Routes
router.get('/users', user.getUsers);
router.put('/users', user.addVidCode);

// Search Routes
router.route('/search')
  .put(search.getRecipes);

module.exports = router;