/**
 * Created by Olav on 10/2/2015.
 */
import React from "react";
import LoremIpsum from "../../shared/components/LoremIpsum";


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
    }

    app.get('/', function (req, res) {

        var templateData = {
            tools: [
                {url: "/lorem-ipsum", image: "images/lorumipsum.svg", title: "Lorem ipsum"}
            ],
            environment: getEnvironment().environment
        };
        res.render('pages/home', templateData);
    });

    app.get('/experiments', function(req, res) {
        let content = React.renderToString(<LoremIpsum />);
        var environment = getEnvironment();
        var templateData = {
            toolTitle: LoremIpsum.toolTitle,
            toolMetaDescription: LoremIpsum.toolMetaDescription,
            reactContent: content,
            reactEntryPath: environment.scriptPath,
            reactScript: "LoremIpsumClient",
            environment: environment.environment
        };
        res.render('pages/special-tool', templateData);
    });

    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function(req, res, next){
        res.status(404).render('pages/404', {title: "Page not found", environment: getEnvironment().environment });
    });
}