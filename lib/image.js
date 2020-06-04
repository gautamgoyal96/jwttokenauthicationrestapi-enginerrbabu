var fs = require('fs');
var mv = require('mv');

exports.fileUploads = function(image,dir) {

    return new Promise((resolve, reject) => {
       var imageName = Date.now() + ".jpg";
        fs.mkdir('./public/uploads/'+dir, { recursive: true }, err => {
            var newpath = './public/uploads/'+dir+"/"+ imageName;
            if(image){
               fs.rename(image, newpath, function (err) {
       
                 if (err){
                       reject(err);
                    }else{
                        resolve(imageName);
                    }
                });
            }else{
                resolve('');
            }

        });
    });

    
}

