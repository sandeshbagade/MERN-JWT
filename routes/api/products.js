const express = require("express");
const router = express.Router();

// Load User model
const Product = require("../../models/Product");
const db = require("../../config/keys").mongoURI;


router.get("/", (req, res) => {
    Product.find({}).then(function (users) {
        res.send(users);
    });
    return res
        .status(200)
});

module.exports = router;
