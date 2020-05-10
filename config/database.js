/*
 |--------------------------------------------------------------------------
 | Database Connections
 |--------------------------------------------------------------------------
 |
 | Here are each of the database connections setup for your application.
 | Of course, examples of configuring each database platform that is
 | supported by NodeJS is shown below to make development simple.
 |
 */
    //untuk membaca file .env
    require('dotenv').config()
    
    module.exports = {
        dev: {
            url: process.env.URL_DATABASE_DEV,
            ssl: false
        },
        qa: {
            url: '',
            ssl: false
        },
        prod: {
            url: '',
            ssl: false
        }
    }