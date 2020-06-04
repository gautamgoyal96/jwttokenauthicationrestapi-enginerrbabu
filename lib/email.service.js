var nodemailer = require('nodemailer');
var ejs   = require('ejs');
//generating a hash
exports.sendVerificationLink = function(options,base_url,newData) {

	return new Promise((resolve, reject) => {

		var template = process.cwd() + '/templates/registration.ejs';
        var templateData = {
            year : moment().format("YYYY"),
            email : options.email,
            name : options.name,
            'verify_link': base_url+options.email+ '/'
        };

        ejs.renderFile(template, templateData, 'utf8', function(err, file) {
    
           var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                service: "Gmail",
                secureConnection: true,
                auth: {
                    user: constant.SMTP_USERNAME,
                    pass: constant.SMTP_PASSWORD 
                }
            });



           var mailOptions = {
            	from: 'test@test.com',
                to: options.email,
                subject: 'Verification Email',
                html: file
            }

            smtpTransport.sendMail(mailOptions, function(error, response) {
                if(error){
                    reject(error);
                }
                resolve("success");

            });


        });


	});

};