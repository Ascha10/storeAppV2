const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dbConnection = require('./DB/storeDB');
const path = require('path')
const shirtsRoutes = require('./Routes/Api/shirts'); 
const authRoutes = require('./Routes/Api/auth'); 
const passport = require('passport')
require('./Config/passport')(passport);



// app.use(cors({credentials : true,origin: ['http://localhost:3000'],SupportsCredentials : true,allowedHeaders : ['GET', 'POST', 'PUT', 'DELETE']}));
// app.use(cors({credentials : true,origin: ['http://localhost:3000'],SupportsCredentials : true,allowedHeaders : ['GET', 'POST', 'PUT', 'DELETE']}));
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json()); 
app.use(cookieParser());


app.use(passport.initialize());
app.use('/Api',authRoutes);
app.use('/Api',passport.authenticate('jwt',{session:false}),shirtsRoutes);

//for validation..must be after route middelware
// app.use((err,req,res,next) => {
//     res.status(422).send({Error : err.message});
// })


const port =  process.env.PORT || 9000 ;
app.listen(port,() => {
    console.log(`listening on port ${port}`);
})

if (process.env.NODE_ENV === 'production'){ 
    app.use(express.static(path.join(__dirname,'../Client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../Client/build','index.html'))
    });
}
// } else {
//     app.get('/', (req,res) =>{
//         res.send("Api running")
//     })
// }

