
const User           = require('../model/user.model');//you can include all your lib
let userModel = new User();
const Core         = require('../model/core.model');//you can include all your lib
let core = new Core();
//const pw           = require('../../../lib/password');//you can include all your lib
var md5 = require('md5');

exports.usersRegistration = function(req, res) {

	let email = req.body.email;
	let password = req.body.password;
	let name = req.body.name;
	let url = req.body.url;
	
	if(email==''){
		 res.json({'status':'fail','message':"Email is required"});
	     return;
	}

	if(password==''){
		 res.json({'status':'fail','message':"Password is required"});
	     return;
	}

	if(name==''){
		 res.json({'status':'fail','message':"Name is required"});
	     return;
	}

	let option = {

		'email' : email,
		'password' : password,
		'name' : name,
	}

	base_url = (url) ? url : req.protocol + '://'+req.headers['host']+'/users/verifyuser/';

	userModel.register(option,base_url).then(function(user) {

		if(user){

			switch(user) {

		        case 'AE':

			        res.json({'status':'success','message':'This email address is already being used','registerStatus':user});
	                return;
		           break;
		        case 'UVU':
			        res.json({'status':'success','message':'Verify Email! We have sent an email to '+email+', please verify the email address before you can login','registerStatus':user});
	                return;
		           break;   

		        case 'success':

			        res.json({'status':'success','message':'You are almost registered','registerStatus':"success",'data':user});
	                return;

		           break;

		        default: 
			        res.json({'status':'success','message':'You are almost registered','registerStatus':"success",'data':user});
	                return;    
			}
		}

	}).catch(function(error){

        res.json({'status':'fail','message':'Something went wrong','data':error});
        return;
    });

}


exports.verification = async function(req, res) {

	let email = req.body.email;

	if(email==''){
		 res.json({'status':'fail','message':"Email is required"});
	     return;
	}

	var option = {

		'email' : email,
		'emailVerification':0

	}

	userModel.verification(option).then(function(user) {

	  const token = generateAccessToken({ username: email});
	  
		user[0].token = token;

		if(user){

			switch(user) {

		        case 'IL':

			        res.json({'status':'success','message':'Invalid Link','registerStatus':user});
	                return;
		           break;

		        case 'success':

			        res.json({'status':'success','message':'Verification successfully','registerStatus':"success",'data':user});
	                return;

		           break;

		        default: 
			        res.json({'status':'success','message':'Verification successfully','registerStatus':"success",'data':user});
	                return;    
			}
		}

	}).catch(function(error){

        res.json({'status':'fail','message':'Something went wrong','data':error});
        return;
    });

}


exports.sign_in = function(req, res) {


	  const token = generateAccessToken({ username: req.body.email });


	let email = req.body.email;
	let password = req.body.password;

	base_url = req.protocol + '://'+req.headers['host'];

	core.getAll(constant.USERS,{where : {"email" : email}}).then(function(rs) {
		
		if(rs.length){

			rs = rs[0];

			rs.token = token;
	
			if(md5(password)==rs.password){

				res.json({'status':'success','message':'login successfully',data:rs});
	        	return

			}else{

				res.json({'status':'fail','message':'invalid login credentials'});
	        	return
			}

		}else{

		    res.json({'status':'fail','message':'Email not exist please signup.'});
		    return;

		}

	}).catch(function(error){

        res.json({'status':'fail','message':'Something went wrong','data':error});
        return;
    });
}

exports.loginUserInfo = function(req, res) {

	let email = req.body.email;

	contentModel.getAll(constant.USERS,{where : {"webUserName" : email}}).then(function(rs) {
		
		if(rs.length){

			res.json({'status':'success','message':'ok',data:rs[0]});
	        return

		}else{

		    res.json({'status':'fail','message':'No record found'});
		    return;

		}

	}).catch(function(error){

        res.json({'status':'fail','message':'Something went wrong','data':error});
        return;
    });
}


function generateAccessToken(username) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, '7bc78545b1a3923cc1e1e19523fd5c3f20b409509', { expiresIn: '1800s' });
}