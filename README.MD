# Projeto Backenf Startup 

### Instalação de Dependências

Para instalar todas as dependências indicadas no `package.json`, execute o seguinte comando:

npm install express nodemon bcrypt jsonwebtoken sequelize cors pg pg-hstore

### Executar o Projeto

Para rodar o projeto usando o nodemon, utilize o comando:

npm run dev

### Configuração do Arquivo .env

O projeto possui configurações no arquivo .env, que devem incluir os seguintes dados:

DB_NAME=nome_do_database
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
DB_HOST=endereco_do_banco
DB_PORT=5432
PORT=5000
JWT_PRIVATE_KEY=sua_chave_jwt

> [!NOTE]
> O valor de JWT_PRIVATE_KEY deve ser gerado e utilizado para assinar os tokens JWT.
