import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Grid,
	Button,
	Heading,
	Box,
	Image,
	Text,
	Link,
} from '@chakra-ui/react';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	cart.itemsPrice = cart.cartItems.reduce(
		(acc, currVal) => acc + currVal.price * currVal.qty,
		0
	);
	cart.shippingPrice = cart.itemsPrice < 1000 ? 500 : 0;
	cart.taxPrice = (18 * cart.itemsPrice) / 100;
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const placeOrderHandler = () => {
		// Add place order action
	};

	return (
		<Flex width="full" paddingY="5" direction="column">
			<CheckoutSteps step1 step2 step3 step4 />

			<Grid templateColumns="3fr 2fr" gap="20">
				{/* column 1 */}
				<Flex direction="column" color="whiteAlpha.700">
					{/* Address */}
					<Box borderBottom="1px" paddingY="6" borderColor="gray.500">
						<Heading
							as="h2"
							fontSize="2xl"
							marginBottom="3"
							fontWeight="semibold"
							color="white"
						>
							Shipping
						</Heading>
						<Text>
							<strong>Address : </strong>
							{cart.shippingAddress.address} {cart.shippingAddress.city}{' '}
							{cart.shippingAddress.postalCode} {cart.shippingAddress.country}
						</Text>
					</Box>

					{/* Payment */}
					<Box borderBottom="1px" paddingY="6" borderColor="gray.500">
						<Heading
							as="h2"
							fontSize="2xl"
							marginBottom="3"
							fontWeight="semibold"
							color="white"
						>
							Payment
						</Heading>
						<Text>
							<strong>Method : </strong>
							<span style={{ textTransform: 'capitalize' }}>
								{cart.paymentMethod}
							</span>
						</Text>
					</Box>

					{/* Order */}
					<Box paddingY="6">
						<Heading
							as="h2"
							fontSize="2xl"
							marginBottom="3"
							fontWeight="semibold"
							color="white"
						>
							Orderd Items
						</Heading>
						{cart.cartItems.length === 0 ? (
							<Message>Your cart is empty</Message>
						) : (
							<Box paddingY="2">
								{cart.cartItems.map((item, idx) => (
									<Flex
										key={idx + 1}
										direction="column"
										marginTop="3"
										paddingBottom="4"
										borderBottom="1px"
										borderColor="gray.600"
									>
										<Grid
											templateColumns="0.5fr 1fr 3fr 1fr 0.5fr 1fr 0.5fr 1fr"
											gap="2"
										>
											{/* index */}
											<Text fontSize="xl">{idx + 1}</Text>
											{/* image */}
											<Image
												src={item.image}
												alt={item.name}
												height="20"
												width="20"
												objectFit="cover"
											/>
											{/* name */}
											<Link
												as={RouterLink}
												to={`/product/${item.product}`}
												fontSize="lg"
											>
												{item.name}
											</Link>
											{/* quantity */}
											<Text fontSize="lg">{item.qty}</Text>
											{/* x */}
											<Text fontSize="lg">X</Text>
											{/* price */}
											<Text fontSize="lg">₹ {item.price}</Text>
											{/* = */}
											<Text fontSize="lg">=</Text>
											{/* total price */}
											<Text fontSize="lg">₹ {item.qty * item.price}</Text>
										</Grid>
									</Flex>
								))}
							</Box>
						)}
					</Box>
				</Flex>

				{/* column 2 */}
				<Flex
					direction="column"
					backgroundColor="whiteAlpha.900"
					justifyContent="space-between"
					padding="8"
					borderRadius="lg"
					height="fit-content"
				>
					<Heading as="h2" marginBottom="6" fontSize="3xl" fontWeight="bold">
						Order Summary
					</Heading>

					<Flex
						alignItems="center"
						justifyContent="space-between"
						paddingY="2"
						borderBottom="1px"
						borderColor="blackAlpha.300"
						fontSize="xl"
					>
						<Text>Items Price:</Text>
						<Text fontWeight="bold">₹ {cart.itemsPrice}</Text>
					</Flex>

					<Flex
						alignItems="center"
						justifyContent="space-between"
						paddingY="2"
						borderBottom="1px"
						borderColor="blackAlpha.300"
						fontSize="xl"
					>
						<Text>Shipping Price:</Text>
						<Text fontWeight="bold">₹ {cart.shippingPrice}</Text>
					</Flex>

					<Flex
						alignItems="center"
						justifyContent="space-between"
						paddingY="2"
						borderBottom="1px"
						borderColor="black"
						fontSize="xl"
					>
						<Text>Tax Price:</Text>
						<Text fontWeight="bold">₹ {cart.taxPrice}</Text>
					</Flex>

					<Flex
						alignItems="center"
						justifyContent="space-between"
						paddingY="2"
						fontSize="2xl"
						fontWeight="semibold"
						color="green.400"
						marginBottom="4"
					>
						<Text>Total Price:</Text>
						<Text fontWeight="bold">₹ {cart.totalPrice}</Text>
					</Flex>

					<Button
						type="button"
						colorScheme="yellow"
						size="lg"
						letterSpacing="wide"
						disabled={cart.cartItems === 0}
						onClick={placeOrderHandler}
					>
						Place Order
					</Button>
				</Flex>
			</Grid>
		</Flex>
	);
};

export default PlaceOrderScreen;
