/**
 * @description this middleware authentication is to protect our routes to prevent access for unauthorized clients 
 * @note that the logout method is in express and passport
 */

module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next() // means it is authenticated, already logged in
        } else {
            // user is not logged in
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            // user is not logged in
            return next()
        }
    }
}