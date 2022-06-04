# Commands

npm init -y
tsc --init
./node_modules/.bin/tslint --init
npm i --save-dev @types/express

# tsconfig.json

    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "sourceMap": true,
    "esModuleInterop": true,
    "strict": true,
    "moduleResolution": "node",

# Compile

tsc

# Installs

npm i typescript --save-dev
npm i tslint --save-dev
npm i express dotenv cors
npm i --save-dev @types/express
npm i --save-dev @types/cors

# Running

nodemon ./dist/app
tsc --watch

# MySQL

user : root pass: Empty String

- Amps
- WampServer
- Xampp

TablePlus for managment

# Sequelize ORM

https://sequelize.org/docs/v6/getting-started/

npm install --save sequelize

# One of the following:

$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
