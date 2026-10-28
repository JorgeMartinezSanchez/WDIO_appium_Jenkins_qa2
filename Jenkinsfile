pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key')
    }

    stages {
        stage('Build dependencies') {
            steps {
                echo 'Instalando dependencias...'
                sh 'npm ci'
            }
        }

        stage('Ejecutar Pruebas en BrowserStack') {
            steps {
                echo 'Initializing tests in WDIO with BrowserStack'
                sh 'npx wdio run wdio.conf.js'
            }
        }
    }

    post {
        always {
            echo 'Generando y publicando el reporte de Allure...'
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                // Ruta corregida para un proyecto Node.js
                results: [[path: 'allure-results']] 
            ])
        }
    }
}