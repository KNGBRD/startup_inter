Instalar todas as dependencias indicada pelo package.json
### npm install express nodemon bcrypt jsonwebtoken sequelize cors
### npm install pg pg-hstore

Criar a base de dados
### CREATE DATABASE site_teste CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Rodar o projeto usando o nodemon 
### npm run dev


O projeto possui configuraçoes em um arquivo .env, que possi os dados a baixo
em JWT_PRIVATE_KEY deve ser gerada uma chave para o JWT

DB_NAME=nome_do_database
DB_USER=usuario_do_banco
DB_PASSWORD=Senha_do_banco
DB_HOST=endereço_do_banco
DB_PORT=5432_porta_padrão_do_PostgreSQL
PORT=5000
JWT_PRIVATE_KEY=chave_para_jwt
