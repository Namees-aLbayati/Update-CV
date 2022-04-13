const path = require('path');
const express = require('express');
const homeRoutes=require('./controllers/home')
// const helpers=require('./utils/date')
const session = require("express-session");


const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelieStore = require("connect-session-sequelize")(session.Store);


const app = express();

const sess = {
    secret: "this_is_my_secret",
    cookie: {},
    resave: false,
    logged_in:true,
    
    saveUninitialized: true,
    store: new SequelieStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(homeRoutes)

const PORT = process.env.PORT || 3001;



// handlebars setup
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');










let transporter = nodemailer.createTransport({
service:'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });



  app.post("/send", (req, res) => {
    //   multiparty npm package used to analyse req.body,we can just use normal way through req.body to get name,subject,email
   //we have two ways to fetch our data with post
   //first one using fetch with  headers: {
        //     'content-type': 'application/json'
        // }, which give us ability to work with req.body
        //second one if we WILL NOT use  headers: {
        //     'content-type': 'application/json'
        // },THROUGH OUR FETCH
        // here we will use parse with multiparty npm package to get the same result that we get it if we use header and req.body

    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        // console.log('fields nn',fields.name.toString())
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
    //   console.log(data);
      const mail = {
        sender: `${data.name} <${data.email}>`,
        to: 'nameesmohammed12@gmail.com', // receiver email,
        subject: data.subject,
        text: `${data.name} ${data.email} \n${data.message}`,
      };
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to Namees!iwill contact u soon");
        }
      });
    });
  });





sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log('Now listening 3001'));
});