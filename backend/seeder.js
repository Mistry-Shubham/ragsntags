import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		const createdUser = await User.insertMany(users);
		const adminUser = createdUser[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log(chalk.green.inverse('Data Imported'));
		process.exit();
	} catch (err) {
		console.error(chalk.red.inverse(`${err}`));
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		console.log(chalk.red.inverse('Data Destroyed'));
		process.exit();
	} catch (err) {
		console.error(chalk.red.inverse(`${err}`));
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
