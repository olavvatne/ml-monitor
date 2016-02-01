/**
 * Created by olav on 01.02.16.
 */

//made mostly to avoid duplicate code between controller and api.
var experiment = {
    getRunningJobs: function(db, callback) {
        var collection = db.get('experimentlist');
        collection.find({ running : {$eq: true}},{}, callback);
    },

    getExperimentList: function(db, callback) {
        var collection = db.get('experimentlist');
        //Events is excluded, because of potential size in such a listing.
        collection.find({},{fields: {events: 0 , configuration: 0, curve: 0} , sort: [['date_start', 'asc']]}, callback);
    }
};

export default experiment;