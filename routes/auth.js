const express = require('expresss')
const router = express.Router()

const {login,register} = require('../controllers/auth')

router.route('/login').post(login)
router.route('/register').post(register)

module.exports = router