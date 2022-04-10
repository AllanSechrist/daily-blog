const express = require("express")
const bodyParser = require("body-parser")
const _ = require("lodash")



const app = express()

const posts = []

const homeStartingContent = "Hello"
const aboutContent = "World"
const contactContent = "Again"

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get("/", (req,res) => {
    res.render('home', {posts: posts})
})

app.get("/about", (req, res) => {
    res.render('about', {aboutContent: aboutContent})
})

app.get("/contact", (req, res) => {
    res.render("contact", {contactContent: contactContent})
})

app.get("/compose", (req, res) => {
    res.render("compose")
})

app.post("/compose", (req, res) => {
    const post = {title : req.body.title,
                body : req.body.body}
    posts.push(post)
    res.redirect("/")
})

app.get("/posts/:title", (req, res) => {
    posts.forEach((post) => {
        if (_.lowerCase(post.title) === _.lowerCase(req.params.title)) {
            res.render("post", {
                title: post.title, 
                body: post.body
            })
        }
    })
})

app.listen(3000, function(){
    console.log("Server started on port 3000")
})