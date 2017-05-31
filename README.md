# DAT255-Lag1

In this repository you can find documents and code created by the team SiljaLine during the course DAT255 in the spring of 2017.
The main project in the course has been to create an application which makes it easier for terminals in harbours to use PortCDM (for more info about PortCDM visit http://stmvalidation.eu/stm-validation/#!activity-item/activity-1-port-collaborative-decision-making). 

The web application is running at: https://siljaline.herokuapp.com/. The app is running using free dynos from Heroku. You might therefore experience speed issues. However if the site is down (due to e.g. an application error) or if you are experiencing any other issue, please contact one of the developers at: mark.henriksson123@gmail.com. If you wish to run the application on you local machine, please follow the guide below. For more information regarding the web application, see the document Reflektionsrapport. 

The project has followed Scrum methodology, and Trello was used as a scrum board. To see the product and sprint backlogs please follow this link: https://trello.com/dat2551. More information about how Scrum was used during the project can be found in the document Reflektionsrapport.

In the course it was also requested that the code for the application was checked with FindBugs. This was not possible for the application in this repository, since JavaScript was chosen as programming language, which FindBugs does not cover. Instead JSLint was used for controlling the code quality. For more information see the section about testing in the document Reflektionsrapport. 

Guide: How to run the web application locally

1. First of all you need to have nodeJS, npm, expressJS and nodemon installed. Download NodeJS from this link (npm is included in the download):
https://nodejs.org/en/

To make sure the installation went through type the following in your terminal
node --version
npm --version

Which should give you an ouput that looks something like
v5.0.0
3.5.2

Therafter run the following commands
npm install --save express
npm install -g nodemon

2. The second step is to set up the database. In this application MongoDB is used. Download the correct version of MongoDB for your operating system from the Community Server from the following link:
https://www.mongodb.com/download-center?jmp=nav 
Start the database by navigating into the "bin" folder in your downloaded MongoDB and run the command
mongod

(It might complain about not finding a place to store the data, since MongoDB comes prepared to store data in a folder at c:/data/db. If you don´t have a folder like that you can just create one and it should be fine. If you need more help regarding installing and starting MongoDB this video guide describes the process in detail: https://www.youtube.com/watch?v=3fj9sx7UXfE&index=14&list=PL55RiY5tL51oGJorjEgl6NVeDbx_fO5jR )


3. Now you can download or clone this repository from GitHub.


4. When you have this repository on your computer and the database is running in one terminal, open a new terminal and navigate into the “app” folder from this repository. Thereafter type the command
nodemon app
This should start the application

5. Open your browser and go to
http://localhost:3000/
The application should now be visible. For more information about the application and its functions, read the document Reflektionsrapport.

6. Enjoy!
