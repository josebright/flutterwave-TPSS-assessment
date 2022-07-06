import express from 'express';
import { postTransaction } from '../controllers/index.js';

const router = express.Router();

router.post('/split-payments/compute', postTransaction);

export default router;