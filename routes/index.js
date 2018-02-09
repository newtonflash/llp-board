module.exports = (app, config) => {

    app.get("/", function(req, res){
        res.render('index');
    });
    app.get("/board/*", function(req, res){

        res.render('index');
    });
};