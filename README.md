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


# Monitoramento de Logs

  ELK stack - APM

  -> No diretório docker é possivel encontrar imagem docker para a ELK stack junto com o apm.
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

Para realizar o deploy na aws é possível utilizar os serviços:
  - Amazon EKS
  - Amazon EC2

  ## Criar um Cluster Kubernetes 
  1º Criar uma função do IAM para permitir que o kubernetes crie recursos
  2º Criar uma VPC para implantar o cluster (AWS CloudFormation)
  3º Crie um cluster do AWS EKS
  4º Configurar o kubectl para AWS EKS (utilizando aws-cli)
  

