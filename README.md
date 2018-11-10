# INSHOP CRM CLIENT

Inshop CRM is simple & powerful system with clients management, Projects & tasks, Documents, Simple Accounting, REST API, ...

https://inshopcrm.com/

![alt text](https://inshopcrm.com/static/screenshots/inshop-crm-login.png "Inshop CRM login page")

![alt text](https://inshopcrm.com/static/screenshots/inshop-crm-dashboard.png "Inshop CRM login dashboard with charts")

## Live demo
Fill free to check out our demo CRM instance

Username: demo

Password: demo

https://demo.inshopcrm.com/signin


## Main Features

#### Clients management
Create clients manually or via REST API.

#### Projects & tasks
Create projects and assign tasks for user. Due to nice calendar, check your tasks.

#### Documents
Upload any kind of documents and templates.

#### Simple Accounting
In/out invoices management. Generate and sent invoices to client via scheduler.

## Technologies
 - PHP 7.2
 - Symfony 4
 - API Platform
 - Postgres
 - Elasticsearch
 - Vue
 - Bootstrap
 - Docker
 - GIT


# Instalation

## Using docker-compose

.env
```dotenv
PORT_API=8888
PORT_CLIENT=8080

DATABASE_NAME=api
DATABASE_USER=api
DATABASE_PASSWORD=!ChangeMe!
```

docker-compose.yml

```
version: '3.2'

services:
  client:
    restart: always
    image: inshopgroup/inshop-crm-client-nginx
    ports:
      - ${PORT_CLIENT}:80

  php:
    restart: always
    image: inshopgroup/inshop-crm-api-php-fpm
    depends_on:
      - db
    env_file:
      - ./.env
    command: sh ./bin/entrypoint.sh
    volumes:
      - .:/var/www
      - files-data:/var/www/data
    networks:
      - api

  nginx:
    restart: always
    image: inshopgroup/inshop-crm-api-nginx
    depends_on:
      - php
    ports:
      - ${PORT_API}:80
    networks:
      - api

  db:
    restart: always
    image: postgres:9.5-alpine
    environment:
      - POSTGRES_DB=${DATABASE_NAME}
      - POSTGRES_USER=${DATABASE_USER}
      - POSTGRES_PASSWORD=${DATABASE_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data:rw
    networks:
      - api

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.3.1
    environment:
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - es-data:/usr/share/elasticsearch/data
    networks:
      - api
      - esnet

volumes:
  es-data: {}
  db-data: {}
  files-data: {}

networks:
    api:
    esnet:

```

## For developers

```bash
mkdir inshop-crm

# api
git clone git@github.com:inshopgroup/inshop-crm-api.git
cd inshop-crm-api
docker-compose up -d
cd ..

# client
git clone git@github.com:inshopgroup/inshop-crm-client.git
cd inshop-crm-client
yarn run install
yarn run dev
cd ..
```

Enjoy, after run, API will be available under [http://localhost:8888/docs](http://localhost:8888/docs)

And client under [http://localhost:8080](http://localhost:8080)