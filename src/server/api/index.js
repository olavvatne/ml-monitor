module.exports.set = function(app) {

    //For experiments list in interface.
    app.get('/job', function (req, res) {
        var tempExperiments = [
            {id: 1, date: "2015-2-2"},
            {id: 2, date: "2015-2-2"},
            {id: 3, date: "2015-2-2"},
        ];
        res.send(tempExperiments);
    });

    //Interface endpoint. Stopping current running match. If no running match, no change.
    app.post('/job/stop', function (req, res) {

        res.send({a: 1});
    });

    //Machine learning algo use this interface to send progress report. Data stored in db.
    app.post('/job/update', function (req, res) {

        res.send({a: 1});
    });

    //Machine learning algo need to start a new job first. Returns a job id.
    app.post('/job/start', function (req, res) {

        res.send({a: 1});
    });

    //For interface. Returns running job. Called from front page.
    app.get('/job/running', function (req, res) {
        var tempData = {id: 3, date: "2015-2-2"}
        res.send(tempData);
    });

    //For machine learning algo. Retrives the stop status of the running job. If user have pressed stop, this will return
    //a stop message.
    app.get('/job/stopstatus', function (req, res) {
        var tempData = {id: 3, date: "2015-2-2"}
        res.send(tempData);
    });

};