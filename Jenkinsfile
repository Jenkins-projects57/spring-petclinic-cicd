pipeline{
    agent 'any'
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
                sh 'docker image build -t spc:v2.0 .'
                sh 'docker image push spc:v2.0 srikanthvelma/spc:latest'
                sh 'docker image push spc:v2.0 srikanthvelma/spc:${BUILD_NUMBER}'
            }
        }
        stage("K8S DEPLOY"){
            steps{
                sh 'az aks install-cli'
                sh 'az aks get-credentials --resource-group myResourceGroup --name myAKSCluster'
                sh 'kubectl apply -f .'
            }
        }

    }
}