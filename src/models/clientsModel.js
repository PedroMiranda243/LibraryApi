import { Sequelize } from "sequelize";
import db from "../db.js";

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

// Modelo de Usuários
const User = db.define("User", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// Modelo de Empréstimos
const Loan = db.define("Loan", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  bookId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  loanDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

export default { Book, User, Loan };
