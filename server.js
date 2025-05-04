const express = require('express')
const path = require('path')
const app=express()

const userModel = require("./models/user")


app.set("view engine" , "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , 'public')))

app.get("/"  , (req ,res)=>{
    res.render("index")
})

app.get("/read"  , async (req ,res)=>{
    let user = await userModel.find();
    res.render("read" , {users:user});
})

app.get("/edit/:userid"  , async (req ,res)=>{
    let user = await userModel.findOne({_id :req.params.userid});
    res.render("edit" , {user});
})

app.get("/delete/:id"  , async (req ,res)=>{
    let user = await userModel.findOneAndDelete({_id :req.params.id})
    res.redirect("/read" );
})

app.post("/create", async (req, res) => {
    try {
        let { name, email, image } = req.body;
        let Createduser = await userModel.create({
            name,
            email,
            image
        });
        res.redirect('/'); 
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the user.");
    }
});

app.post("/update/:userid"  , async (req ,res)=>{
    let {name , email , image}=req.body;
    let user = await userModel.findOneAndUpdate({_id :req.params.userid} , {name , email , image} , {new : true});
    res.redirect("/read" );
})
app.listen(5000)  