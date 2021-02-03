<h1 align="center">Ticketing - Backend</h1>
<p align="center">
  <img width="250" src="./screenshots/logo.png"/>
</p>


Ticketing-Backend is a backend for Ticketing application. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express-4.17.1-brightgreen)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node%20Js-14.15.4-orange)](https://nodejs.org/)
[![Sequelize ORM](https://img.shields.io/badge/Sequelize-6.0.0-red)](https://sequelize.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://www.getpostman.com/">Postman</a>
3. [Xampp](https://www.apachefriends.org/download.html)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type 
```npm install```
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Apache and MYSQL Server using xampp, etc.
5. Create a database with the name **ticket** then  set config file [here](#set-config) in directory src/config/config.json
6. migration table with sequelize [here](#table-migratiton)
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.
8. You can see all the end point [here](#api-request-example)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_PORT= 3000

BASE_URL = [Backend Deploy]
SECRET_KEY = 

EMAIL = 
PW_EMAIL =

```

### set config
```
src/config/config.json
on development
    
"username": "your username",
"password": "your password",
"database": "name databases",
"host": "127.0.0.1",
"dialect": "mysql"

```

### table migratiton
```
before doing the migration, please create a database in your local

cd src
Sequelize db:migrate

```

### fix problem Sequelize cannot run
```
npm install --save sequelize
npm install --save-dev sequelize-cli
```

### Compiles and hot-reloads for development
```
npm run dev
```

## API Request Example 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/556c822939f1ffc48b2c)


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
* [`Frontend Ticketing`](https://github.com/maulanarifai114/frontend-ankasa)

## Contributors
<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/hanifkumara">
          <img width="150" src="https://avatars.githubusercontent.com/u/55839592?s=400&u=b57fbcb21416c0d12f287ddea5eb5132ad9a293c&v=4" alt="Hanif Kumara"><br/>
          <b>Hanif Kumara</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/FendiAnwarRifai">
          <img width="150" src="https://avatars0.githubusercontent.com/u/73191453?s=400&u=b47808a771d90a7fc302b683e46cf34cde16ab88&v=4" alt="Fendi Anwar Rifa'i"><br/>
          <b>Fendi Anwar Rifa'i</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/maulanarifai114">
          <img width="150" src="https://avatars2.githubusercontent.com/u/72542280?s=400&u=09207f92a439d660f07bb376109fb02b82de500c&v=4" alt="Raden Maulana Rifa'i Abdullah"><br/>
          <b>Raden Maulana Rifa'i Abdullah</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/sintaanggunpuspita">
          <img width="150" src="https://avatars.githubusercontent.com/u/64903162?s=400&u=57a02bcb7e886e7cf8da30c8775b0b5501da42cb&v=4" alt="Sinta Anggun Puspita"><br/>
          <b>Sinta Anggun Puspita</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/slucter">
          <img width="150" src="https://avatars.githubusercontent.com/u/61655908?s=400&u=1e1c0b55b30cf502f264038f39609fd6dc8636b8&v=4" alt="Muhamad Irhashdianto"><br/>
          <b>Muhamad Irhashdianto</b>
        </a>
      </td>
    </tr>
  </table>
</center>

---
Copyright © 2020 [Fendi Anwar Rifa'i](https://github.com/FendiAnwarRifai)