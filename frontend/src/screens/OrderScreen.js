import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
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
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../actions/orderActions';
import {
	OREDR_PAY_RESET,
	OREDR_DETAILS_RESET,
	OREDR_DELIVERY_RESET,
} from '../constants/orderConstants';

const OrderScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: orderId } = useParams();

	const [sdkReady, setSdkReady] = useState(false);

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = orderPay;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderDelivery = useSelector((state) => state.orderDelivery);
	const {
		loading: loadingDelivery,
		success: successDelivery,
		error: errorDelivery,
	} = orderDelivery;

	useEffect(() => {
		dispatch({ type: OREDR_DETAILS_RESET });
	}, [dispatch, orderId]);

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order.user.name || successPay || successDelivery) {
			dispatch({ type: OREDR_PAY_RESET });
			dispatch({ type: OREDR_DELIVERY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.ispaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [
		dispatch,
		orderId,
		order,
		successPay,
		navigate,
		successDelivery,
		userInfo,
	]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliveryHandler = () => {
		dispatch(deliverOrder(order));
	};

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
						<Flex color="black" marginTop="2">
							{order.isPaid ? (
								<Message type="success">
									Paid on : {order.paidAt.split('T')[0]}
								</Message>
							) : (
								<Message type="error">Not Paid</Message>
							)}
						</Flex>
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

					{!order.isPaid && (
						<Box marginTop="4">
							{loadingPay && <Loader />}
							{errorPay && <Message type="error">{errorPay}</Message>}
							{!sdkReady ? (
								<Loader />
							) : (
								<PayPalButton
									amount={order.totalPrice}
									onSuccess={successPaymentHandler}
								/>
							)}
						</Box>
					)}

					{loadingDelivery && <Loader />}
					{errorDelivery && <Message type="error">{errorDelivery}</Message>}
					{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
						<Button
							type="button"
							onClick={deliveryHandler}
							colorScheme="teal"
							color="white"
							_hover={{ color: 'cyan' }}
						>
							Mark as Delivered
						</Button>
					)}
				</Flex>
			</Grid>
		</Flex>
	);
};

export default OrderScreen;
