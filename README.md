# Projeto Backend - Gerenciamento de Tarefas

Este projeto é um backend desenvolvido com NestJS que gerencia tarefas. Ele utiliza autenticação JWT, criptografia de senhas com bcrypt e o Prisma ORM para manipulação do banco de dados.

## Requisitos

- Node.js (v16 ou superior)
- Yarn ou NPM
- MySQL (ou outro banco de dados configurado no Prisma)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/emeps/taskapp-backend.git
cd taskapp-backend
```
2. Instale as dependência:

```bash
$ yarn install
# ou 
$ npm install
```
3. Configure as variáveis de ambiente.

Copie o arquivo .env.example e renomeie para .env:
```bash
DATABASE_URL="mysql://username:password@localhost:3306/nome_do_banco?schema=public"
```
Substitua username e password pelos dados do seu banco. Crie um database e substitua me nome_do_banco na string acima.
Certifique-se de configurar corretamente as credenciais do banco de dados.

4. Execute as migrations do Prisma para criar o banco de dados:
```bash
$ npx prisma migrate dev
```
5. Inicie o servidor:

```bash
$ yarn start:dev
# ou
$ npm run start:dev
```

O servidor estará rodando em http://localhost:3001.

## Endpoints
### Autenticação
- **POST** /auth/register - Cadastro de usuário
- **POST** /auth/login - Login (retorna o token JWT)
### Tarefas
- **GET** /task - Lista todas as tarefas (necessário JWT)
- **POST** /task - Cria uma nova tarefa (necessário JWT)
- **PATCH** /task/:id - Atualiza uma tarefa existente (necessário JWT)
- **DELETE** /task/:id - Deleta uma tarefa (necessário JWT)

## Exemplos
### Registro de Usuário
```json
POST /auth/register
{
  "name": "Seu Nome",
  "email": "email@exemplo.com",
  "password": "sua_senha"
}
```

### Login de Usuário
```json
POST /auth/login
{
  "email": "email@exemplo.com",
  "password": "sua_senha"
}
```

### Criar Tarefas
```json
POST /task
Headers: Authorization: Bearer seu_token_jwt

{
  "title": "Minha nova tarefa",
  "description": "Descrição da tarefa",
  "status": "PENDING"
}

```

## Tecnologias Utilizadas
- **NestJS**: Framework para a construção de aplicações Node.js
- **Prisma**: ORM para interagir com o banco de dados
- **JWT**: Autenticação baseada em tokens
- **Bcrypt**: Criptografia de senhas