var express = require('express');
var prodHelpers = require('../Helpers/prod-helpers');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

    prodHelpers.getAllProducts().then((products) => {
        console.log(products)
        res.render('admin/view_products', { admin: true, products })
    })



});

router.get('/add-product', (req, res) => {

    res.render('admin/add-product')

})

router.post('/add-product', (req, res) => {

    console.log(req.body);
    console.log(req.files.Images);

    prodHelpers.addProduct(req.body, (id) => {
        let image = req.files.Images
        console.log(id)
        image.mv('./public/product-images/' + id + '.jpg', (err, done) => {

            if (!err) {
                res.render('admin/add-product');
            } else {
                console.log(err);
            }
        })


    })
})

module.exports = router;