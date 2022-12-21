const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let blogs = [
  {
    id: uuid(),
    username: "Dikshant",
    description: "Hello Welcome",
  },
  {
    id: uuid(),
    username: "Arpan",
    description: "Hello Welcome",
  },
  {
    id: uuid(),
    username: "Ram",
    description: "Hello Welcome",
  },
];

//HomePage
app.get("/", (req, res) => {
  res.render("index");
});

//All blogs
app.get("/blogs", (req, res) => {
  res.render("blogs", { blogs });
});

//To create a form for a new blog
app.get("/blogs/add", (req, res) => {
  res.render("add");
});

//To add a new blog
app.post("/blogs", (req, res) => {
  const newBlog = {
    id: uuid(),
    ...req.body,
  };
  blogs.push(newBlog);

  res.redirect("/blogs");
});

 //To display a particular comment
 app.get('/blogs/:id',(req,res)=> {
    const {id} = req.params
const foundBlog = blogs.find((c)=> c.id === (id))
res.render('view',{foundBlog})
})



//For changes in a blog
app.get('/blogs/:id/edit',(req,res)=> {
    const{id} = req.params;
    const foundBlog = blogs.find((c)=> c.id === (id))
    res.render('edit',{foundBlog})
})

app.patch('/blogs/:id',(req,res)=>{
    const {id}=req.params;
    const updatedBlog=req.body.description;
    const foundBlog=blogs.find((c)=>c.id===(id));
    foundBlog.description=updatedBlog;
    res.redirect('/blogs');
})


//To delete a particular blog
app.delete('/blogs/:id',(req,res)=> {
    const{id} = req.params
     const newBlogArray =  blogs.filter((c)=> c.id !==id)
     blogs = newBlogArray
    res.redirect('/blogs')
})



app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
