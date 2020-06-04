const Core         = require('./core.model');//you can include all your lib
const email           = require('../../lib/email.service');//you can include all your lib
let core = new Core();
async           = require("async");
var md5 = require('md5');

class User {


    register(options,base_url) {

        return new Promise((resolve, reject) => {


            let data = {

                where : { 

                    "email" : options.email,
                },
                'cols' : "*"
            };


            core.getAll(constant.USERS,data).then(function(user) {

                if(user.length!=0){

                    if(user[0]['emailVerification']==0){
                    
                        resolve("UVU");

                    }else{

                        resolve("AE");
                    }

                }else{

                    var newData = {};

                    newData['email'] = options.email,
                    newData['name'] = options.name,
                    newData['emailVerification'] = 0,
                    newData['password'] = md5(options.password);
                    core.save(constant.USERS,newData).then(function(save){

                        email.sendVerificationLink(options,base_url,newData).then(function(sendMail){
                            resolve(newData);

                        }).catch(function(error){

                            reject(error);
                           });
                            

                    
                    });

                }
             

            });
        });
      
    }

    verification(options) {

        return new Promise((resolve, reject) => {

            core.getAll(constant.USERS,{where : options}).then(function(users) {

                if(users.length==0){

                    resolve("IL");
                }else{
                       
                    users = users[0];
                    var newData = {};

                     var set = {
                        emailVerification : 1,
                    }
                    var where = {
                        id : users.id,
                    }
                    core.updateData(constant.USERS,set,where).then(function(magSave){
                        users.emailVerification = 1
                         resolve(users);
                        
                    });

                }             

            });

            
        });
      
    }

}

module.exports = User;
