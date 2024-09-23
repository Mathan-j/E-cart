const express = require('express');
const router = express.Router();

const {
    getProduct,     
    getProductCategory,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const {verifyToken,verifyRole} =require('../middleware/auth')

router.get("/get",verifyToken,verifyRole(["admin","user"]), getProduct);

router.post("/post",verifyToken,verifyRole(["admin"]), createProduct);

router.post("/get-product-category",verifyToken,verifyRole(["admin","user"]), getProductCategory);

router.put("/update",verifyToken,verifyRole(["admin"]), updateProduct);

router.delete("/delete/:id",verifyToken,verifyRole(["admin"]), deleteProduct);

module.exports = router;