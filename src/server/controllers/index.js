/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";
import Experiments from "../../shared/components/Experiments";
import Frontpage from "../../shared/components/Frontpage";
import SignIn from "../../shared/components/SignIn";
import experiment from "../database"

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
        var callback = function(err, docs) {
            let initData = JSON.stringify(docs);
            let content = React.renderToString(<Frontpage data={initData}  />);
            let signIn = React.renderToString(<SignIn />);
            var environment = getEnvironment();
            var templateData = {
                title: Frontpage.title,
                toolMetaDescription: Frontpage.toolMetaDescription,
                reactContent: content,
                reactSignIn: signIn,
                reactEntryPath: environment.scriptPath,
                reactScript: "FrontpageClient",
                environment: environment.environment,
                data:initData
            };
            res.render('pages/default-page', templateData);
        }
        experiment.getRunningJobs(req.db, callback);
    });

    app.get('/experiments', function(req, res) {
        var callback = function(e,docs){
            docs = docs.reverse();
            let initData = JSON.stringify(docs);
            let content = React.renderToString(<Experiments data={initData} />);
            let signIn = React.renderToString(<SignIn />);
            var environment = getEnvironment();
            var templateData = {
                title: Experiments.title,
                reactContent: content,
                reactSignIn: signIn,
                reactEntryPath: environment.scriptPath,
                reactScript: "ExperimentsClient",
                environment: environment.environment,
                data:initData
            };
            res.render('pages/default-page', templateData);
        };
        experiment.getGroupList(req.db, callback);
    });

// ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
    });
};