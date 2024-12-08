import db from "../connection.js";
import { Sequelize } from "sequelize";

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
    allowNull: true,
  },
}, {
  tableName: "loan", 
  timestamps: false,
});
(async () => {
  const Client = (await import("./clientsModel.js")).default;
  const Book = (await import("./bookModel.js")).default;

  Loan.belongsTo(Client, { foreignKey: "idClient" });
  Loan.belongsTo(Book, { foreignKey: "idBook" });
})();

export default Loan;
