import { Router } from "express";
import * as postsController from "./posts.controllers.js";
const router = Router();


router.post("/create", postsController.createPost);
router.get("/get", postsController.getPosts);
router.get("/getby/:id", postsController.getPostById);
router.put("/update/:id", postsController.updatePost);
router.delete("/delete/:id", postsController.deletePost);

router.put("/edit/:id", postsController.editPost);
router.delete("/softDelete/:id", postsController.softDeletePost)


export default router;