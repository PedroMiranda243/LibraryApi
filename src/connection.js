import { Sequelize } from 'sequelize';

const db = new Sequelize('LibraryDB', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  
});


 export default db;