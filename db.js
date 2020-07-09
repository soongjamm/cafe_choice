import dotenv from "dotenv";
dotenv.config();

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('cafe_choice', process.env.MYSQL_UNAME, process.env.MYSQL_PW, {
    host: 'localhost',
    dialect: 'mysql'
});



const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('🥰connection has been established successfully.');
    } catch (error) {
        console.error('Unale to connect to the database', error);

    }
}

init();

