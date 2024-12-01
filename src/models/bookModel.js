import { Sequelize } from 'sequelize';
import db from '../connection.js';

export default db.define('books', {
    idBook: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Author: {
        type: Sequelize.STRING,
        allowNull: false
    },

    pubDate:{
        type:sequilize.STRING,
        allowNull:false
    }



})