const Story = require('../../models/Story')

exports.loginPage = (req, res) => {
    res.render('login', { layout: 'login' })
}

exports.dashBoard = async (req, res) => {

    try {
        const stories = await Story.find({ user: req.user.id }).lean()

        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
}

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
    })  // request object have a logout method
    res.redirect('/') // redirect the user to home
}

// a logout route that was previously:

// app.post('/logout', function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// });
// should be modified to:

// app.post('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

exports.addStory = (req, res) => {

    try {
        res.render('stories/add')

    } catch (error) {
        console.log(error)
        res.redirect('/error/404')
    }
}

exports.storyPost = async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
}

exports.allStories = async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('stories/index', {
            stories,
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
}


exports.editStory = async (req, res) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean()

    if (!story) {
        return res.render('error/404')
    }

    // protect the stories of each user to make the same user the only one able to edit
    if (story.user != req.user.id) {
        res.redirect('/stories')
    } else {
        res.render('stories/edit', {
            story,
        })
    }
}


exports.updateStory = async (req, res) => {

    try {

        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })

            res.redirect('/dashboard')
        }

    } catch (error) {
        console.log(error)
        res.redirect('error/500')
    }
}


exports.deleteStory = async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.render('error/404')
    }
}

exports.getStory = async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()

        if (!story) {
            return res.render('error/404')
        }

        res.render('stories/show', {
            story
        })
    } catch (error) {
        console.log(error)
        res.redirect('error/500')
    }
}


exports.userStory = async (req, res) => {
    try {
        console.log(req.params.id)
        const stories = await Story.find({
            user: req.params.id, // choose a single user by the current id
            status: 'public'
        })
            .populate('user')
            .lean()
        res.render('stories/index', {
            stories, // render with stories holding the selected user only
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
}