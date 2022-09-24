const { response } = require('express');
var express = require('express');
var router = express.Router();
var prodHelpers = require('../Helpers/prod-helpers');
const userHelpers = require('../Helpers/user-helpers')



/* GET home page. */
router.get('/', function(req, res, next) {
    let user = req.session.user
    console.log(user)

    prodHelpers.getAllProducts().then((products) => {

        res.render('user/view-products', { products, user })


    })

});

router.get('/login', (req, res) => {

    res.render('user/login')
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

            res.redirect('/login')
        }
    })

})

router.get('/logout', (req, res) => {

    req.session.destroy() //.......to destroy the login.............//
    res.redirect('/')
})



module.exports = router;