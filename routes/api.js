/*
 |--------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------
 */

    //Controllers
    const Controllers = {
        v_1_0: {
            Auth: require(_directory_base + '/app/v1.0/controllers/Auth.js'),
            Employee: require(_directory_base + '/app/v1.0/controllers/Employee.js'),
            Estate: require(_directory_base + '/app/v1.0/controllers/Estate.js'),
            CheckPoint: require(_directory_base + '/app/v1.0/controllers/CheckPoint.js'),
            Tracking: require(_directory_base + '/app/v1.0/controllers/Tracking.js'),
            Server: require(_directory_base + '/app/v1.0/controllers/Server.js'),
            SyncMobile: require(_directory_base + '/app/v1.0/controllers/SyncMobile.js'),
            TitikApi: require(_directory_base + '/app/v1.0/controllers/TitikApi.js'),
            TitikPanas: require(_directory_base + '/app/v1.0/controllers/TitikPanas.js')
        }
    }
    const VerifyToken =  require(_directory_base + '/app/v1.0/libraries/VerifyToken.js')
    module.exports = ( app ) => {

        /*
        |--------------------------------------------------------------------------
        | Welcome Message
        |--------------------------------------------------------------------------
        */
            app.get( '/', ( req, res ) => {
                return res.json( { 
                    application: {
                        name : 'Microservice Patroli',
                        env : config.app.env,
                        port : config.app.port[config.app.env]
                    } 
                } )
            } );
        /*
        |--------------------------------------------------------------------------
        | Versi 1.0 API WEB Patroli
        |--------------------------------------------------------------------------
        */
        
        //API untuk login web patroli api
        app.post('/api/v1.0/web/login', Controllers.v_1_0.Auth.loginWeb);
        //API untuk membuat admin/authorized user
        app.put('/api/v1.0/web/employee/:nik', VerifyToken, Controllers.v_1_0.Employee.createUpdate);
        //API untuk get satu employee
        // app.get('/api/v1.0/web/employee/:nik', VerifyToken, Controllers.v_1_0.Employee.getEmployeeWeb);
        //API untuk get suggest employee
        app.get('/api/v1.0/web/employee/suggest/:keyword', VerifyToken, Controllers.v_1_0.Employee.getEmployeeSuggestWeb);
        //API untuk get employees per page 15 data
        app.get('/api/v1.0/web/employees/:page', VerifyToken, Controllers.v_1_0.Employee.getEmployees);
        //API untuk get all employees
        app.get('/api/v1.0/web/employee', VerifyToken, Controllers.v_1_0.Employee.getAllEmployees);
        app.get('/api/v1.0/web/ba', VerifyToken, Controllers.v_1_0.Estate.getAllBAWeb);
        //API untuk upload geojson
        app.post('/api/v1.0/web/checkpoint/upload', VerifyToken, Controllers.v_1_0.CheckPoint.upload);
        app.get('/api/v1.0/web/checkpoint/:baCode/:jalur', VerifyToken, Controllers.v_1_0.CheckPoint.getCheckPointWeb);
        //API untuk tracking
        app.get('/api/v1.0/web/tracking-date', Controllers.v_1_0.Tracking.getTrackingDate);
        app.get('/api/v1.0/web/tracking/:trackcode', Controllers.v_1_0.Tracking.getTrackingDetail);
        
        /*
        |--------------------------------------------------------------------------
        | Versi 1.0 API Mobile Patroli
        |--------------------------------------------------------------------------
        */
        app.post('/api/v1.0/mobile/login/supervisor', Controllers.v_1_0.Auth.loginSupervisorMobile);
        app.post('/api/v1.0/mobile/login/patroli', Controllers.v_1_0.Auth.loginPatroliMobile);
        app.post('/api/v1.0/mobile/mobile-sync', VerifyToken, Controllers.v_1_0.SyncMobile.create);
        app.get('/api/v1.0/mobile/ba', Controllers.v_1_0.Estate.getAllBAMobile);
        app.post('/api/v1.0/mobile/checkpoint',  VerifyToken, Controllers.v_1_0.CheckPoint.getCheckPointMobile);
        app.get('/api/v1.0/mobile/server/service-list', Controllers.v_1_0.Server.serviceList);
        app.post('/api/v1.0/mobile/tracking', VerifyToken,Controllers.v_1_0.Tracking.createTracking);
        app.get('/api/v1.0/mobile/tracking/:baCode/:jalur', VerifyToken,Controllers.v_1_0.Tracking.getTracking);
        app.get('/api/v1.0/mobile/tracking/:trackcode', VerifyToken,Controllers.v_1_0.Tracking.getTrackingDetail);
        app.post('/api/v1.0/mobile/titik-api', VerifyToken,Controllers.v_1_0.TitikApi.create);
        app.post('/api/v1.0/mobile/titik-api/download', VerifyToken,Controllers.v_1_0.TitikApi.getTitikApi);    
        app.post('/api/v1.0/mobile/titik-panas', VerifyToken,Controllers.v_1_0.TitikPanas.create);
        app.post('/api/v1.0/mobile/titik-panas/download', VerifyToken,Controllers.v_1_0.TitikPanas.getTitikPanas);
        app.put('/api/v1.0/mobile/firebase-token', VerifyToken,Controllers.v_1_0.Auth.updateFirebaseToken);

        // app.get('/api/v1.0/point/users', VerifyToken,  Controllers.v_1_0.Point.userPoints);
    }
