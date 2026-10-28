export const config = {
    // Tus credenciales de BrowserStack (puedes inyectarlas mediante variables de entorno desde Jenkins)
    user: process.env.BROWSERSTACK_USERNAME || 'TU_USUARIO',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'TU_TOKEN',

    updateJob: false,
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    
    capabilities: [{
        'bstack:options': {
            osVersion: '14.0',
            deviceName: 'Google Pixel 8',
            projectName: 'Mi Proyecto Movil',
            buildName: 'Jenkins Build #1',
            sessionName: 'Prueba con App Preinstalada',
            debug: true,
            networkLogs: true
        },
        // AQUÍ ESTÁ LA CLAVE: Usas el identificador de la app ya existente en BrowserStack
        // Reemplaza 'bs://<tu-app-hashed-id>' por el ID real que te da BrowserStack App Automate
        'appium:app': 'bs://2ef4d92065a5c8c1701186b29c16c02b6f1582c9',
    }],

    services: ['browserstack'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};