const express = require('express')
const passport = require('passport')
const router = express.Router()
const services = require('../services/render')



/**
 * @desc Google Auth
 * @route GET /auth/google
 * **/

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

/**
 * @desc Google Auth Callback
 * @route GET /google/callback
 * **/

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), services.dashBoard) // if it's success render the dashboard if it fails render the home bcs user's not logged in & can't have access

/**
 * @description Logout user
 * @route /auth/logut
 */

router.get('/logout', services.logout)

module.exports = router