const express  = require("express");
const app = express();
const port =8080;
const  path = require("path");
const methodOverride = require('method-override');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/Views"));
app.use(express.static(path.join(__dirname,"/Public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
let data = [
    {   id:1,
        username : "Abid Pathan",
        image:"https://4kwallpapers.com/images/walls/thumbs_3t/18363.jpg" ,
        description : "Ore wa Kaizoku-Ō ni naru!",

    },
    {   id:2,
        username : "Noufill",
        image:"https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2024/05/imagen_2024-05-27_212924897.jpg?w=1280&ssl=1" ,
        description : "Dattebayo",

    },
    {   id:3,
        username : "Teja Balaji",
        image:"https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/10/bleach-s-sosuke-aizen-character-guide.jpg" ,
        description : "Bankai",

    },
];
app.get( "/home", (req,res)=>{
 res.render("home.ejs",{data});
});
app.get("/home/create",(req,res)=>{
    res.render("create.ejs");
});
app.post('/home',(req,res)=>{
    let {username,image,description}=req.body;
    id =data.length+1;
    let new_data ={ id,username,image,description,};
    data.push(new_data);
    res.redirect("/home");
});
app.get("/home/:id", (req, res) => {
    let id = parseInt(req.params.id); 
    let post = data.find(p => p.id === id); 
    
    if (post) {
        res.render("detail.ejs", { post });
    } else {
        res.status(404).send("Post not found!");
    }
});

app.get("/home/:id/edit",(req,res)=>{
    let id = parseInt(req.params.id);
    let post = data.find(p => p.id === id );
    if(post){
        res.render("edit.ejs",{post});
    }
    else{
        res.status(404).send("post not found");
    }
});
app.patch("/home/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let post = data.find(p => p.id === id);
    if (post) {
        const { description, image } = req.body;
        post.description = description;
        post.image = image;
        res.redirect("/home");
    } else {
        res.status(404).send("Post not found");
    }
});
app.delete("/home/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    data = data.filter(p => id !== p.id);
    res.redirect("/home");
})
app.listen( port,()=>{
    console.log(`server is listening : ${port}`);
});

