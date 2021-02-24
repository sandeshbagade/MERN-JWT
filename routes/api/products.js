const express = require("express");
const router = express.Router();

// Load User model
const Product = require("../../models/Product");

router.get("/", (req, res) => {
    const product = new Product({
        name: 'Product 2',
        email: 'some email',
        skuCode: 'skuCode',
        price:'price',
        image: 'https://picsum.photos/200/300',
        features:{feature_1:'1',feature_2:'2' }
      });
      product.save()
    Product.find({}).then(function (users) {
        console.log(users)
        res.send(users);
    });
    return res
        .status(200)
});

module.exports = router;
