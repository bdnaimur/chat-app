import { Router } from "express";
import messageControllers from "../controllers/messageControllers.js";
import protect from "../middleWare/authMiddleware.js";


const router = Router();

router.get("/:chatId",protect, messageControllers.allMessages);
router.post("/",protect, messageControllers.sendMessage);

export default router;