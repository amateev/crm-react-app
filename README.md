
FIRST LET'S BUILD THE BACK END

1. npm init -y

make a package.json

2. npm install express body-parser mongojs

3. make a .gitignore

put in node_modules and .DS_Store

4. make a server.js file

5. put in all the require stuff

6. make it listen on a port, we chose 3001 because react is going to default be on 3000 and it's super easy for us to just change the number 3000 to 3001 to avoid conflicts

7. we make our api to talk to our mongo database called pets_db in server.js


NOW WE BUILD OUR FRONT END

8. we run this command in the directory where our server.js file is in 

create-react-app client

9. we go into the client folder and run this command

yarn install

note: npm install would also work, but is much slower than yarn

yarn is another package manager like npm - it's newer, shinier, and it is faster

10. while in the client folder

run this

yarn start

note: this will start up the react app and open up localhost:3000 in the browser

note: you can also do npm start

11. keep in mind that we need both the back end (server.js) running and also the react app running (the client folder)

because server.js is the only one that is allowed to talk to our database

the client folder (our react app) has no ability to directly connect to our database

our client folder (react app) needs to speak to our server.js file to be able to indirectly connect to our database - because a direct connection is not possible

















