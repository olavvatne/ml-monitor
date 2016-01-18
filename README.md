# ML-Monitor

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
* restart node (restart unuseful-app-1)

## New component
* REMEMBER "--save" when including new libraries
* First time cloning project, create style and js folder in the public folder

How to making a service taken from [here](https://gist.github.com/jobsamuel/6d6095d52228461f3c53), and includes the service script.
