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
        docker.withRegistry('https://us.gcr.io', 'gcr:cc3bb651eb324bd85590be26e2bf7aaecb797e27') {
          app.push("latest")
        }
     }

}