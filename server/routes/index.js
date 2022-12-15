const express = require('express')
const router = express.Router()
const services = require('../services/render')
const { ensureAuth, ensureGuest } = require('../../middleware/mw_auth')

/**
 * @desc Login/Landing page
 * @route GET / Login
 * **/

router.get('/', ensureGuest , services.loginPage)

/**
 * @desc Dashboard
 * @route GET /
 * @middleware we can pass it as second arg in the get req
 * **/

router.get('/dashboard',ensureAuth ,services.dashBoard)


module.exports = router