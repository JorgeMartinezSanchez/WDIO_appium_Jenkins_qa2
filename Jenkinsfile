pipeline {
    agent any

    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username-id')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key-id')
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Ejecutar Pruebas WDIO en BrowserStack') {
            steps {
                // Ejecuta WebdriverIO utilizando el servicio de BrowserStack configurado
                sh 'npx wdio run wdio.conf.js'
            }
        }
    }
}