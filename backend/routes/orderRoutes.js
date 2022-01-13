import express from 'express';
import {
	createNewOrder,
	getOrderById,
	orderUpdateToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createNewOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, orderUpdateToPaid);

export default router;
