import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('bonrxrjqoytnpvd2kxzx', 'ue4zublz5zjglryf', 'bp37jTthMCeLaFGEZBn3',{
    host: 'bonrxrjqoytnpvd2kxzx-mysql.services.clever-cloud.com',
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

