const express = require('express')
const router = express.Router()
const services = require('../services/render')
const { ensureAuth } = require('../../middleware/mw_auth')


/**
 * @desc render add story
 * @route GET /stories/add
 * **/

router.get('/add', ensureAuth , services.addStory)

/**
 * @desc Submit add form
 * @route POST /stories
 * **/

router.post('/', ensureAuth , services.storyPost)



/**
 * @desc all stories
 * @route GET /stories
 * **/

router.get('/', ensureAuth , services.allStories)


/**
 * @desc edit page
 * @route GET /stories/edit/:id
 * **/

router.get('/edit/:id', ensureAuth , services.editStory)


/**
 * @desc Get Single story
 * @route GET /stories/:id
 * **/

router.get('/:id', ensureAuth , services.getStory )


/**
 * @desc Update story
 * @route PUT /stories/:id
 * **/

router.put('/:id', ensureAuth , services.updateStory)



/**
 * @desc delete story
 * @route DELETE /stories/:id
 * **/

router.delete('/:id', ensureAuth , services.deleteStory)

/**
 * @desc show user stories
 * @route GET stories/user/:id
 * **/

router.get('/user/:id', ensureAuth , services.userStory)






module.exports = router