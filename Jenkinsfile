import java.text.SimpleDateFormat

node {
    def app
    def dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm")
    def date = new Date()

    stage ('Clone Repository') {
        checkout scm
    }

    stage ('Build container') {
        app = docker.build("us.gcr.io/crpro-gg-228022/crpro-collector", "-f docker/production/Dockerfile .")
    }

     stage('Publish to Google Register') {
        docker.withRegistry('https://us.gcr.io', 'gcr:106812314727011567943') {
          app.push("latest")
        }
     }

}