
const Core         = require('../model/core.model');//you can include all your lib
let core = new Core();

exports.createProduct = function(req, res) {


	var form = new formidable.IncomingForm();
 	form.parse(req, function(err, fields, files) {

 	let title = fields.title;
		let categoryId = fields.categoryId;
		let image = files.image;
		if(title==''){
			 res.json({'status':'fail','message':"Title is required"});
		     return;
		}
		if(categoryId==''){
			 res.json({'status':'fail','message':"category id is required"});
		     return;
		}
		if(image==''){
			 res.json({'status':'fail','message':"Image is required"});
		     return;
		}

		imageLib.fileUploads(image.path,'product').then(function(image) {

			core.getAll(constant.PRODUCT,{where : {"title" : title}}).then(function(rs) {
				 if(rs.length!=0){

	                    res.json({'status':'fail','message':'Product already exist'});
		                return;

	                }else{
	                	newData = {};
	                    newData['title'] = title,
	                    newData['image'] = image,
	                    newData['categoryId'] = categoryId,
	                    core.save(constant.PRODUCT,newData).then(function(save){
	                    	
	                    	res.json({'status':'success','message':'Product added successfully'});
		                	return;

	                    });
	                }

			});


		}).catch(function(error){

	        res.json({'status':'fail','message':'Something went wrong','data':error});
	        return;
	    });
	});

}

exports.productList = function(req, res) {

    var limit           = (req.body.limit) ? req.body.limit : 20;
    var page            = req.body.page;
    var categoryId      = req.body.categoryId;
    var orderBy      = req.body.orderBy;
    var search      = req.body.search;
    page           = (page) ? (page)*limit : 0;
    var data = {};
    data.limit = limit;
    data.offset = page;
    data.join  = 'category ON category.id = product.categoryId';
    data.join1  = 'productAssign ON productAssign.productId = product.id';
    data.join2  = 'users ON users.id = productAssign.userId';
    data.cols  = 'category.title as categoryName,product.title,product.id,product.categoryId,product.image,product.crd,users.name';

    if(orderBy){
    	data.where = {'categoryId' : categoryId};
    }

  	if(orderBy){
    	data['orderBy'] = 'product.crd '+orderBy;
    }

    if(search){

    	data['like'] = {'product.title' : search}

    }

    if(search){

    	data['or_like'] = {'category.title' : search,'users.name' : search};

    }

	base_url = req.protocol + '://'+req.headers['host']+'/uploads/category';
	
	core.getAll(constant.PRODUCT,data).then(function(rs) {
		if(rs.length){

			rs.forEach(category => {
            	category.image = base_url+'/'+category.image;
        	});

			res.json({'status':'success','message':'ok',data:rs});
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


exports.assignProduct = function(req, res) {


		let productId = req.body.productId;
		let userId = req.body.userId;
		if(productId==''){
			 res.json({'status':'fail','message':"Product id is required"});
		     return;
		}
		if(userId==''){
			 res.json({'status':'fail','message':"user id is required"});
		     return;
		}


		core.getAll(constant.PRODUCT_ASSIGN,{where : {"productId" : productId,'userId':userId}}).then(function(rs) {
			 if(rs.length!=0){

                    res.json({'status':'fail','message':'User already asign'});
	                return;

                }else{
                	newData = {};
                    newData['productId'] = productId,
                    newData['userId'] = userId,
                    core.save(constant.PRODUCT_ASSIGN,newData).then(function(save){
                    	
                    	res.json({'status':'success','message':'Product assign successfully'});
	                	return;

                    });
                }

		}).catch(function(error){

	        res.json({'status':'fail','message':'Something went wrong','data':error});
	        return;
	    });


}


exports.updateProduct = function(req, res) {


	var form = new formidable.IncomingForm();
 	form.parse(req, function(err, fields, files) {

 	let title = fields.title;
		let categoryId = fields.categoryId;
		let id = fields.id;
		let image = files.image;
		if(id==''){
			 res.json({'status':'fail','message':"id is required"});
		     return;
		}
		if(title==''){
			 res.json({'status':'fail','message':"Title is required"});
		     return;
		}
		if(categoryId==''){
			 res.json({'status':'fail','message':"category id is required"});
		     return;
		}

		if(typeof image !== 'undefined'){
			imageLib.fileUploads(image.path,'product').then(function(image) {

				core.getAll(constant.PRODUCT,{where : {"title" : title,'id != ' : id}}).then(function(rs) {
					 if(rs.length!=0){

		                    res.json({'status':'fail','message':'Product already exist'});
			                return;

		                }else{


		                	newData = {};
		                    newData['title'] = title,
		                    newData['image'] = image,
		                    newData['categoryId'] = categoryId;

		                	var where = {
		                        id : id,
		                    }
		                    core.updateData(constant.PRODUCT,newData,where).then(function(save){


		                    	res.json({'status':'success','message':'Product updated successfully'});
			                	return;

		                    });
		                }

				});

			});
		}else{

			core.getAll(constant.PRODUCT,{where : {"title" : title,'id != ' : id}}).then(function(rs) {
					 if(rs.length!=0){

		                    res.json({'status':'fail','message':'Product already exist'});
			                return;

		                }else{


		                	newData = {};
		                    newData['title'] = title,
		                    newData['categoryId'] = categoryId;
		                	var where = {
		                        id : id,
		                    }
		                    core.updateData(constant.PRODUCT,newData,where).then(function(save){
		                    	
		                    	res.json({'status':'success','message':'Product updated successfully'});
			                	return;

		                    });
		                }

				});

		}
	});

}



exports.deleteProduct = function(req, res) {


		let id = req.body.id;
		if(id==''){
			 res.json({'status':'fail','message':"id is required"});
		     return;
		}

		core.getAll(constant.PRODUCT,{where : {'id' : id}}).then(function(rs) {
			if(rs.length==0){

                res.json({'status':'fail','message':'Product not exist'});
	            return;

            }else{

            	var where = {
                    id : id,
                }
                 core.deleteData(constant.PRODUCT_ASSIGN,where).then(function(save){});
                core.deleteData(constant.PRODUCT,where).then(function(save){
                	
                	res.json({'status':'success','message':'Product deleted successfully'});
                	return;

                });
            }

		});

}