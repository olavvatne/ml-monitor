module.exports.set = function(app) {

    //For experiments list in interface.
    app.get('/job', function (req, res) {
        var db = req.db;
        var collection = db.get('experimentlist');
        collection.find({},{},function(e,docs){
            res.json(docs);
        });
    });

    app.get('/job/:id', function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ '_id' : jobId },{},function(e,docs){
            res.json(docs);
        });
    });

    //Interface endpoint. Stopping current running match. If no running match, no change.
    app.post('/job/:id/stop', function (req, res) {
        console.log("STOPPING");
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ '_id' : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                if(job.running === true) {
                    //collection.update({'_id': jobId}, {$set: {running: false}});
                    res.send({msg: "Experiment has been stopped", running: false});
                }
                else {
                    res.send({msg: "Experiment already stopped", running: false});
                }
            }
            else {
                res.json({msg: "Not found", running: false})
            }
        });
    });

    //Machine learning algo use this interface to send progress report. Data stored in db.
    app.post('/job/update', function (req, res) {

        res.send({a: 1});
    });

    //Machine learning algo need to start a new job first. Returns a job id.
    app.post('/job/start', function (req, res) {
        //TODO: Validation of body
        var db = req.db;
        req.body.running = true;
        var collection = db.get('experimentlist');
        collection.insert(req.body, function(err, result){
            res.send(
                (err === null) ? { id: result._id } : { msg: err }
            );
        });
    });

    //For interface. Returns running job. Called from front page.
    app.get('/job/running', function (req, res) {
        var tempData = {id: 3, date: "2015-2-2"};
        res.send(tempData);
    });

    //For machine learning algo. Retrives the stop status of the running job. If user have pressed stop, this will return
    //a stop message.
    app.get('/job/:id/status', function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ '_id' : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                if(job.running === true) {
                    res.send({msg: "Experiment is running", running: true});
                }
                else {
                    res.send({msg: "Experiment is not running", running: false});
                }
            }
            else {
                res.json({msg: "Not found", running: false})
            }
        });
    });

};