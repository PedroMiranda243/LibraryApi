import { Sequelize } from 'sequelize';

const nomeDB = "libraryDB"
const db = new Sequelize(nomeDB, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  
});

 export default db;