var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');



  router.post('/', (req, res) => {
    // console.log("request came");
    let user = req.body;
    // console.log(user, 'form data');
    sendMail(user, info => {
      // console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
   
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'vikrant01786@gmail.com',
        pass: 'monica222@222'
      }   
    });
  
    let mailOptions = {
      from: '"Travelamos"<Vikrant01786@gmail.com>', // sender address
      to: 'Vikrant01786@gmail.com', // list of receivers
      subject: user.Subject, // Subject line
      html: `<h4>Customer Name: ${user.FirstName} &nbsp;${user.LastName}</h4>
      <p>Email Address : ${user.Email} </p>
      <p>Message: ${user.Message}</p>
      <h4>Thanks for joining us</h4>`
    };
  
    // send mail with defined transport object
    let info

    try {
      // assign a value here
      info = await transporter.sendMail(mailOptions);
     } catch (err1) {
       console.log("SENDING ERROR MESSAGE: " + err1.message);
     }
     console.log("Message sent: %s", info && info.messageId);
  
    callback(info);
  }



module.exports = router;