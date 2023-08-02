import express from 'express';
import { getById, getAll, create, remove, update } from '../controllers/order';
// import { checkPermission } from '../middlewares/checkPermission';
const router = express.Router();

router.get('/order', getAll);
router.get('/order/:id', getById);
router.post('/order', create);
router.patch('/order/:id', update);
router.delete('/order/:id', remove);

export default router;
