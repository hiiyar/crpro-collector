import java.text.SimpleDateFormat

node {
    def app
    def dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm")
    def date = new Date()

    stage ('Clone Repository') {
        checkout scm
    }

    stage ('Build container') {
        app = docker.build("gcr.io/crpro-gg-228022/crpro-collector", "-f docker/production/Dockerfile .")
    }

     stage('Publish to Google Register') {
        app.push("latest")
     }

}