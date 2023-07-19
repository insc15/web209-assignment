import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product";
// import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();
import multer from 'multer';
const upload = multer()

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", upload.single('image'), create);
router.patch("/products/:id", update);
router.delete("/products/:id", remove);

export default router;
