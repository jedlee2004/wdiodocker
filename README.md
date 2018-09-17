# WebdriverIO E2E Automation

Starting point for a webdriverIO automation framework. 

## Dependencies
- Require Node.js installed on your machine to run this automation framework
- Require JDK to run selenium standalone
- Please download and install from here if not already done https://nodejs.org/en/ 
- Please make sure to install Chrome browser if not already done https://www.google.com/chrome/ 

## Setup
- Make sure terminal is at {root} of automation directory 
 - ```npm install```
 - ```npm run e2e-setup```

## Config file
Please create a env.js that outlines the different environments you are using. These can then be set via the command line by calling --env=desiredEnv. Refer to the sampleTests env.js file. 

## Running via command line
- Since all npm scripts will leverage this basic command I will explain its structure:
  - Part 1: calling the cli module: ```node_modules/.bin/wdio``` 
  - Part 2: passing config file as arg: ```node_modules/.bin/wdio sampleTests/wdio.conf.js```
  - Part 3: specify test spec file: ```node_modules/.bin/wdio sampleTests/wdio.conf.js --spec specs/table.spec.js```
  - Part 4: specify test suite: ```node_modules/.bin/wdio sampleTests/wdio.conf.js --suite smoke```

- Custom cli args can be handled. Currently --env, --browser, --e_username, --e_password, --report or --allure 
  - Environment arg --env options: local, dev, sit, stg, pre
  - Browser arg --browser: chrome, safari, firefox, headless 
  - Report arg --report: open
  - Example using these: ```node_modules/.bin/wdio sampleTests/wdio.conf.js --suite smoke --env=dev --browser=headless --report=open```
    
## Helpers
In the UI folder there are constants such as user and pass along with timeouts and an element helper which has generic methods to interface with the page. 
These generic methods include:
- Interface to retrieve options from a drop list and select
- Build object representing a table to get data and also interface with different rows/columns
- Retrieve warning messages, error messages and labels
- Set radio buttons, checkboxes and input fields 

## Utility 
This folder contains functions that assist with tasks unrelated to the UI or API but assist in data generation, parsing data from objects and more. 

Command Line Args: In the utils folder there is a file called commandConfig.js. This class can be modified to process different args that you want to pass to the automation framework via the command line. 

## Page Objects 
Contains files that represent the pages of the web application built in es6 Class objects. These classes will contain both the selectors that give interface to the page and the methods that build open the interface of the page. Every class should extend the helper object element.helpers.js. 

## Specs 
The location where the tests files are placed. 

## Debugging via Visual Studio code
Add a section to the launch.json. Note you will have to provide proper paths to the wdio config file.
The arg  "${workspaceRoot}/${relativeFile}" will allow debugging to run the currently open spec file. Note must be where focus is. 
The arg  "--env=local", can be changed to which ever the desired environment you want to run automation against. 
```
        {
            "type": "node",
            "request": "launch",
            "port": 5859,
            "protocol": "inspector",
            "name": "WebdriverIO",
            "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/wdio",
            "timeout": 100000,        
            "cwd": "${workspaceRoot}",
            "console": "integratedTerminal",
            "args": [
                "",
                "./sampleTests/wdio.conf.js",
                "--spec",
                "${workspaceRoot}/${relativeFile}",
                "--env=local",
            ],
            "env": {
                "NODE_PATH": ".",
                "NODE_ENV": "local"
            }
        },
```
## To run e2e automation within docker container
https://medium.com/@nagarwal/lifecycle-of-docker-container-d2da9f85959 

1. Building the image: run from dir containing Dockerfile and set tag with -t "name"
- ```docker build -t  "wdio" ./```
2. Running the image:
- ```docker run -it -p 5920:5920 -e VNC_SERVER_PASSWORD=pass1234 --user developer --name --rm WDIO --privileged wdio```
3. Running Automation Once Image is running:
- ```docker exec -ti WDIO node_modules/.bin/wdio sampleTests/wdio.conf.js --suite {DesiredSuiteToRun} --env={dev|sit|stg|pre} --browser={chrome|headless}```
4. The run command is for new images. Once the image has been ran once only have to utilize start and stop commands:
- Starting a stopped container: ```docker start WDIO```
- Stopping the image: ```docker stop WDIO```
- Viewing running images: ```docker ps -a```
- Removing images: ```docker rmi WDIO```
- Removing container: ```docker rm WDIO```