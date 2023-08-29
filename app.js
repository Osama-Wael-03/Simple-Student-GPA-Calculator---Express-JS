
//Requiring Express Module
const express = require('express');

//Express Instatiation 
const app = express();

//Requiring Routes
const webRouter = require('./routes/webRouter');

//Requiring Database
const database = require('./config/database');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));



//Routes
app.use('/', webRouter);

//General Handler
app.use((req, res) => {
  res.status(404).send({ status: false, message: 'Sorry Page Not Found !' });
});


database.authenticate().then(() => {

  database.sync({ force: false }).then(() => {

    console.log('Models Created Successfully !');
    //Listening To PORT 5000
    app.listen(5000, () => { console.log('Server Started !') });

  }).catch((error) => {
    console.log(`An Error Occured In Creating The Model ! `);
  });

}).catch((error) => {
  console.log(`An Error Occured In Database Connection !`);
});
