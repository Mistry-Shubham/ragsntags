import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});

		console.log(chalk.cyan.bold(`MongoDB Connected: ${conn.connection.host}`));
	} catch (err) {
		console.error(chalk.red.underline(`Error: ${err.message}`));
		process.exit(1);
	}
};

export default connectDB;
