module.exports = (app, config) => {

    app.get("/", function(req, res){
        res.render('index');
    });
    app.get("/boards/*", function(req, res){
        res.render('index');
    });
};