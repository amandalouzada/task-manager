# Task Manager
Gerenciador de tarefas

## Tools

- TypeScript 💙
- Babel (for builds);
- Docker & Docker Compose (Setup environment);
- Jest (for tests);
- Postgres
- Redis (rate limit)
- TSyringe (dependency injection container)
- Elasticsearch, Logstash, Kibana e APM (Monitoramento de Logs)


# Run
  docker-compose -f docker/ocker-compose.yml up --build
  docker exec -it 



# Endpoints 
[arquivo task-manager.json](https://github.com/amandalouzada/task-manager/blob/master/task-manager.json)


# Monitoramento de Logs

  ELK stack - APM

  No diretório [docker](https://github.com/amandalouzada/task-manager/tree/master/docker/elk) é possivel encontrar imagem docker para a ELK stack junto com o  apm.
  
  
  ```
  docker-compose -f docker/elk/docker-compose.yml -f docker/elk/extensions/apm-server/apm-server-compose.yml up -d
  ```
  
  Após subir a imagem é necessário gerar as senha do elasticsearch.
  

  ```
  docker-compose exec -T elasticsearch bin/elasticsearch-setup-passwords auto --batch
  ``` 

  E alterar nos arquivos de configuração yml - utilizar o usuário elastic
  - apm-server.yml
  - kibana.yml
  - logstash.yml


  ```
  // Descomentar essa linha para ativar o monitormento APM 
  // import './config/apm';
  ```




# Deploy AWS

Uma possível solução para disponibilizar a aplicação é utilizar os serviços:
  - Amazon EKS (Kubernetes para gerenciar aplicativos em containers)
  - Agrupamento em clusters de instâncias  (EC2)

  ## Criar um Cluster Kubernetes 
  1º Criar uma função do IAM para permitir que o kubernetes crie recursos
  2º Criar uma VPC para implantar o cluster (AWS CloudFormation)
  3º Crie um cluster do AWS EKS
  4º Configurar o kubectl para AWS EKS (utilizando aws-cli)
  

