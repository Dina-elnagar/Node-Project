// 6- Implement routes and controllers for creating, reading, 
// updating, and deleting comments.

import Comment from '../../../DB/Models/comment.model.js'

export const create = async(req, res, next) => {
    const {content, postId, userId} = req.body;
    await Comment.create({
        content,
        postId,
        userId
    }).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        next(err);
    });
}

export const getComments = async(req, res, next) => {
    await Comment.findAll().then(comments => {
        res.status(200).json(comments);
    }).catch(err => {
        next(err);
    });
}

export const getCommentById = async(req, res, next) => {
    const {id} = req.params;
    await Comment.findByPk(id).then(comment => {
        if(comment){
            res.status(200).json(comment);
        }else{
            res.status(404).json({message: 'Comment not found'});
        }
    }).catch(err => {
        next(err);
    });
}

export const updateComment = async(req, res, next) => {
    const {id} = req.params;
    const {content} = req.body;
    await Comment.update({content}, {where: {id}}).then(([rowsUpdated]) => {
        if(rowsUpdated === 1){
            res.status(200).json({message: 'Comment updated successfully'});
        }else{
            res.status(404).json({message: 'Comment not found'});
        }
    }).catch(err => {
        next(err);
    });
}

export const deleteComment = async(req, res, next) => {
    const {id} = req.params;
    await Comment.destroy({where: {id}}).then(rowsDeleted => {
        if(rowsDeleted === 1){
            res.status(200).json({message: 'Comment deleted successfully'});
        }else{
            res.status(404).json({message: 'Comment not found'});
        }
    }).catch(err => {
        next(err);
    });
}