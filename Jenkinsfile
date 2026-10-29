pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Build & Test') {
            steps {
                echo 'Instalando dependencias...'
                sh 'npm ci'
                echo 'Ejecutando pruebas con WebdriverIO...'
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