# Sistema de Fila usando BULL 

Esse projeto é focado na criação de um projeto para aprender um pouco como o Node pode gerenciar filas para o envio de e-mail usando o NodeMailer como lib de envio, o Bull para gerenciar as filas e o o Redis para criar as filas.

## Iniciando o projeto 

Para iniciar o projeto você roda o seguinte comando 

```
npx nodemon .\src\server.js
```

Logo que aparecer a mensagem ``Server Run`` é sinal que o projeto já esta rodando 

## Iniciando as Filas com Docker

Para iniciar as filas, estarei utilizando o docker para iniciar o Redis na sua versão Alpine, para isso irei usar o seguinte comando.

```
docker run --name redis -p 6379:6379 -d redis:alpine
```

Para visualizar se o ``Redis`` esta ativo você pode usar o comando:

```
docker ps
```

Você vai encontrar algo como

```
CONTAINER ID   IMAGE    COMMAND   CREATED     STATUS  PORTS  NAMES
4902315872e9   redis:alpine   "docker-entrypoint.s…"   9 seconds ago   Up 8 seconds   0.0.0.0:6379->6379/tcp   redis
```
## Verificando Filas

Para você poder visualizar as filas do projeto basta acessar

```
http://localhost:3333/admin/queues/
```
