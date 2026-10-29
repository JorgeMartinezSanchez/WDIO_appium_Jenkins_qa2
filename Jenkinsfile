pipeline {
    agent any
    tools { nodejs 'NodeJS' }

    stages {
        stage('Checkout Code') {
            steps {
                // Clonas tu repositorio de pruebas WebdriverIO
                checkout scm
            }
        }

        stage('Upload App to BrowserStack') {
            steps {
                sh '''
                    curl -u "jorgemartnezsnch_AKZfmp:TU_ACCESS_KEY" \
                    -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
                    -F "url=https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk"
                '''
            }
        }

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