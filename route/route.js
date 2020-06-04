auth = require("../config/auth.service");
user = require("../application/controller/user.controller");
category = require("../application/controller/category.controller");
product = require("../application/controller/product.controller");

module.exports = function(app) {
	app.post('/sign_in',user.sign_in);
	app.post('/usersRegistration',user.usersRegistration);
	app.post('/verification',user.verification);
	app.post('/loginUserInfo',user.loginUserInfo);
	app.post('/createCategory',category.createCategory);
	app.post('/categoryList',auth.authentication,category.categoryList);
	app.post('/createProduct',product.createProduct);
	app.post('/updateProduct',product.updateProduct);
	app.post('/productList',product.productList);
	app.post('/assignProduct',product.assignProduct);
	app.post('/deleteProduct',product.deleteProduct);

}
