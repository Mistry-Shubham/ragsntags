import { useEffect } from 'react';
import {
	Link as RouterLink,
	useParams,
	useSearchParams,
	useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Grid,
	Box,
	Button,
	Image,
	Heading,
	Text,
	Link,
	Select,
	Icon,
} from '@chakra-ui/react';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: productId } = useParams();
	const [searchParams] = useSearchParams();
	const qty = searchParams.get('qty');

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate('/login?redirect=shipping');
	};

	return (
		<>
			<Flex justifyContent="space-between" alignItems="center" marginBottom="8">
				<Heading as="h2" fontSize="3xl" color="white">
					Shopping Cart
				</Heading>
				<Button
					as={RouterLink}
					to="/"
					colorScheme="gray"
					_hover={{ color: 'blue' }}
				>
					Shop More
				</Button>
			</Flex>

			{cartItems.length === 0 ? (
				<Message>
					Your Cart is Empty{' '}
					<Link as={RouterLink} to="/">
						Go Back
					</Link>
				</Message>
			) : (
				<Grid templateColumns="4fr 2fr" gap="10">
					{/* 1st main column order list */}
					<Flex direction="column">
						{cartItems.map((item, idx) => (
							<Grid
								key={item.product}
								templateColumns="0.5fr 1fr 4fr 2fr 2fr 1fr"
								alignItems="center"
								justifyContent="space-between"
								size="100%"
								borderBottom="1px"
								borderColor="gray.200"
								paddingX="2"
								paddingY="4"
								color="whiteAlpha.900"
							>
								{/* 1st column index */}
								<Text fontSize="25px">{idx + 1}</Text>

								{/* 2nd column image */}
								<Image
									src={item.image}
									alt={item.name}
									height="14"
									width="14"
									objectFit="cover"
								/>

								{/* 3rd column name */}
								<Text fontSize="lg" fontWeight="semibold">
									<Link as={RouterLink} to={`/product/${item.product}`}>
										{item.name}
									</Link>
								</Text>

								{/* 4th column */}
								<Text fontWeight="bold" fontSize="lg" color="blue.400">
									₹ {item.price}
								</Text>

								{/* 5th column */}
								<Select
									width="60%"
									color="black"
									background="whiteAlpha.800"
									value={item.qty}
									onChange={(e) =>
										dispatch(addToCart(item.product, +e.target.value))
									}
								>
									{[...Array(item.countInStock).keys()].map((i) => (
										<option key={i + 1} value={i + 1}>
											{i + 1}
										</option>
									))}
								</Select>

								{/* 6th column */}
								<Button
									type="button"
									colorScheme="red"
									fontSize="20"
									onClick={() => removeFromCartHandler(item.product)}
								>
									<Icon as={MdOutlineRemoveShoppingCart} />
								</Button>
							</Grid>
						))}
					</Flex>

					{/* 2nd mian column Checkout */}
					<Flex
						direction="column"
						borderRadius="lg"
						border="1px"
						height="fit-content"
						borderColor="white"
					>
						<Flex
							justifyContent="space-between"
							padding="4"
							color="whiteAlpha.900"
						>
							<Heading as="h3" size="lg" marginBottom="4">
								Subtotal(
								{cartItems.reduce(
									(acc, currVal) => acc + (+currVal.qty || 1),
									0
								)}
								)
							</Heading>

							<Text
								color="blue.400"
								fontSize="2xl"
								fontWeight="bold"
								marginBottom="4"
							>
								₹
								{cartItems.reduce(
									(acc, currVal) => acc + currVal.price * (currVal.qty || 1),
									0
								)}
							</Text>
						</Flex>

						<Button
							type="button"
							colorScheme="teal"
							margin="4"
							paddingY="6"
							letterSpacing="wide"
							fontSize="xl"
							_hover={{ color: 'cyan' }}
							onClick={checkoutHandler}
						>
							Proceed To Checkout
						</Button>
					</Flex>
				</Grid>
			)}
		</>
	);
};
export default CartScreen;
