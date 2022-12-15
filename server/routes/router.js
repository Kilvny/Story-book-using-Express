const express = require('express')
const route = express.Router()


const services = require('../services/render')
const controller = require('../controller/controller')

/** 
* @description Root Route
* @method GET/

*/ 
route.get('/', services.homeRoutes)

// route for add_user
/**
 * @description Add User Route
 * @method GET/add-user
 */

route.get('/add-user',services.addUserRoutes)
// route for update_user
/**
 * @description Update User Route
 * @method GET/update_user
 */

route.get('/update_user',services.updateUser)

// API 
/** 
 * create the API 
 * test on postman
 * you're good to go.. use the API 
 * @CRUD operations
*/
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

module.exports = route