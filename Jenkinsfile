pipeline {
    agent {
        label 'master'
    }
    tools {
        nodejs "node"
    }
    environment {
        GIT_BASE_PATH = "bbrown-project01-cicd"
        GIT_API_PATH = "api"
        GIT_DOCKER_PATH = "docker"
        IMAGE_NAME = "bbrowncaltech/inventory-manager"
        DOCKERFILE_NAME = "Express.API.Dockerfile"
        SERVICE_NAME = "inventory-management"
        DOCKER_IMAGE = ''
        IMAGE_TAG = ''
    }
    stages {
        stage('Stop Service') {
            steps {
                sh "/usr/local/bin/docker-compose -f ./${GIT_DOCKER_PATH}/docker-compose.yml rm -f -s ${SERVICE_NAME}"
            }
        }
        stage('Build Docker Image') {
            steps {
               script {
                   DOCKER_IMAGE = docker.build("${IMAGE_NAME}", "-f ./${GIT_API_PATH}/${DOCKERFILE_NAME} ./${GIT_API_PATH}/")
                   //   Development Testing/Deployment
                   IMAGE_TAG = "develop";
                   //   Production Deployment
                   if ((BRANCH_NAME ==~/(0-9\.0-9\.0-9)/)) {
                       IMAGE_TAG = BRANCH_NAME;
                   }
                   //   UAT Deployment
                   if ((BRANCH_NAME ==~/(main)/)) {
                       IMAGE_TAG = "latest";
                   }
               }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry( '', 'Docker-Hub' ) {
                        DOCKER_IMAGE.push("$IMAGE_TAG")
                    }
                }
            }
        }
        stage('Restart Service') {
            steps {
                sh "INV_TAG=${IMAGE_TAG} /usr/local/bin/docker-compose -f ./${GIT_DOCKER_PATH}/docker-compose.yml up -d ${SERVICE_NAME}"
            }
        }
    }
    
}