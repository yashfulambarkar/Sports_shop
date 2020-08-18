const express = require("express");
const router = express.Router();



const {
  getOrderById,
  createOrder,
  getAllOrders,
  deleteOrder,
  getOrderStatus,
  updateStatus
} = require("../controllers/order");

//params


//Actual routes
//create
router.post(
  "/order/create",

  createOrder
);
//all of params

router.param("orderId", getOrderById);

//all of actual routes
//create route
//router.post("/order/create",upload.single('productimage'),createProduct);

router.get(
    "/order",
    getAllOrders
  );

// // read routes
//router.get("/order/:orderId", getOrder);

//router.put("/order/:orderId",updateOrder);


// //delete route
router.delete(
  "/order/:orderId",
  deleteOrder
);


module.exports = router;
