import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (err) {
			console.error(err);
			throw new Error('Not authorized, token failed');
		}
	} else {
		throw new Error('Token not found');
	}
});
