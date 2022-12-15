let UserDB = require('../model/model')

// create and save a new user - create myfirst API in this app!

// CRUD :
// C
exports.create = (req, res) => {

    // validate the request
    if(!req.body){
        res.status(400).send({
            message:'you can not create user with empty values!'
        })
        return
    }

    // create the user
    const user = new UserDB({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })

    // commit changes to the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/') // I want to redirect the admin to the users home after adding a user
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'some error occured while creating a create request' // default value
            })
        })
}


// retrive + return allusers || single user 
// R
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id // !query id statment to access the ID for the user object in the database! and then store that id in the const id variable and then pass it to the findById method
        UserDB.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({
                        message:`Oops... User with ID ${id} probably doesn't exist`
                    })
                }else {
                    res.send(data)
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || `Error User ID ${id} doesn't exist!`
                })
            })
    }else { // GET all users
        
            UserDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || 'Error occured while retriving users data'
                })
            })

    }

}

// update by user id
// U
exports.update = (req, res) => {
    // first we validate 
    if(!req.body){
        res.status(400).send({
            message:'Data to update can\'t be empty!'
        })
        return res
            .status(400)
            .send({
                message:'Data to update can\'t be empty!'
            })
    }

    // get the users specific id
    const id = req.params.id
    // make the query 
    UserDB.findByIdAndUpdate(id,req.body,{ useFindAndModify:false })
        .then(data => {
            if(!data){
                res.status(404).send({message:`Error 404 : User with ID:${id} might not exist!`})
            }else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Oops... Error While Trying To Update The Data'
            })
        })
}

// delete a user with specified user id in the requ
// D
exports.delete = (req, res) => {
    const id = req.params.id
    UserDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:`Oops... user you're trying to delete with ID ${id} probably doesn't exist`})
            }else {
                res.send({
                    message:`user deleted successfully...`
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || `Faild to delete user with ID ${id}`
            })
        })

}