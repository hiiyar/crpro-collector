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
        docker.withRegistry('https://gcr.io', 'gcr:jenkins-gcr@crpro-gg-228022.iam.gserviceaccount.com') {
          app.push("latest")
        }
     }

}