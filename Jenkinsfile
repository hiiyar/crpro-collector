import java.text.SimpleDateFormat

node {
    def app
    def dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm")
    def date = new Date()

    stage ('Clone Repository') {
        checkout scm
    }

    stage ('Build container') {
        app = docker.build("hiiyar/crpro-collector", "-f docker/production/Dockerfile .")
    }

     stage('Publish to Google Register') {
         if (env.BRANCH_NAME =~ /(master)/) {
            echo 'Publicando na master'
         }

         if (env.BRANCH_NAME =~ /(release*)/) {
            echo 'Publicando na release'
         }
     }

}