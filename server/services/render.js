// I seprated the call-back function in this services folder with the router second args (callback fn) for better project structer and cleaner code reading

const axios = require('axios')


exports.homeRoutes = (req,res) => {
    // GET from api/users
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            console.log(response.data) // remember that this will console.log on the server side 
            res.render('index',{ users: response.data })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

exports.addUserRoutes = (req, res) => {
    res.render('add_user')
}

exports.updateUser = (req, res) => {
    // passing the api put link + option to get a specific user only , params with query id will do it 
    axios.get('http://localhost:3000/api/users',{params: {id: req.query.id }})
        .then(response => {
            res.render('update_user',{user: response.data}) // here I'm passing the user variable from the response i will get from accessing the api/users/id?=user._id so I can now access the user variable I passed in the update_user file!
        })
        .catch(err => res.send(err))
}







// route.get('/',((req,res)=> {
//     // res.send('Crud Application')
//     res.render('index') // to need to specify the filetype as we initilized the view engine with this file extension
// }))

// // route for add_user
// route.get('/add-user',((req,res)=> {
//     // res.send('Crud Application')
//     res.render('add_user') // to need to specify the filetype as we initilized the view engine with this file extension
// }))
// // route for update_user
// route.get('/update_user',((req,res)=> {
//     // res.send('Crud Application')
//     res.render('update_user') // to need to specify the filetype as we initilized the view engine with this file extension
// }))

