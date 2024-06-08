// 3- Define a Sequelize model for comments with the following 
// fields: content, postId (linked to the post model), and userId
// (linked to the User model)

import {sequelize} from "../connection.js";
import { DataTypes } from 'sequelize';
import user from './user.model.js';
import post from "./post.model.js";


const comment = sequelize.define('comment', {
    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    content:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
  
},
{
    timestamps: true
});

user.hasMany(comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(user, {foreignKey: 'userId'});
post.hasMany(comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
comment.belongsTo(post, {foreignKey: 'postId'});
export default comment;