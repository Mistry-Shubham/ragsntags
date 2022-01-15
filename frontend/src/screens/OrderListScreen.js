import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Box,
	Heading,
	Button,
	Image,
	Icon,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';
import { MdInfoOutline, MdCancel } from 'react-icons/md';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			navigate('/');
		}
	}, [dispatch, navigate, userInfo]);

	return (
		<>
			<Heading as="h1" fontSize="3xl" marginBottom="8" color="white">
				Products List
			</Heading>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<Box background="white" borderRadius="lg" paddingY="2">
					<Table variant="striped" size="lg">
						<Thead>
							<Tr>
								<Th>SR.NO.</Th>
								<Th>ID</Th>
								<Th>USER</Th>
								<Th>TOTAL PRICE</Th>
								<Th>PAID</Th>
								<Th>DELIVERED</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{orders.map((order, idx) => (
								<Tr key={idx + 1}>
									<Td>{idx + 1}</Td>
									<Td>{order._id}</Td>
									<Td>{order.user.name}</Td>
									<Td>₹{order.totalPrice}</Td>
									<Td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<Icon as={MdCancel} color="red" fontSize="3xl" />
										)}
									</Td>
									<Td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<Icon as={MdCancel} color="red" fontSize="3xl" />
										)}
									</Td>
									<Td>
										<Button
											as={RouterLink}
											to={`/order/${order._id}`}
											colorScheme="teal"
											color="white"
											_hover={{ color: 'cyan' }}
										>
											<Icon as={MdInfoOutline} marginRight="2" />
											Details
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
};

export default OrderListScreen;
