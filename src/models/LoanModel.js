import { Sequelize } from "sequelize";
import db from "../connection.js";
import Client from "./clientsModel.js";
import Book from "./bookModel.js"; 

// Modelo de Empréstimos
const Loan = db.define("Loan", {
  idLoan: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idClient: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  idBook: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  loanDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  tableName: "loan", 
  timestamps: false,
});

Loan.belongsTo(Client, { foreignKey: "idClient" });
Loan.belongsTo(Book, { foreignKey: "idBook" });

export default  Loan ;
