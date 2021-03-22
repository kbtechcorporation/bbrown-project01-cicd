pipeline {
    agent {
        label 'master'
    }
    environment {
        GIT_BASE_PATH = "bbrown-project01-cicd"
        GIT_API_PATH = "api"
        GIT_DOCKER_PATH = "docker"
        IMAGE_NAME = "bbrowncaltech/inventory-manager"
        DOCKERFILE_NAME = "Express.API.Dockerfile"
        SERVICE_NAME = "inventory-management"
    }
    stages {
        stage('Stop Service') {
            steps {
                sh "docker-compose -f ./${GIT_BASE_PATH}/${GIT_DOCKER_PATH}/docker-compose.yml rm -f -s ${SERVICE_NAME}"
            }
        }
        stage('Build Docker Image') {
            environment {
               IMAGE_TAG = sh(script: 'node -p -e "require(\'./api/package.json\').version"', , returnStdout: true).trim()
            }
            steps {
                sh "docker build -f ./${GIT_BASE_PATH}/${GIT_API_PATH}/${DOCKERFILE_NAME} -t ${IMAGE_NAME}:${IMAGE_TAG} ./${GIT_BASE_PATH}/${GIT_API_PATH}/"
            }
        }
        stage('Restart Service') {
            steps {
                sh "docker-compose -f ./${GIT_BASE_PATH}/${GIT_DOCKER_PATH}/docker-compose.yml up -d ${SERVICE_NAME}"
            }
        }
        stage('Push Docker Image') {
            when {
                anyOf {
                    branch "main"
                }
            }
            steps {
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }
    
}