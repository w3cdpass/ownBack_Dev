const express = require('express');
const router = express.Router()
const userControler = require('../controllers/usercontrollee')
router.post('/users', userControler.createUser);
router.get('/users', userControler.getallUsers)

router.route('/users/:id')
    .get(userControler.getUser)
    .patch(userControler.updateUser)
    .delete(userControler.deleteUser);

module.exports = router;
