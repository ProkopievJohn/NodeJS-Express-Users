#!/usr/bin/env node

var http = require('http'),
	users = require('./users'),
	db = require('./db'),
	app = require('./app')(users, db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('server listening on port ' + app.get('port'));
});

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'myemail@gmail.com',
        pass: 'mypass'
    }
}));

module.exports.sendMail = function(mailMessage, next) {

    var mailOptions = {
        from: (mailMessage.fromLabel || FROM_EMAIL_LABEL) +' <' + (mailMessage.from || 'myemail@gmail.com') + '>',
        replyTo: mailMessage.replyTo || 'myemail@gmail.com',
        subject: mailMessage.subject,
        to: 'emailTo@gmail.com',
        html: mailMessage.html
    };
    if (process.env.TO_EMAIL) {
        mailOptions.to = process.env.TO_EMAIL;
        mailOptions.cc = process.env.TO_EMAIL;
    }
    else if (process.env.NODE_ENV === 'production') {
        mailOptions.to = mailMessage.to;
        mailOptions.cc = mailMessage.cc;
    }

    if (!mailOptions.to || process.env.NO_EMAIL === 'true') {
        console.error('error');
        var err = new Error('No email sendee.');
        next && next(err);
    }
    else {
        transporter.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.error(err);
            }
            else {
                next && next(err);
            }
        });
    }
};
