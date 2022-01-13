import express from 'express';
import {
	createNewOrder,
	getOrderById,
	orderUpdateToPaid,
	getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createNewOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, orderUpdateToPaid);

export default router;
