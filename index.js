const express = require('express');
const { create } = require('hbs');
const app = express()
const port = 3000


app.set('view engine','hbs');
app.set('views', 'views');

app.use('/asset',express.static('asset'));
app.use('/img',express.static('img'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const blogs = [];

//routing 
app.get('/', (req, res) => {
  res.render('index', {
    data:"hello word",
  });
});

app.get("/Blog",renderBlog);
app.post("/Blog" , addBLog);
app.get('/contact', renderContact);
app.get('/testimonial',renderTestimonial)
app.get("/blog-detail/:blog_id",renderBlogDetail);
app.get("/edit-blog/:blog_id",renderEditBlog);
app.post("/edit-blog/:blog_id", editBlog);
app.get("/delete-blog/:blog_id",deleteBlog);


function renderContact(req,res) {
  res.render('contact');
}

function renderTestimonial(req,res) {
  res.render('testimonial');
}

function renderBlog(req,res) {
  res.render("Blog",{
    data: blogs,
  });
}

function addBLog (req,res) {
  const newBlog = {
    id : blogs.length + 1,
    title:req.body.title,
    content:req.body.content,
    createdAt:new Date(),
    author:"rifki yudha"
  }
  blogs.push(newBlog);

  res.redirect("/Blog");
}

function renderBlogDetail (req,res) {
  const id = req.params.blog_id;
  const blog = blogs.find((blog) => blog.id == id)
  res.render("blog-detail", {
    data:blog,
  });
}

function renderEditBlog(req,res) {
  const id = req.params.blog_id;

  const blog = blogs.find((blog) => blog.id == id)
  
  
  res.render("edit-blog",{
    data:blog,
  });
}

function editBlog(req,res) {
  const id = req.params.blog_id;
  const newBlog = {
    id : id,
    title:req.body.title,
    content:req.body.content,
    createdAt:new Date(),
    author:"rifki yudha"
  };
  const index = blogs.findIndex((blog) => blog.id == id);

    blogs[index] = newBlog;

    res.redirect("/blog");
}

  function deleteBlog(req,res){
    const id = req.params.blog_id;
    
    const index = blogs.findIndex((blog) => blog.id == id);

    blogs.splice(index, 1);

    res.redirect("/blog");

  }
    

    app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})