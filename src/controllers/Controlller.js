const controller ={}

controller.list=(req, res)=>{
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM Cryptocurrencies',(err, data)=>{
            if (err) {
                res.json(err);
                //next(err);
            } 
            res.render('index',{
                data: data
            })

        });


    });
    
};

module.exports = controller;