# ML-Monitor

##Features
* Frontpage displays the currently running experiments.
* Experiment page - List of all previous experiments.
* Group experiments in categories.
* Button for stop a running experiment. 
* Button for debug a running experiment. (ML system displays a random assortment of model predictions)
* Loss figure
* Precision and validation curve
* Stores all hyperparameters and result from an experiment.
* Display of all hyperparameters in tables. Tables are auto generated from JSON key/value pairs
* Simple token based authentication, for securing certain API calls (Remove, stop, etc)
* API for starting a new experiment, sending updates, checking stop and debugging status,  etc. Hooks used by ML system.

##Installation - Ubuntu
* Clone ml-monitor repository
```bash
$git clone https://github.com/olavvatne/ml-monitor.git
```
* Install node.js on your system:
```bash
$sudo apt-get update
$sudo apt-get install nodejs
```
* Install npm package manager:
```bash
$sudo apt-get install npm
```
* Install [MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).
* Navigate to ml-monitor, and install dependencies:
```bash
$npm install
```
* Before running ml-monitor, some collections and a user have to be created in Mongo shell:
```bash
$export LC_ALL=C (Optional. Might be necessary)
$mongo
```
* Inside the Mongo environment, first create a new database:
```bash
>use ml-monitor
```
* Then create the collections required by ml-monitor:
```bash
>db.createCollection('experimentlist')
>db.createCollection('userlist')
> db.createCollection('grouplist')
```

* Create a user. The authentication system is very simple, so remember to create a long random string of characters as token:
```bash
>db.userlist.insert({"user": "ola", "password": "password", "token": "Long-random-string-of-your-choice"})
```

* Finally, insert the default group, that new experiments are assigned:
```bash
>db.grouplist.insert({"name": "unassigned", "gid": "0", "date_created": new Date()})
```

* To start the system, run:
```bash
>npm run start
```
* The user token is should also be used when the machine learning system interact with the api. In the header of HTTP requests remember to insert "Bearer " + usertoken under Authorization.

##Deploy 
* Merge develop into master 
* Login to server. 
* Pull newest release or master. 
* Run npm install commmand.
* If using master and not prebuild release, building is necessary (npm run build)
* To run in production mode use command: NODE_ENV="production" PORT="80" npm run server.
* Create a service for production mode by doing the following:
* Go to /etc/init/
* $ sudo vim ml-monitor.conf
* $ sudo start ml-monitor

## New component
* REMEMBER "--save" when including new libraries
* First time cloning project, create style and js folder in the public folder

How to making a service taken from [here](https://gist.github.com/willrstern/3510ecef59c3f76b0152), and includes the service script.
