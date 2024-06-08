import { Router } from "express";
const router = Router();
import * as commentsController from "./comments.controllers.js";

router.post("/create", commentsController.create);
router.get("/", commentsController.getComments);
router.get("/:id", commentsController.getCommentById);
router.put("/update/:id", commentsController.updateComment);
router.delete("/delete/:id", commentsController.deleteComment);

export default router;