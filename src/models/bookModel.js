import { Sequelize } from "sequelize";
import db from "../connection.js";

// Modelo de Livros
const Book = db.define("Book", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  publicationYear: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

export default { Book };
