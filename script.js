require('dotenv').config();
let nodemailer = require('nodemailer');


let xTimesToSend = 100; // how many times to send this mail
let mailAdresses = []; // mail adresses to send mails
let subject = 'subject';
let text = '<h1>Hello !</h1>'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: process.env.PASS, 
        pass: process.env.USER, 
    }, tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
    from: process.env.USER,
    to: mailAdresses,
    subject: subject,
    text: text,
};

function sendEmail() {
    return new Promise(resolve => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve('send')
            }
        });
    });
}

async function asyncCall() {
    for (let index = 0; index < xTimesToSend; index++) {
        const result = await sendEmail();
    }
}

asyncCall();
