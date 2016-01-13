module.exports.set = function(app) {

    //For experiments list in interface.
    app.get('/job', function (req, res) {
        var db = req.db;
        var collection = db.get('experimentlist');
        //Events is excluded, because of potensial size in such a listing.
        collection.find({},{fields: {events: 0}},function(e,docs){
            res.json(docs);
        });
    });

    //Get overview of specific job.
    app.get('/job/:id', function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ _id : jobId },{},function(e,docs){
            res.json(docs);
        });
    });


    //Interface endpoint. Stopping current running match. If no running match, no change.
    app.post('/job/:id/stop', function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ _id : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                if(job.running === true) {
                    collection.update({'_id': jobId}, {$set: {running: false, date_stop: new Date()}});
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
    app.post('/job/:id/update', function (req, res) {
        //TODO: Validation of body
        var db = req.db;
        var jobId = req.params.id;
        req.body.date_recorded = new Date();
        var collection = db.get('experimentlist');
        collection.update({_id: jobId}, {$push:{events: req.body}, $inc: {nr_events: 1}}, function(err, result) {
            if(!err) {
                res.send({msg: "Added event"});
            }
            else {
                res.send({msg: "Could not add the event"});
            }
        });

    });


    //Machine learning algo need to start a new job first. Returns a job id.
    app.post('/job/start', function (req, res) {
        //TODO: Validation of body
        var db = req.db;
        req.body.running = true;
        req.body.date_start = new Date();
        req.body.events = [];
        req.body.nr_events = 0;
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