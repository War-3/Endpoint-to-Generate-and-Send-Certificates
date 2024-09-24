const express = require("express")
const router = express.Router()

const { generateCertFxn, add_userFxn } = require('../controllers/userControllers')
const { validateUser, validateCert }= require("../middleware/validations")


router.post('/add_user', validateUser,add_userFxn)
router.post('/generateCert',validateCert,generateCertFxn)

module.exports = router