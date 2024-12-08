import { Sequelize } from "sequelize";
import db from "../connection.js";

// Modelo de Usuários
const client = db.define(
  "client",
  {
    idClient: {
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
      allowNull: false,
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
  },
  {
    tableName: "client",
    timestamps: false,
    underscored: false,
  }
);

export default client;
