import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('assignment6', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});


export const db_connection = async () => {
    try {
        await sequelize.sync({alter: true, force: false});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

