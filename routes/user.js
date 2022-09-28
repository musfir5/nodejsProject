const { response } = require('express');
var express = require('express');
var router = express.Router();
var prodHelpers = require('../Helpers/prod-helpers');
const userHelpers = require('../Helpers/user-helpers');
const verifyLogin = (req, res, next) => { //.........to check the user is verify or not....// this function add where we want to check user login..//

    if (req.session.lggedIn) {
        next()
    } else {

        res.redirect('/login')
    }
};



/* GET home page. */
router.get('/', function(req, res, next) {
    let user = req.session.user
    console.log(user)

    prodHelpers.getAllProducts().then((products) => {

        res.render('user/view-products', { products, user })


    })

});

router.get('/login', (req, res) => {

    if (req.session.lggedIn) {

        res.redirect('/')
    } else {


        res.render('user/login', { 'loginErr': req.session.loginErr })
        req.session.loginErr = false

    }


})

router.get('/signup', (req, res) => {

    res.render('user/signup')
})

router.post('/signup', (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {

        console.log(response)
    })

})

router.post('/login', (req, res) => {

    userHelpers.doLogin(req.body).then((response) => {

        if (response.status) {
            req.session.lggedIn = true
            req.session.user = response.user
            res.redirect('/') //......redirect used for calling already used HBS file..........................//

        } else {
            req.session.loginErr = "Invalid username or password!?"

            res.redirect('/login')
        }
    })

})

router.get('/logout', (req, res) => {

    req.session.destroy() //.......to destroy the login.............//
    res.redirect('/')
})

router.get('/cart', verifyLogin, (req, res) => {


    res.render('user/cart')
})


module.exports = router;