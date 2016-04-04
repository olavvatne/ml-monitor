# ML-Monitor

###Features
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

##Deploy 
* merge develop into master 
* login to server. 
* pull newest release or master. 
* run npm install commmand.
* If using master, building is necessary (npm run build)
* To run in production mode use command: NODE_ENV="production" PORT="80" npm run server.
* Create a service for production mode as follows:
* Go to /etc/init/
* $ sudo vim ml-monitor.conf
* $ sudo start ml-monitor

## New component
* REMEMBER "--save" when including new libraries
* First time cloning project, create style and js folder in the public folder

How to making a service taken from [here](https://gist.github.com/willrstern/3510ecef59c3f76b0152), and includes the service script.
