const express = require("express");
const path  = require("path");
const hbs =  require("hbs");
require("./db/conn");
const User = require("./models/usermessage");
// const { registerPartials } =require("hbs");
const Register = require("./models/registers");

const app = express();
const port = process.env.PORT || 3000;

//setting the path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");


app.use(express.json());

// middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));

app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);

/*new code
app.set("views",templatepath);
app.engine("html",require("hbs").__express);
app.set("view engine","html");

new code end*/

//routing
//app.get( path , callback)
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/pricing",(req,res)=>{
    res.render("pricing");
})
app.get("/register",(req,res)=>{
    res.render("register");
})

// create a new user in database
app.post("/register", async(req,res)=>{
    try{
        const password = req.body.psw;
        const cpassword = req.body.pswrepeat;
        if(password === cpassword){
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                psw:req.body.psw,
                pswrepeat:req.body.pswrepeat
            })
           const registered=await registerEmployee.save();
            res.status(201).render("index");
        }
        else{
            res.send("Passwords are not matching")
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/contact",async(req,res)=>{
    try{
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }
    catch(error){
        res.status(500).send(error);
    }
})

//login validation
app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;//user ne jo enter kiya
        const password = req.body.psw;
        //database:userInput
        const useremail = await Register.findOne({email:email});
        if(useremail.psw==password){
            res.status(201).render("index");
        }
        else{
            res.send("Incorrect password");
        }
    }
    catch(error){
        res.status(400).send("Invalid Email");
    }
})

// server create
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})