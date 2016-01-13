/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";
import Experiments from "../../shared/components/Experiments";
import Frontpage from "../../shared/components/Frontpage";


module.exports.set = function(app) {

    var getEnvironment = function() {
        if(app.get('env') === 'development') {
            return {scriptPath: 'http://localhost:8080',
                    environment: 'development'
            };
        }
        return {scriptPath: '',
                environment: 'production'
        };
    };

    app.get('/', function (req, res) {
        //TODO: Duplicate code, can possibly use callback functions for these two, to reduce duplicate code.
        var db = req.db;
        var collection = db.get('experimentlist');
        collection.find({ running : {$eq: true}},{fields: {events: {$slice: -10}}},function(e,docs){
            let initData = JSON.stringify(docs);
            let content = React.renderToString(<Frontpage data={initData}  />);
            var environment = getEnvironment();
            var templateData = {
                title: Frontpage.title,
                toolMetaDescription: Frontpage.toolMetaDescription,
                reactContent: content,
                reactEntryPath: environment.scriptPath,
                reactScript: "FrontpageClient",
                environment: environment.environment,
                data:initData
            };
            res.render('pages/default-page', templateData);
        });
    });

    app.get('/experiments', function(req, res) {
        //TODO: Duplicate code, but React need this data here. Implement common function and promises to get this working
        var db = req.db;
        var collection = db.get('experimentlist');
        //Events is excluded, because of potensial size in such a listing.
        collection.find({},{fields: {events: 0}},function(e,docs){
            let initData = JSON.stringify(docs);
            let content = React.renderToString(<Experiments data={initData} />);
            var environment = getEnvironment();
            var templateData = {
                title: Experiments.title,
                reactContent: content,
                reactEntryPath: environment.scriptPath,
                reactScript: "ExperimentsClient",
                environment: environment.environment,
                data:initData
            };
            res.render('pages/default-page', templateData);
        });

    });

// ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
    });
};