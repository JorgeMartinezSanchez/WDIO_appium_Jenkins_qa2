
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

    stage('Subir APK y ejecutar pruebas') {
        steps {
            browserstack(credentialsId: 'browserstack-credentials') {
                script {
                    if (!fileExists('app/clock.apk')) {
                        error('No se encontró app/clock.apk en el workspace')
                    }

                    def httpStatus = sh(
                        script: '''
                            curl --silent --show-error \
                            --max-time 300 \
                            --output browserstack-response.json \
                            --write-out '%{http_code}' \
                            -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
                            -X POST \
                            "https://api-cloud.browserstack.com/app-automate/upload" \
                            -F "file=@app/clock.apk"
                        ''',
                        returnStdout: true
                    ).trim()

                    def response = readFile('browserstack-response.json')

                    if (!(httpStatus in ['200', '201'])) {
                        echo "HTTP BrowserStack: ${httpStatus}"
                        echo "Respuesta: ${response}"
                        error('BrowserStack rechazó la carga del APK')
                    }

                    def uploadResult = readJSON text: response

                    if (!uploadResult.app_url) {
                        error("La respuesta no contiene app_url: ${response}")
                    }

                    env.BROWSERSTACK_APP_ID = uploadResult.app_url

                    echo 'APK cargado correctamente.'

                    sh 'npx wdio run wdio.conf.js'
                }
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
