const express = require('express');
const app = express();
const user =require('./app/models/sign.model')
const appRoutes = require('./app/routes/app.routes');
//var session = require('express-session')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  app.use('/api' , appRoutes);
  //app.use('/api', appRoutes);
  



app.get('/get' , (req ,res)=>{
    res.send("connected");
})


app.post("/welcome", (req, res) => {
  res.status(200).send("Welcome");
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//app.listen(8000);