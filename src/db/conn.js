const mongoose =  require("mongoose");


// creating a database
mongoose.connect("mongodb+srv://easymechanic:easymechanic@cluster0.hl64w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
    console.log("connection successful")
}).catch((error)=>{
    console.log(error);
})