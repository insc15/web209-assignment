import express from 'express';
import { createAccount, getAccount, getAllAccounts, removeAccount, updateAccount } from '../controllers/account';
// import { checkPermission } from '../middlewares/checkPermission';
const router = express.Router();

router.get('/account', getAllAccounts);
router.get('/account/:id', getAccount);
router.post('/account', createAccount);
router.patch('/account/:id', updateAccount);
router.delete('/account/:id', removeAccount);

export default router;
