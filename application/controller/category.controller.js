
const Core         = require('../model/core.model');//you can include all your lib
let core = new Core();

exports.createCategory = function(req, res) {


	 var form = new formidable.IncomingForm();
 	form.parse(req, function(err, fields, files) {

 	let title = fields.title;
	let image = files.image;
	if(title==''){
		 res.json({'status':'fail','message':"Title is required"});
	     return;
	}
	if(image==''){
		 res.json({'status':'fail','message':"Image is required"});
	     return;
	}

	imageLib.fileUploads(image.path,'category').then(function(image) {

		core.getAll(constant.CATEGORY,{where : {"title" : title}}).then(function(rs) {
			 if(rs.length!=0){

                    res.json({'status':'fail','message':'Category already exist'});
	                return;

                }else{
                	newData = {};
                    newData['title'] = title,
                    newData['image'] = image,
                    core.save(constant.CATEGORY,newData).then(function(save){
                    	
                    	res.json({'status':'success','message':'Category added successfully'});
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

exports.categoryList = function(req, res) {

    var limit           = (req.body.limit) ? req.body.limit : 20;
    var page            = req.body.page;
    page           = (page) ? (page)*limit : 0;
    var data = {};
    data.limit = limit;
    data.offset = page;

	base_url = req.protocol + '://'+req.headers['host']+'/uploads/category';
	
	core.getAll(constant.CATEGORY,data).then(function(rs) {
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