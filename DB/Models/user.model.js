// 1- Define a Sequelize model for users with the following fields: 
// username, email, and password.


import {sequelize} from "../connection.js";
import { DataTypes } from 'sequelize';


const user = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    userName:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
{
    timestamps: true
});


export default user;