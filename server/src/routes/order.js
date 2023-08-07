import express from 'express';
import { getById, getAll, create, remove, update, paymentIPN, getByUserId } from '../controllers/order';
// import { checkPermission } from '../middlewares/checkPermission';
const router = express.Router();

router.get('/order', getAll);
router.get('/order-received', paymentIPN)
router.get('/order/:id', getById);
router.post('/order/:id/pay', getById);
router.get('/order/user/:id', getByUserId);
router.post('/order', create);
router.patch('/order/:id', update);
router.delete('/order/:id', remove);

export default router;
