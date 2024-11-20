const express = require("express");
const pool = require("./db");
const {v4:uuidv4} = require("uuid");

const app = express();
const port = 5000

// middleware for received data 
app.use(express.json());

//for formdata : jodi form data niya kaj korte chai tahole eta use korte hobe

app.use(express.urlencoded({extended:true}));



//get / books - return all the book
app.get("/books",async(req,res)=>{
  try {
    const books = await pool.query("select * from bookdb")
    res.status(200).json({message:"users are returned",data:books.rows});
  } catch (error) {
    res.json({error:error.message});
  }
});
//get /books/:id - return a specific  book
app.get("/books/:id",async(req,res)=>{

    try {
        const {id} = req.params;
        const book = await pool.query("select * from bookdb where id=$1,[id]")
      res.status(200).json({message:"user returned",data:book.rows});
    } catch (error) {
      res.json({error:error.message});
    }
  });
//post /books - create a book
app.post("/books",async(req,res)=>{
    try {
        const {name ,desc} = req.body;
        const id = uuidv4();
        //inserting book data in the database
       const newBook = await pool.query("insert into book (id,name,desc) values($1,$2,$3) returning *" ,[id,name,desc])
      res.status(200).json({message:`user book created`, data: newBook.rows});
    } catch (error) {
      res.json({error:error.message});
    }
  });
//put /books/:id - update a book
app.put("/books/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,desc} = req.body;
        const updatedBook = await pool.query("update book set name=$1,desc=$2, where id=$3 returning *", [name,desc,id]);
      res.status(200).json({message:"user returned updated",data:updatedBook.rows});
    } catch (error) {
      res.json({error:error.message});
    }
  });
//delete/books/:id - delete a book
app.delete("/books/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedBook = await pool.query("delete from bookdb where id=$1",[id])
      res.status(200).json({message:"user book deleted"});
    } catch (error) {
      res.json({error:error.message});
    }
  });


app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
})




//crud : crearte ,read ,update,delete

















//Rest api basic setup express crud



// const express = require("express");


// const app = express();
// const port = 5000

// // middleware for received data 
// app.use(express.json());

// //for formdata : jodi form data niya kaj korte chai tahole eta use korte hobe

// app.use(express.urlencoded({extended:true}));



// //get / books - return all the book
// app.get("/books",async(req,res)=>{
//   try {
//     res.status(200).json({message:"users are returned"});
//   } catch (error) {
//     res.json({error:error.message});
//   }
// });
// //get /books/:id - return a specific  book
// app.get("/books/:id",async(req,res)=>{

//     try {
//         const {id} = req.params;
//       res.status(200).json({message:"user returned",id});
//     } catch (error) {
//       res.json({error:error.message});
//     }
//   });
// //post /books - createa a book
// app.post("/books",async(req,res)=>{
//     try {
//         const {name ,desc} = req.body;
//       res.status(200).json({message:`user book created, ${name},${desc}`});
//     } catch (error) {
//       res.json({error:error.message});
//     }
//   });
// //put /books/:id - delete a book
// app.put("/books/:id",async(req,res)=>{
//     try {
//         const {id} = req.params;
//       res.status(200).json({message:"user returned updated",id});
//     } catch (error) {
//       res.json({error:error.message});
//     }
//   });
// //delete/books/:id - update a book
// app.delete("/books/:id",async(req,res)=>{
//     try {
//         const {id} = req.params;
//       res.status(200).json({message:"user book deleted",id});
//     } catch (error) {
//       res.json({error:error.message});
//     }
//   });


// app.listen(port,()=>{
//     console.log(`Server running on Port ${port}`)
// })
