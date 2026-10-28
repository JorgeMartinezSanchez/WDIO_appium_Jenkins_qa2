
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Subir APK a BrowserStack') {
            steps {
                browserstack(credentialsId: 'browserstack-credentials') {
                    browserstackAppUploader(
                        appPath: 'app/clock.apk'
                    )
                }
            }
        }

        stage('Ejecutar pruebas en BrowserStack') {
            steps {
                browserstack(credentialsId: 'browserstack-credentials') {
                    sh 'npx wdio run wdio.conf.js'
                }
            }
        }
    }

    post {
        always {
            echo 'Generando el reporte de Allure...'

            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }
    }
}
