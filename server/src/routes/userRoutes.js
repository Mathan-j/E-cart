const express = require('express');
const router = express.Router();

const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

router.get("/get", getUser);

router.post("/post", createUser);

router.put("/update", updateUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;