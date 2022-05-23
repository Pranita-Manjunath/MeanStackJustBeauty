const express = require("express");
const router = express.Router();

const{
    createOrder,
    getOrderById
}=require("../controllers/order");

router.post("/order/create",createOrder);
router.param("orderId",getOrderById)
module.exports = router;