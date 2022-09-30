const { response } = require('express');
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

router.get('/delete-product/:id', (req, res) => {

    let proId = req.params.id //......get the :id of the product..........//
    console.log(proId)
    prodHelpers.deleteProduct(proId).then((response) => {

        res.redirect('/admin/')
    })



})

router.get('/edit-product/:id', async(req, res) => {
    let product = await prodHelpers.getProductDetails(req.params.id)


    res.render('admin/edit-product', { product })
})

router.post('/edit-product/:id', (req, res) => {
    console.log(req.params.id);

    let id = req.params.id

    prodHelpers.updateProduct(req.params.id, req.body).then(() => {

        res.redirect('/admin')
        if (req.files.Images) {
            let image = req.files.Images
            image.mv('./public/product-images/' + id + '.jpg')
        }
    })
})

module.exports = router;