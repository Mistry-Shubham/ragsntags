import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import {
	Flex,
	Grid,
	Heading,
	Text,
	Image,
	Button,
	Icon,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';
import Rating from '../components/Rating';

const ProductScreen = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			setProduct(data);
		};

		fetchProduct();
	}, []);

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

					<Button
						marginTop="4"
						colorScheme="teal"
						letterSpacing="wide"
						_hover={{ color: 'cyan' }}
						disabled={product.countInStock === 0}
					>
						<Icon as={MdAddShoppingCart} marginRight="2" />
						Add to cart
					</Button>
				</Flex>
			</Grid>
		</>
	);
};

export default ProductScreen;
