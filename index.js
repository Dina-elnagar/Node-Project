import express from 'express'
const app = express()
const port = 3000
import {db_connection} from './DB/connection.js'
import user from './DB/Models/user.model.js'
import post from './DB/Models/post.model.js'
import comment from './DB/Models/comment.model.js'
import userRouter from './src/Modules/users/users.routes.js'
import postRouter from './src/Modules/posts/posts.routes.js'
import commentRouter from './src/Modules/comments/comments.routes.js'

app.use(express.json())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

user;
post;
comment;
app.get('/', (req, res) => res.send('Hello World!'))

db_connection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))