# BFF Agriness Challenge

Implementação de BFF para o desafio da Agriness.

## Índice

- [BFF Agriness Challenge](#bff-agriness-challenge)
  - [Índice](#índice)
  - [1. Iniciando](#1-iniciando)
  - [2. Rodando o Projeto](#2-rodando-o-projeto)
  - [3. Rodando os Testes](#3-rodando-os-testes)
  - [4. Requisições e Exemplos](#4-requisições-e-exemplos)
    - [4.1 Animais](#41-animais)
    - [4.2 Lotes](#42-lotes)
    - [4.3 Exemplos com Clientes HTTP](#43-exemplos-com-clientes-http)

## 1. Iniciando

Este BFF foi construído para expor multiplas APIs externas simuladas (mockadas) de diferentes serviços de backend para o fronend. Isso acontece através de um único backend que é dedicado a executar as operações solicitadas, aplicando as regras de negócio conforme necessário.

Suas principais dependências são:

- [NodeJs (v20.14.0)](https://nodejs.org/en/) - é utilizado como motor da aplicação.
- [NestJs](https://nestjs.com/) - framework utilizado para criação de serviços backends.

Suas principais funcionalidades são:

- CRUD de animais;
- CRUD de lotes.

Para fazer o setup do projeto localmente tenha instalado, em seu computador, o [git](https://git-scm.com/), uma [conexão via ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh) com o github, [nvm](https://github.com/nvm-sh/nvm), o [node v20.14.0](https://nodejs.org/en/) e [npm](https://www.npmjs.com/). Abra o terminal e siga o passo a passo de comandos:

```shell
    # Clone o projeto do github.
    git clone git@github.com:leogm360/bff-agriness-challenge.git

    # Navegue até o diretório do projeto.
    cd ./bff-agriness-challenge

    # Ative o ambiente node na versão necessária.
    nvm use

    # Instale as dependências do projeto.
    npm install
```

Neste momento você terá o projeto instalado localmente.

## 2. Rodando o Projeto

O projeto contém um arquivo `docker-compose.yml` completo e `Dockerfile`nos pacotes que serão utilizados para executar o ambiente.
Porém, antes é necessário configurar o arquivo `.env` com as variáveis de ambiente necessárias para o projeto. Para isso, basta copiar o arquivo `.env.example` para `.env` e preencher as variáveis de ambiente necessárias.

| Variável             | Tipo          | Valor Padrão |
| -------------------- | ------------- | ------------ |
| ANIMALS_API_NODE_ENV | dev,prod,test | dev          |
| ANIMALS_API_PORT     | number        | 3000         |
| BATCHES_API_NODE_ENV | dev,prod,test | dev          |
| BATCHES_API_PORT     | number        | 3001         |
| BFF_NODE_ENV         | dev,prod,test | dev          |
| BFF_PORT             | number        | 3002         |
| POSTGRES_USER        | string        | postgres     |
| POSTGRES_PASSWORD    | string        | postgres     |
| POSTGRES_DB          | string        | postgres     |

Após configurar corretamente o ambiente, basta executar o comando `docker-compose up`. Executar o comando pela primeira vez deve demorar um pouco devido a quantidade de pacotes.

## 3. Rodando os Testes

Apenas o pacote `bff` possui testes unitários implementados neste momento para o seus services, para executá-los basta seguir a tabela abaixo.

| Comando                          | Resultado                     |
| -------------------------------- | ----------------------------- |
| `npm run test <test_suit>`       | Executa uma única vez         |
| `npm run test:watch <test_suit>` | Executa em modo de observação |
| `npm run test:cov <test_suit>`   | Executa e coleta cobertura    |

## 4. Requisições e Exemplos

Aqui é possível encontrar os exemplos de requisições e respostas para a API do BFF.

Os endpoints do tipo `GET` que trazem multiplos resultados, suportam os parâmetros de consulta:

| Campo   | Incluso  | tipo   | Formato             |
| ------- | -------- | ------ | ------------------- |
| q       | opcional | string | campo:regra:procura |
| sort    | opcional | string | campo:regra         |
| include | opcional | string | campo               |
| page    | opcional | number | number              |
| size    | opcional | number | number              |

As regras suportadas para a consulta `q` são: 

- `equals` - procura exata.

As regras suportadas para a consulta `sort` são: 

- `asc` - ordenação ascendente;
-  `desc` - ordenação descendente.

### 4.1 Animais

Os campos que compõem a entidade `Animais` pode ser visto abaixo:

| Campo     | Incluso  | tipo   |
| --------- | -------- | ------ |
| id        | sim      | uuid   |
| name      | sim      | string |
| code      | sim      | string |
| batch     | opcional | Batch  |
| batchId   | sim      | string |
| createdAt | sim      | Date   |
| updatedAt | sim      | Date   |

Os endpoints que compõem a API de `Animais` são:

`GET`

URL: {{basePath}}/animal

RESPOSTA: 

```json
[
  {
    "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
    "name": "Caterine",
    "code": "SA-001",
    "batchId": "be31575e-f438-4a05-b964-7c24cea68714",
    "batch": {
      "id": "be31575e-f438-4a05-b964-7c24cea68714",
      "name": "Lote A",
      "code": "SA-A-2024-001",
      "createdAt": "2024-07-01T04:45:18.973Z",
      "updatedAt": "2024-07-01T04:45:18.973Z"
    },
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
  {
    "id": "664aff11-66d3-4104-8fd5-3443621b12e0",
    "name": "Brody",
    "code": "SA-002",
    "batchId": "a40018e4-bb70-47c5-af22-79ab69beb8c3",
    "batch": {
      "id": "a40018e4-bb70-47c5-af22-79ab69beb8c3",
      "name": "Lote A",
      "code": "SA-A-2024-001",
      "createdAt": "2024-07-01T04:45:18.973Z",
      "updatedAt": "2024-07-01T04:45:18.973Z"
    },
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
  {
    "id": "16464b51-0adc-4c1b-bc9c-859ce8c36a3b",
    "name": "Silvana",
    "code": "SA-003",
    "batchId": "f09edf37-3c1c-49cb-96bc-66d06c899019",
    "batch": {
      "id": "f09edf37-3c1c-49cb-96bc-66d06c899019",
      "name": "Lote A",
      "code": "SA-A-2024-001",
      "createdAt": "2024-07-01T04:45:18.973Z",
      "updatedAt": "2024-07-01T04:45:18.973Z"
    },
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
]
```

> [!NOTE]
> A API BFF estpa programada para incluir automáticamente as informações de lote do animal correspondente.

`GET`

URL: {{basePath}}/animal/:id

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Caterine",
  "code": "SA-001",
  "batchId": "be31575e-f438-4a05-b964-7c24cea68714",
  "batch": {
    "id": "be31575e-f438-4a05-b964-7c24cea68714",
    "name": "Lote A",
    "code": "SA-A-2024-001",
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

> [!NOTE]
> A API BFF estpa programada para incluir automáticamente as informações de lote do animal correspondente.

`POST`

URL: {{basePath}}/animal

CORPO:

```json
{
  "name": "Caterine",
  "code": "SA-001",
  "batchId": "be31575e-f438-4a05-b964-7c24cea68714",
}
```

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Caterine",
  "code": "SA-001",
  "batchId": "be31575e-f438-4a05-b964-7c24cea68714",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

`PATCH`

URL: {{basePath}}/animal/:id

CORPO:

```json
{
  "name": "Abbey",
  "code": "SA-004",
}
```

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Abbey",
  "code": "SA-004",
  "batchId": "be31575e-f438-4a05-b964-7c24cea68714",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

`DELETE`

URL: {{basePath}}/animal/:id

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Abbey",
  "code": "SA-004",
  "batchId": "be31575e-f438-4a05-b964-7c24cea68714",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

### 4.2 Lotes

Os campos que compõem a entidade `Lotes` pode ser visto abaixo:

| Campo     | Incluso | tipo   |
| --------- | ------- | ------ |
| id        | sim     | uuid   |
| name      | sim     | string |
| code      | sim     | string |
| createdAt | sim     | Date   |
| updatedAt | sim     | Date   |

Os endpoints que compõem a API de `Lotes` são:

`GET`

URL: {{basePath}}/batch

RESPOSTA: 

```json
[
  {
    "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
    "name": "Lote A",
    "code": "SA-A-2024-001",
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
  {
    "id": "664aff11-66d3-4104-8fd5-3443621b12e0",
    "name": "Lote B",
    "code": "SA-B-2024-002",
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
  {
    "id": "16464b51-0adc-4c1b-bc9c-859ce8c36a3b",
    "name": "Lote C",
    "code": "SA-C-2024-003",
    "createdAt": "2024-07-01T04:45:18.973Z",
    "updatedAt": "2024-07-01T04:45:18.973Z"
  },
]
```

`GET`

URL: {{basePath}}/batch/:id

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Lote A",
  "code": "SA-A-2024-001",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

`POST`

URL: {{basePath}}/batch

CORPO:

```json
{
  "name": "Lote A",
  "code": "SA-A-2024-001",
}
```

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Lote A",
  "code": "SA-A-2024-001",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

`PATCH`

URL: {{basePath}}/batch/:id

CORPO:

```json
{
  "name": "Lote D",
  "code": "SA-D-2024-004",
}
```

RESPOSTA:

```json
{
  "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Lote D",
  "code": "SA-D-2024-004",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

`DELETE`

URL: {{basePath}}/animal/:id

RESPOSTA:

```json
{
 "id": "d5c7e122-4e52-4774-82f0-88d85f2303f3",
  "name": "Lote D",
  "code": "SA-D-2024-004",
  "createdAt": "2024-07-01T04:45:18.973Z",
  "updatedAt": "2024-07-01T04:45:18.973Z"
}
```

### 4.3 Exemplos com Clientes HTTP

Alguns exemplos de requisições podem ser encontrados no diretório `http-client-examples`, eles estão disóníveis para o [Bruno](https://www.usebruno.com/) e [Postman](https://www.postman.com/). Basta importar o arquivo json corresponde e utilizar.


[🔝 Voltar ao início](#índice)
