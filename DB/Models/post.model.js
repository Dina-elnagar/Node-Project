// 2- Define a Sequelize model for posts with the following fields: 
// title, content, and author (linked to the User model)

import {sequelize} from "../connection.js";
import { DataTypes } from 'sequelize';
import user from './user.model.js';
const post = sequelize.define('post', {
    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    deleteAt: {
        type: DataTypes.DATE,
        allowNull: true
   }
  
},
{
    timestamps: true
});

user.hasMany(post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
post.belongsTo(user, {foreignKey: 'userId'});

post.sync({alter: true});






export default post;