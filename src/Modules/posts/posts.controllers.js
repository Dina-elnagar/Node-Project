// 5- Implement routes and controllers for creating, reading, 
// updating, and deleting posts

import Post from '../../../DB/Models/post.model.js'
import User from '../../../DB/Models/user.model.js'

export const createPost = async(req, res, next) => {
    const {title, content,userId} = req.body;
    await Post.create({
        title,
        content,
        userId
    }).then(post => {
        res.status(201).json(post);
    }).catch(err => {
        next(err);
    });
}


export const getPosts = async(req, res, next) => {
    await Post.findAll().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        next(err);
    });
}

//10- Get a specific post with the author.
export const getPostById = async(req, res, next) => {
    const {id} = req.params;
    await Post.findByPk(id).then(post => {
        if(post){
            User.findByPk(post.userId).then(user => {
                post.dataValues.author = user;
                res.status(200).json(post);
            });
        }else{
            res.status(404).json({message: 'Post not found'});
        }
    }).catch(err => {
        next(err);
    });
}
 

export const updatePost = async(req, res, next) => {
    const {id} = req.params;
    const {title, content} = req.body;
    await Post.update({title, content}, {where: {id}}).then(([rowsUpdated]) => {
        if(rowsUpdated === 1){
            res.status(200).json({message: 'Post updated successfully'});
        }else{
            res.status(404).json({message: 'Post not found'});
        }
    }).catch(err => {
        next(err);
    });
}


export const deletePost = async(req, res, next) => {
    const {id} = req.params;
    await Post.destroy({where: {id}}).then(rowsDeleted => {
        if(rowsDeleted === 1){
            res.status(200).json({message: 'Post deleted successfully'});
        }else{
            res.status(404).json({message: 'Post not found'});
        }
    }).catch(err => {
        next(err);
    });
}

// 7- Ensure that users can only edit or delete (soft delete) their posts.

export const editPost = async(req, res, next) => {
    const {id} = req.params;
    const {title, content, userId} = req.body;
    await Post.findOne({where: {id}}).then(post => {
        if(post){
            if(post.userId !== userId){
                res.status(403).json({message: 'You are not authorized to edit this post'});
            } 
            Post.update({title, content}, {where: {id}}).then(([rowsUpdated]) => {
                if(rowsUpdated === 1){
                    res.status(200).json({message: 'Post updated successfully'});
                }else{
                    res.status(404).json({message: 'Post not found'});
                }
            }).catch(err => {
                next(err);
            });
        }
    }).catch(err => {
        next(err);
        
    });
    // res.status(404).json({message: 'Post not found'});
}


export const softDeletePost = async(req, res, next) => {
    const {id} = req.params;
    const {userId} = req.body;
    await Post.findOne({where: {id}}).then(post => {
        if(post){
            if(post.userId !== userId){
                res.status(403).json({message: 'You are not authorized to delete this post'});
            } 
            Post.update({deleteAt: new Date()}, {where: {id}}).then(([rowsUpdated]) => {
                if(rowsUpdated === 1){
                    res.status(200).json({message: 'Post deleted successfully'});
                }else{
                    res.status(404).json({message: 'Post not found'});
                }
            }).catch(err => {
                next(err);
            });
        }
    }).catch(err => {
        next(err);
        
    });

}