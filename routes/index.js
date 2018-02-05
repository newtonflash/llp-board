module.exports = (app, config) => {

    app.get("*", function(req, res){
        res.render('index');
    });
};