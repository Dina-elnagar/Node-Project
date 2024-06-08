import User from '../../../DB/Models/user.model.js'
import bcrypt from 'bcryptjs'


async function uniqueEmail(email){
    const user = await User.findOne({where: {email: email}});
    if(user){
        return true;
    }
    return false
}

// 8- Use bcrypt.js to securely hash and store user passwords.

export const register = async(req, res,next) => {
    const {userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);
   //email must be unique
   if(await uniqueEmail(email)){
       return res.status(400).json({message: 'Email already exists'});
   }
   await  User.create({
        userName,
        email,
       password: hashedPassword
    }) .then(user => {
        res.status(201).json(user);
    }).catch(err => {
        next(err);
    });
};


export const login = async(req, res, next) => {
    const {email, password} = req.body;
    if(await uniqueEmail(email) === false){
        return res.status(400).json({message: 'Invalid email'});
    }
    const user = await User.findOne({where: {email: email}});
    const comparePassword = bcrypt.compareSync(password, user.password);
    if(!comparePassword){
        return res.status(400).json({message: 'Invalid password'});
    }
    res.status(200).json({message: 'Login successfully', user: user});
}



export const logout = async(req, res) => {
    res.status(200).json({message: 'Logout successfully'});
}





// 9- Special endpoint to get a specific user with a specific post and 
// post’s comments.

export const getUserWithPostAndComments = async(req, res, next) => {
    const {id} = req.params;
    await User.findByPk(id).then(user => {
        if(user){
            user.getPosts({include: 'comments'}).then(posts => {
                res.status(200).json({user, posts});
            });
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }).catch(err => {
        next(err);
    });
}

