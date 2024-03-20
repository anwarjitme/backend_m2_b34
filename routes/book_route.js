const express = require("express");
const {BookModel}=require("../model/book_model");
const { isAuth } = require("../middleware/isAuth");
const bookRoute = express.Router();

bookRoute.get('/books', async (req, res) => {
    const category=req.query.category
    const author = req.query.author;
try{
    let books;
    if(category&&author){
 books = await BookModel.find({$and:[{category:category},{author:author}] });

    }else if(category){
   books = await BookModel.find({category:category});
//            
    }else if(author){
        books = await BookModel.find({author:author});
    }
    else{
        books = await BookModel.find();
             
    }
    res.send(books).status(200);   

      }catch(err){
        res.status(500).json({ message: err.message });
      }
    });
 
    bookRoute.get("/books/:id",async(req,res)=>{

        try{
            const id=req.params.id
            const single_book = await BookModel.findById(id);
        
        return res.status(200).json({
        single_book
        });
        }catch(err){
        res.status(400).json({"message":"somthingwronge"})
        }
        })
        
 
bookRoute.post("/books",isAuth,async(req,res)=>{
const payload=req.body
  try{
const book= new BookModel(payload)
await book.save()
res.status(201).json({"msg":"new book  addded"})
  }catch(error){
res.status(400).json({"msg":"Something  wrong"})
  }
})

bookRoute.delete('/books/:id',isAuth, async (req, res) => {
  try {
    const id  = req.params.id;

    const book = await BookModel.findByIdAndDelete(id);

    return res.status(202).json({ "message":`targeted book removed :${book}` });
  } catch (error) {
    return res.status(500).json({ message: 'somthing error' });
  }
});

bookRoute.patch("/books/:id",isAuth, async (req, res) => {
  const single_book= req.body;
  const id=req.params.id
  
  try {

   await BookModel.findByIdAndUpdate({"_id":id},single_book)
    res.status(204).send("single book data updated");
  } catch (err) {
    console.log({ "error": `${err}` });
  }
});



module.exports={
       bookRoute
}



