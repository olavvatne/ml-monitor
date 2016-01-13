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
        let content = React.renderToString(<Frontpage />);
        var environment = getEnvironment();
        var templateData = {
            title: Frontpage.title,
            toolMetaDescription: Frontpage.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "FrontpageClient",
            environment: environment.environment
        };
        res.render('pages/default-page', templateData);
    });

    app.get('/experiments', function(req, res) {
        let content = React.renderToString(<Experiments />);
        var environment = getEnvironment();
        var templateData = {
            title: Experiments.title,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "ExperimentsClient",
            environment: environment.environment
        };
        res.render('pages/default-page', templateData);
    });

// ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
    });
};