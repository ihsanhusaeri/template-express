    /*
    |--------------------------------------------------------------------------
    | Global APP Init
    |--------------------------------------------------------------------------
    */
   global._directory_base = __dirname;
   global.config = {};
   config.app = require('./config/app.js');
   config.database = require('./config/database.js')[config.app.env];
   require('dotenv').config()

   /*
   |--------------------------------------------------------------------------
   | APP Setup
   |--------------------------------------------------------------------------
   */
   //Node Modules 
   const bodyParser = require('body-parser');
   const express = require('express');
   const app = express();
   const mongoose = require('mongoose');
   const fileupload = require('express-fileupload');

   /*
   |--------------------------------------------------------------------------
   | APP Init
   |--------------------------------------------------------------------------
   */
   // Parse request of content-type - application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({extended: false}));

   // Parse request of content-type - application/json
   app.use(bodyParser.json());
   
   //enable upload file
   app.use(fileupload())

   // Setup Database
   mongoose.Promise = global.Promise;
   mongoose.connect(config.database.url, {
       useUnifiedTopology: true,
       useNewUrlParser: true,
       useFindAndModify: true,
       ssl: config.database.ssl
   }).then(() => {
       console.log("Database :");
       console.log("\tStatus \t\t: Connected");
       console.log("\tMongoDB URL \t: " + config.database.url + " (" + config.app.env + ")");
   }).catch(err => {
       console.log("Database :");
       console.log("\tDatabase Status : Not Connected");
       console.log("\tMongoDB URL \t: " + config.database.url + " (" + config.app.env + ")");
   });

   /*
   |--------------------------------------------------------------------------
   | Swagger documentation 
   |--------------------------------------------------------------------------
   */
   const swaggerJsDoc = require('./swagger.json');
   const swaggerUI = require('swagger-ui-express');
   
   app.use("/patroliapidev/pat-msa-dev-patroli/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

   /*
   |--------------------------------------------------------------------------
   | Routing
   |--------------------------------------------------------------------------
   */
   require( './routes/api.js' )( app );

    //Server Running Message
    let server = app.listen(parseInt(config.app.port[config.app.env]), () => {
       console.log('Server listening')
       console.log("\tStatus \t\t: OK");
       console.log( "\tService \t: " + config.app.name + " (" + config.app.env + ")" );
       console.log( "\tPort \t\t: " + config.app.port[config.app.env] );
   });
