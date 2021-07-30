require('dotenv').config(); // this is important!

module.exports = {
"development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
},
"test": {
    "username": process.env.TO_FILL,
    "password": process.env.TO_FILL,
    "database": process.env.TO_FILL,
    "host": process.env.TO_FILL,
    "dialect": "mysql"
},
"production": {
    "username": process.env.TO_FILL,
    "password": process.env.TO_FILL,
    "database": process.env.TO_FILL,
    "host": process.env.TO_FILL,
    "dialect": process.env.TO_FILL,
}
};