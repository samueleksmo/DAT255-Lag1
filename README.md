# DAT255-Lag1

In this repository you can find documents and code created by the team SiljaLine during the course DAT255 in the spring of 2017.
The main project in the course has been to create an application which makes it easier for terminals in harbours to use PortCDM (for more info about PortCDM visit http://stmvalidation.eu/stm-validation/#!activity-item/activity-1-port-collaborative-decision-making). Below you can find a guide on how to start the web application.

The project has followed Scrum methodology, and Trello was used as a scrum board. To see the product and sprint backlogs please follow this link:
https://trello.com/dat2551 (OBS PRODUCT BACKLOG SAKNAS). More information about how Scrum was used during the project can be found in the document Reflektionsrapport.



GUIDE: HOW TO START THE WEB APPLICATION

1.First of all you need to have nodeJs, npm and expressJS installed. Download NodeJs from this link:
https://nodejs.org/en/
Thereafter, follow this guide: 
https://www.tutorialspoint.com/expressjs/expressjs_environment.htm 
You only need to do the steps described in the page that is linked, where the last command is 
npm install -g nodemon

2.The second step is to set up the database. In this application MongoDB is used. Download the correct version of MongoDB for your operating system from the Community Server from the following link:
https://www.mongodb.com/download-center?jmp=nav 
Start the database by navigating into the "bin" folder in your downloaded MongoDB and run the command
mongod

(If you need more help regarding installing and starting MongoDB this video guide describes the process in detail:https://www.youtube.com/watch?v=3fj9sx7UXfE&index=14&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR )


3.Now you can download or clone this repository from GitHub.


4.When you have this repository on your computer and the database is running, navigate into the “app” folder with the command line. Thereafter type
nodemon app
This should start the application

5.Open your browser and go to
http://localhost:3000/
The application should now be visible. For more information about the application and its functions, read the document Reflektionsrapport.

6.Enjoy!
