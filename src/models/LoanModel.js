import { Sequelize } from "sequelize";
import db from "../connection.js";

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

export default { Loan };
