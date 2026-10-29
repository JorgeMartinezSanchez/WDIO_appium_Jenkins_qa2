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
            script {
                // Guardamos la respuesta del curl
                def response = sh(script: "curl -u jorgemartnezsnch_AKZfmp:UsqY6ykApzLAHio8Q9p4 -X POST https://api-cloud.browserstack.com/app-automate/upload -F url=https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk", returnStdout: true).trim()
                
                // Extraemos el app_url usando un regex o parseo básico de JSON
                def matcher = response =~ /"app_url"\s*:\s*"(bs:\/\/[^"]+)"/
                if (matcher) {
                    env.BROWSERSTACK_APP_URL = matcher[0][1]
                    echo "App subida exitosamente: ${env.BROWSERSTACK_APP_URL}"
                } else {
                    error("No se pudo obtener el app_url de la respuesta de BrowserStack")
                }
            }
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