const mongoose=require("mongoose")
const bookSchima=mongoose.Schema({
      
        title: String,
        author: String,
        category: String,
        price: Number,
        quantity: Number
      
})
const BookModel=mongoose.model("book",bookSchima)
module.exports={
    BookModel
}