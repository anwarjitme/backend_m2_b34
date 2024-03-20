const mongoose=require("mongoose")

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookModel', required: true }],
    totalAmount: Number
});
const OrderModel=mongoose.model("order",orderSchema)
module.exports={
   OrderModel
}