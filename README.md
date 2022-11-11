# Family Media
a JavaScript and Node framework web application, that provided a clean UX for family media libraries

### Built
* JavaScript
* NodeJS

## Getting Started
### Prerequisite
Heroku was used to host database

### Installation
1. Clone repo
```
https://github.com/edgarefigueroa/bp-fcproject
```
2. Run npm install to get the project’s dependencies installed.

3. Dotenv: For server files to work, is going to need dotenv.

* Install ‘dotenv’ using npm install dotenv

* Create a file in the root of the directory called .env

* In that file, create a SERVER_PORT variable and set it to 4004 (it needs to be this number or the front end won’t work)

* Additionally, create a CONNECTION_STRING variable and set it to your URI from Heroku 

3. Sequelize
* Install Sequelize and its dependencies using npm install sequelize pg pg-hstore

4. Seeding the Database
* Start up your backend with nodemon (make sure you’re in the right directory)

* Open Postman and make a POST request to http://localhost:4004/seed.

* Your database should now be seeded!


CAUTION: IF YOU PUSH THIS TO GITHUB, YOUR CREDENTIALS WILL BE AVAILABLE PUBLICLY AND ANYONE WOULD BE ABLE TO ACCESS THIS DATABASE. BE SURE TO ADD THE .env FILE TO THE .gitignore SO THAT YOU DO NOT LEAK YOUR CREDENTIALS.

## Project Usage
- Create/Delete Media Cards