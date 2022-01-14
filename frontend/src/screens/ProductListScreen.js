import { useEffect } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { MdAddBox, MdOutlineDeleteForever, MdModeEdit } from 'react-icons/md';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts());
		} else {
			navigate('/');
		}
	}, [userInfo, dispatch, navigate]);

	const deleteProductHandler = (id, name) => {
		// delete product acttion
	};

	const createProductHandler = () => {
		// create product action
	};

	return (
		<>
			<Flex justifyContent="space-between" alignItems="center" marginBottom="8">
				<Heading as="h1" fontSize="3xl" color="white">
					Products List
				</Heading>

				<Button
					colorScheme="teal"
					marginTop="2"
					onClick={createProductHandler}
					_hover={{ color: 'cyan' }}
				>
					<Icon as={MdAddBox} marginRight="2" />
					Create Product
				</Button>
			</Flex>

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
								<Th>IMAGE</Th>
								<Th>NAME</Th>
								<Th>BRAND</Th>
								<Th>PRICE</Th>
								<Th>CATEGORY</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{products.map((product, idx) => (
								<Tr key={idx + 1}>
									<Td>{idx + 1}</Td>
									<Td>{product._id}</Td>
									<Td>
										<Image src={product.image} alt={product.name} height="20" />
									</Td>
									<Td>
										<Link as={RouterLink} to={`/product/${product._id}`}>
											{product.name}
										</Link>
									</Td>
									<Td>{product.brand}</Td>
									<Td>₹{product.price}</Td>
									<Td>{product.category}</Td>
									<Td>
										<Flex justifyContent="flex-end">
											<Button
												colorScheme="teal"
												marginRight="4"
												as={RouterLink}
												to={`/admin/product/${product._id}/edit`}
												_hover={{ color: 'cyan' }}
											>
												<Icon as={MdModeEdit} fontSize="2xl" />
											</Button>
											<Button
												colorScheme="red"
												onClick={() =>
													deleteProductHandler(product._id, product.name)
												}
												_hover={{ color: 'black' }}
											>
												<Icon as={MdOutlineDeleteForever} fontSize="2xl" />
											</Button>
										</Flex>
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

export default ProductListScreen;
