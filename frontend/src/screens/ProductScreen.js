import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Grid,
	Heading,
	Text,
	Image,
	Button,
	Icon,
	Select,
	FormControl,
	FormLabel,
	Textarea,
	Box,
	Link,
	Spacer,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, SetComment] = useState('');

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const {
		loading: loadingCreateReview,
		success: successCreateReview,
		error: errorCreateReview,
	} = productCreateReview;

	useEffect(() => {
		if (successCreateReview) {
			alert('Review submitted');
			setRating(0);
			SetComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(id));
	}, [dispatch, id, successCreateReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const reviewSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(id, { rating, comment }));
	};

	return (
		<>
			<Flex marginBottom="5">
				<Button
					as={RouterLink}
					to="/"
					colorScheme="gray"
					_hover={{ color: 'red' }}
				>
					Go Back
				</Button>
			</Flex>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<Grid templateColumns="5fr 4fr 3fr" gap="10" color="white">
					{/* 1st column */}
					<Image src={product.image} alt={product.name} borderRadius="xl" />

					{/* 2nd column */}
					<Flex direction="column">
						<Heading as="h2" size="md" color="whiteAlpha.600" marginBottom="4">
							{product.brand}
						</Heading>

						<Heading as="h3" size="xl" marginBottom="4">
							{product.name}
						</Heading>

						<Rating
							value={product.rating}
							text={`(${product.numReviews}) reviews`}
							color="yellow.500"
						/>

						<Text fontSize="3xl" color="blue.400" fontWeight="bold" marginY="4">
							₹ {product.price}
						</Text>

						<Text color="whiteAlpha.900">{product.description}</Text>
					</Flex>

					{/* 3rd column */}
					<Flex direction="column">
						<Flex
							justifyContent="space-between"
							padding="2"
							color="whiteAlpha.900"
						>
							Price:
							<Text>₹ {product.price}</Text>
						</Flex>

						<Flex
							justifyContent="space-between"
							padding="2"
							color="whiteAlpha.900"
							borderBottom="1px"
						>
							Status:
							<Text>
								{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
							</Text>
						</Flex>

						<Flex
							marginTop="4"
							color="black"
							justifyContent="space-between"
							alignItems="center"
						>
							<Text color="whiteAlpha.900">Quantity:</Text>
							<Select
								width="30%"
								background="whiteAlpha.800"
								value={qty}
								onChange={(e) => setQty(e.target.value)}
								isDisabled={product.countInStock === 0}
							>
								{[...Array(product.countInStock).keys()].map((i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</Select>
						</Flex>

						<Button
							marginTop="4"
							colorScheme="teal"
							letterSpacing="wide"
							_hover={{ color: 'cyan' }}
							disabled={product.countInStock === 0}
							onClick={addToCartHandler}
						>
							<Icon as={MdAddShoppingCart} marginRight="2" />
							Add to cart
						</Button>
					</Flex>
				</Grid>
			)}

			<Box
				paddingX="10"
				paddingY="4"
				borderRadius="lg"
				backgroundColor="white"
				marginTop="8"
			>
				<Heading as="h3" fontSize="2xl" marginBottom="2">
					Reviews
				</Heading>

				{product.reviews.length === 0 && <Message>No Reviews</Message>}

				{product.reviews.map((review, idx) => (
					<Box
						key={idx + 1}
						paddingX="4"
						paddingY="1"
						backgroundColor="cyan.50"
						borderRadius="xl"
						boxShadow="xl"
						marginBottom="4"
					>
						<Flex direction="column" padding="1">
							<Flex alignItems="center" justifyContent="space-between">
								<Text fontSize="lg" fontWeight="semibold">
									{review.name}
								</Text>
								<Rating value={review.rating} color="yellow.500" />
							</Flex>
							{review.comment}
						</Flex>
					</Box>
				))}
			</Box>

			<Box
				paddingX="10"
				paddingY="4"
				borderRadius="lg"
				backgroundColor="gray.100"
				marginTop="8"
			>
				<Heading as="h3" fontSize="2xl" marginBottom="4">
					Write a Review
				</Heading>

				{errorCreateReview && (
					<Message type="error">{errorCreateReview}</Message>
				)}

				{userInfo ? (
					<form onSubmit={reviewSubmitHandler}>
						<FormControl id="rating">
							<FormLabel>Rating</FormLabel>
							<Select
								placeholder="Select Rating"
								value={rating}
								onChange={(e) => setRating(e.target.value)}
								borderColor="black"
								borderRadius="xl"
							>
								<option value="1">1 - Worst</option>
								<option value="2">2 - Poor</option>
								<option value="3">3 - Moderate</option>
								<option value="4">4 - Good</option>
								<option value="5">5 - Best</option>
							</Select>
						</FormControl>

						<Spacer height="3" />

						<FormControl id="comment">
							<FormLabel>Comment</FormLabel>
							<Textarea
								placeholder="Write your comment"
								value={comment}
								onChange={(e) => SetComment(e.target.value)}
								borderColor="black"
								borderRadius="xl"
							/>
						</FormControl>

						<Spacer height="3" />

						<Button
							type="submit"
							colorScheme="teal"
							color="white"
							_hover={{ color: 'cyan' }}
						>
							Post
						</Button>
					</form>
				) : (
					<Message>
						Please{' '}
						<Link as={RouterLink} to="/login">
							Login
						</Link>{' '}
						to write a review
					</Message>
				)}
			</Box>
		</>
	);
};

export default ProductScreen;
