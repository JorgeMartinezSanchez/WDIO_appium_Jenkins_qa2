pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run WDIO Tests') {
            steps {
                // Inject the credentials into environment variables
                withCredentials([
                    string(credentialsId: 'browserstack-username', variable: 'BROWSERSTACK_USERNAME'),
                    string(credentialsId: 'browserstack-access-key', variable: 'BROWSERSTACK_KEY')
                ]) {
                    // Run your WebdriverIO script
                    sh 'npm run wdio'
                }
            }
        }
    }
}