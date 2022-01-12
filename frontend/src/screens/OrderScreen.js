import { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: orderId } = useParams();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message type="error">{error}</Message>
	) : (
		<Flex width="full" paddingY="5">
			<Grid templateColumns="3fr 2fr" gap="20">
				{/* column 1 */}
				<Flex direction="column" color="whiteAlpha.700">
					{/* User Details */}
					<Box borderBottom="1px" paddingY="6" borderColor="gray.500">
						<Heading
							as="h2"
							fontSize="2xl"
							marginBottom="3"
							fontWeight="semibold"
							color="white"
						>
							User Details
						</Heading>
						<Flex direction="column">
							<Text>
								<strong>Name : </strong>
								{order.user.name}
							</Text>
							<Text>
								<strong>Email : </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</Text>
						</Flex>
					</Box>

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
							{order.shippingAddress.address} {order.shippingAddress.city}{' '}
							{order.shippingAddress.postalCode} {order.shippingAddress.country}
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
								{order.paymentMethod}
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
						{order.orderItems.length === 0 ? (
							<Message>Your order is empty</Message>
						) : (
							<Box paddingY="2">
								{order.orderItems.map((item, idx) => (
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
						<Text fontWeight="bold">₹ {order.itemsPrice}</Text>
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
						<Text fontWeight="bold">₹ {order.shippingPrice}</Text>
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
						<Text fontWeight="bold">₹ {order.taxPrice}</Text>
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
						<Text fontWeight="bold">₹ {order.totalPrice}</Text>
					</Flex>
				</Flex>
			</Grid>
		</Flex>
	);
};

export default OrderScreen;
