
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

                    env.BROWSERSTACK_APP_ID = sh(
                        script: '''
                            curl --fail --silent --show-error \
                            --max-time 300 \
                            -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
                            -X POST \
                            "https://api-cloud.browserstack.com/app-automate/upload" \
                            -F "file=@app/clock.apk" |
                            node -e '
                            let data = "";
                            process.stdin.on("data", chunk => data += chunk);
                            process.stdin.on("end", () => {
                                const result = JSON.parse(data);
                                if (!result.app_url) {
                                console.error(JSON.stringify(result));
                                process.exit(1);
                                }
                                console.log(result.app_url);
                            });
                            '
                        ''',
                        returnStdout: true
                    ).trim()

                    echo 'APK cargado en BrowserStack correctamente.'

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
