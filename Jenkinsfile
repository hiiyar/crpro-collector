pipeline {
  agent any
  stages {
    stage('Deploy') {
      steps {
        echo 'Iniciando o deploy do Collector'
        build 'crpro-collector'
      }
    }
    stage('Publish Build Image Container') {
      steps {
        echo 'Build Docker Container'
      }
    }
    stage('Deploy Google Cloud') {
      steps {
        echo 'Publicar no Google Cloud'
      }
    }
    stage('') {
      steps {
        echo 'Finalizado com sucesso'
      }
    }
  }
}