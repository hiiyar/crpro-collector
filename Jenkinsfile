pipeline {
  agent any
  stages {
    stage('Clone branch') {
      steps {
        echo "Iniciando o deploy do Collector - ${env.BRANCH_NAME}"
        checkout scm
      }
    }
    stage('Build Image Container') {
      steps {
        echo 'Build Docker Container'
        app = docker.build("hiiyar/crpro-collector", "-f docker/prod/Dockerfile .")
      }
    }
    stage('Push on Google Register') {
      steps {
        echo 'Publicar no Google Cloud'
        
      }
    }
    stage('Publish application') {
      steps {
        echo 'Finalizado com sucesso'
      }
    }
  }
}
