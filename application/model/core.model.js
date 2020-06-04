class Core {


    updateData(table,set,where) {

        return new Promise((resolve, reject) => {

            query.update(table,set,where, (err, data) => {
                
                if (err){
                   reject(err);
                }else{
                    resolve(data);
                }
               
            });
        });
       
    }


    deleteData(table,newData) {

        return new Promise((resolve, reject) => {

            query.delete(table, newData, (err, data) => {
               
                if (err){
                   reject(err);
                }else{
                    resolve(data);
                }
               
            });
        });
       
    }

    save(table,newData) {

        return new Promise((resolve, reject) => {

            query.returning('id').insert(table, newData, (err, data) => {
                
                if (err){
                   reject(err);
                }else{
                    resolve(data);
                }
               
            });
        });
       
    }

   getAll(table,data) {

        return new Promise((resolve, reject) => {
            (data.cols) ? query.select(data.cols) : query.select('*');
            (data.whereNotIn) ? query.where_not_in(data.whereNotIn.key,data.whereNotIn.value) : '';
            (data.whereIn) ? query.where_in(data.whereIn.key,data.whereIn.value) : '';
            (data.where) ? query.where(data.where) : '';
            (data.orWhere) ? query.or_where(data.orWhere) : '';
            (data.like) ? query.like(data.like) : '';
            (data.or_like) ? query.or_like(data.or_like) : '';
            (data.join) ? query.join(data.join) : '';
            (data.join1) ? query.join(data.join1) : '';
            (data.join2) ? query.join(data.join2) : '';
            (data.join3) ? query.join(data.join3) : '';
            (data.join4) ? query.join(data.join4) : '';
             (data.join5) ? query.join(data.join5) : '';
            (data.limit) ? query.limit(data.limit) : '';
            (data.offset) ? query.offset(data.offset) : '';
            (data.orderBy) ? query.order_by(data.orderBy) : '';
            (data.group_by) ? query.group_by([data.group_by]) : '';

            query.get(table, (err, result) => {

                if (err){

                   reject(err);

                }else{

                    resolve(result);
                    
                }

            });
        });
       
    }
}

module.exports = Core;