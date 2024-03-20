const express=require("express")
const { OrderModel } = require("../model/order_model")
const { isAuth } = require("../middleware/isAuth")

const orderRoute=express.Router()

orderRoute.post("/order",isAuth,  async (req, res) => {
    try {
      
        const order = new OrderModel({
            user: req.user.id,
            books: req.body.books,
            totalAmount: req.body.totalAmount
        });

     
        await order.save();

        res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
       
        res.status(500).json({ message: 'Server error' });
    }
})

orderRoute.get("/orders",isAuth,  async (req, res) => {
    try {
    
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (err) {
       
        res.status(500).json({ message: 'Server error' });
    }
})

    module.exports={
        orderRoute
    }


