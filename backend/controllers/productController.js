import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import fs from 'fs';

//@desc     Fetch all products
//@route    GET/api/products
//@access   public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

//@desc     Fetch single products
//@route    GET/api/products/:id
//@access   public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: 'Product not found' });
	}
});

//@desc     Delete a products
//@route    DELETE/api/products/:id
//@access   private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	const filePath = `./uploads/${product.image.substring(9)}`;

	if (product) {
		fs.unlink(filePath, function (err) {
			if (err) throw err;
			console.log('deleted');
		});

		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

//@desc     Create a new products
//@route    POST/api/products
//@access   private/admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample product',
		price: 0,
		user: req.user._id,
		brand: 'Sample brand',
		image: '/images/sample.jpg',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

//@desc     Update a products
//@route    PUT/api/products/:id
//@access   private/admin
export const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, brand, image, category, countInStock, description } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.brand = brand;
		product.image = image;
		product.category = category;
		product.countInStock = countInStock;
		product.description = description;

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

//@desc     Add a products review
//@route    POST/api/products/:id/reviews
//@access   private
export const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already Reviewed');
		}

		const review = {
			name: req.user.name,
			rating: +rating,
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) /
			product.numReviews;

		await product.save();
		res.status(201).json({ message: 'Review added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
