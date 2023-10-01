const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const cors = require('cors')

const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')


//Middleware


//custom Middleware
app.use(logger)


//build in middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',express.static(path.join(__dirname,'./public')))
app.use('/subdir', express.static(path.join(__dirname, "./public")));

app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
app.use('/employees',require('./routes/api/employees'))

//Third party middleware
const whiteList = [
  'https://www.google.com',
  'http://www.127.0.0.1:3500',
  'http://www.localhost:3000/',
];
const corsOptions = {
    origin:(orign,callback)=>{
        if (whiteList.indexOf(orign) !== -1 || !orign){
            callback(null,true)
        }else {
            callback(new Error("Site is not allowed by CORS"))
        }
    },
    optionsSuccessStatus : 200
}
app.use(cors(corsOptions));


// app.get('/',(req,res)=>{
//     res.send("Welcome to devpdhana")
// })

// app.get('^/$|/index(.html)?',(req,res)=>{ //regular expression
//     res.sendFile(path.join(__dirname,'views','index.html'))
// })

// app.get('/new-page(.html)?',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','new-page.html'))
// })

// app.get("/old-page(.html)?", (req, res) => {
//   res.redirect(301,path.join("new-page.html"));
// });


//Route Handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("try to loading hello.html page");
    next();
  },
  (req, res) => {
    console.log("next page");
    res.send("Hi every one");
  }
);

const one = (req,res,next)=>{
    console.log("one")
    next()
}

const two = (req,res,next)=>{
    console.log("two")
    next()
}

const three = (req,res)=>{
    console.log("three")
    res.send("Finished...")
}

app.get('/chain(.html)?',[one,two,three])



// app.get('/*',(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'))
// })


app.all('*',(req,res)=>{
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if (req.accepts('jsom')){
        res.json({"error":"404 not found"})
    }else {
        res.type('text').send('Page not found')
    }
})


app.use(errorHandler)
app.listen(PORT,(err)=>{
    if(err){
        console.error(err)
    }else{
        console.log(`server running on ${PORT}`)
    }
})