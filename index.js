const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const { url } = require('inspector');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});


const app = express();
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.engine('ejs',engine)
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));



app.get('/',(req,res)=> {
    res.render('home')
})

app.get('/movies',async (req,res)=> {
    const campgrounds = await Campground.find({});
    res.render('collections/movies',{campgrounds});
})

app.get('/manga', async (req,res)=>{
    res.render('collections/manga');
})

app.get('/video-games', async (req,res)=>{
    res.render('collections/videoGames');
})

app.get('/misc', async (req,res)=>{
    res.render('collections/misc');
})


app.listen(3000, ()=>{
    console.log("Open on port 3000")
})