import express from "express";
import experiment from "../database";

module.exports.set = function(app) {

    /*================SIMPLE AUTHENTICATION==============================================*/
    /*Simple static token based authentication system. Ensures that destructive endpoints can only be called by
    * authenticated users*/
    //Authentication
    app.post('/authenticate', function(req, res) {
        var db = req.db;
        var collection = db.get('userlist');
        collection.findOne({user: req.body.user, password: req.body.password},{}, function(e, user) {
            if (e) {
                res.json({
                    type: false,
                    data: "Error occured: " + e
                });
            } else {
                if (user) {
                    res.json({
                        type: true,
                        data: user,
                        token: "Bearer " + user.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect username/password"
                    });
                }
            }
        });
    });

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            var db = req.db;
            var collection = db.get('userlist');
            collection.findOne({token: bearerToken},{}, function(e, user) {
                if (e) {
                    res.sendStatus(401);
                } else {
                    if (user) {
                        next()
                    } else {
                        res.sendStatus(401);
                    }
                }
            });
        } else {
            res.sendStatus(403);
        }
    }


    /* ================================= ML API ===========================================*/
    /* All rest api endpoints, for gui and machine learning algorithm */

    //For experiments list in interface.
    app.get('/job', function (req, res) {
        var callback = function(err, docs) {
            res.json(docs);
        };
        experiment.getExperimentList(req.db, callback);
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

    //Delete a job via GUI.
    app.delete('/job/:id',ensureAuthorized, function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.remove({ _id : jobId },{},function(e,docs){
            res.send({msg: "Experiment " + jobId + " has been deleted"});
        });
    });


    //Interface endpoint. Stopping current running match. If no running match, no change.
    app.post('/job/:id/stop',ensureAuthorized, function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ _id : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                if(job.running === true) {
                    collection.update({'_id': jobId}, {$set: {running: false, result: req.body, date_stop: new Date()}});
                    res.send({msg: "Experiment has been stopped", running: false});
                }
                else {
                    if(req.body) {
                        collection.update({'_id': jobId}, {$set: {result: req.body}});
                    }
                    res.send({msg: "Experiment already stopped", running: false});
                }
            }
            else {
                res.send({msg: "Not found", running: false});
            }
        });
    });

    //GUI endpoint for comment
    app.post('/job/:id/comment',ensureAuthorized, function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ _id : jobId },{},function(e,docs){
            if(docs.length>0) {
                collection.update({'_id': jobId}, {$set: {comment: req.body.comment}});
                res.send({msg: "Comment updated", comment: req.body.comment});
            }
            else {
                res.send({msg: "Job not found"});
            }
        });
    });

    //setting the debug flag, which the system will retrieve at the next poll.
    app.post('/job/:id/debug',ensureAuthorized, function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ _id : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                collection.update({'_id': jobId}, {$set: {test: true}});
                res.send({msg: "Experiment is set in debug state", test: true});
            }
            else {
                res.send({msg: "Not found", running: false});
            }
        });
    });

    //Adding precision recall curve datapoints to database
    app.post('/job/:id/precision-recall-curve',ensureAuthorized, function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var datapoints = req.body;
        var collection = db.get('experimentlist');
        collection.find({ _id : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                collection.update({'_id': jobId}, {$set: {curve: datapoints}});
                res.send({msg: "Datapoints have been saved"});
            }
            else {
                res.send({msg: "Not found", running: false});
            }
        });
    });

    //Machine learning algo use this interface to send progress report. Data stored in db.
    app.post('/job/:id/update', ensureAuthorized, function (req, res) {
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
    app.post('/job/start',ensureAuthorized, function (req, res) {
        //TODO: Validation of body
        var db = req.db;
        var job = {running: true, test: false, date_start: new Date(), events: [], nr_events: 0, result: {}};
        if(req.body) {
            job.configuration = req.body;
        }
        
        var collection = db.get('experimentlist');
        collection.insert(job, function(err, result){
            res.send(
                (err === null) ? { id: result._id } : { msg: err }
            );
        });
    });


    //For interface. Returns running job. Called from front page.
    app.get('/current-job', function (req, res) {
        //TODO: Events or not, or the last ten events or something
        var callback = function(err, docs) {
            res.json(docs);
        };
        experiment.getRunningJobs(req.db, callback);
    });


    //For machine learning algo. Retrives the stop and test status of the running job. If user have pressed stop, this
    // will return a stop message.
    app.get('/job/:id/status', function (req, res) {
        var db = req.db;
        var jobId = req.params.id;
        var collection = db.get('experimentlist');
        collection.find({ '_id' : jobId },{},function(e,docs){
            if(docs.length>0) {
                var job = docs[0];
                if(job.running === true) {
                    var is_test = job.test;
                    if(is_test) {
                        //Maybe a bit brittle, but should do for now. Not stateless i guess. Ideally create new endpoint
                        //for server, and sets test to false.
                        collection.update({'_id': jobId}, {$set: {test: false}});
                    }
                    res.send({msg: "Experiment is running", running: true, test: is_test});
                }
                else {
                    res.send({msg: "Experiment is not running", running: false, test: false});
                }
            }
            else {
                res.json({msg: "Not found", running: false, test: false})
            }
        });
    });

};