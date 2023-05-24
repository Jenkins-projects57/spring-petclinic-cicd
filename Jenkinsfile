pipeline{
    agent 'any'
    environment{
        DOCKERHUB_CREDENTIALS = credentials('docker-cred')
    }
    stages{
        stage("VCS"){
            steps{
                git url: 'https://github.com/Jenkins-projects57/spring-petclinic-cicd.git',
                    branch: 'main'
            }
        }
        stage("BUILD"){
            steps{
                sh './mvnw package'
            }
        }
        stage("JUNIT"){
            steps{
                archiveArtifacts artifacts: '**/target/spring-petclinic-3.0.0-SNAPSHOT.jar'
                junit '**/surefire-reports/TEST-*.xml'
                sh 'printenv'
            }
        }
        stage("Docker BUILD & PUSH"){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker image build -t spc:v2.0 .'
                sh 'docker image tag spc:v2.0 srikanthvelma/spc:latest'
                sh 'docker image tag spc:v2.0 srikanthvelma/spc:${BUILD_NUMBER}'
                sh 'docker image push srikanthvelma/spc:${BUILD_NUMBER}'
                sh 'docker image push srikanthvelma/spc:latest'
            }
        }
        stage("K8S DEPLOY"){
            steps{
                // sh 'sudo cp -p /home/velma/.kube/config /var/lib/jenkins/.kube/'
                // sh 'sudo chmod 777 /var/lib/jenkins/'
                // sh 'sudo chmod 777 /var/lib/jenkins/config'
                // sh 'az aks get-credentials --resource-group myResourceGroup --name myAKSCluster'
                sh 'kubectl apply -f .'
            }
        }
    }
}