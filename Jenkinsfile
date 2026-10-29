pipeline {
    agent any
    tools { nodejs 'NodeJS' }

    stages {
        stage('Build dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Ejecutar Pruebas en BrowserStack') {
            steps {
                browserstack(credentialsId: 'browserstack-credentials') {
                    sh 'npx wdio run wdio.conf.js'
                }
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