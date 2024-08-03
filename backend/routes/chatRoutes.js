import { Router } from "express";
import chatControllers from "../controllers/chatControllers.js";
import protect from "../middleWare/authMiddleware.js";

const router = Router();

router.route("/").post(protect, chatControllers.accessChat);
router.route("/").get(protect, chatControllers.fetchChats);
router.route("/group").post(protect, chatControllers.createGroupChat);
router.route("/rename").put(protect, chatControllers.renameGroup);
router.route("/groupremove").put(protect, chatControllers.removeFromGroup);
router.route("/groupadd").put(protect, chatControllers.addToGroup);

export default router;