import { Flex, Heading, Image, Text, Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Link
			as={RouterLink}
			to={`/product/${product._id}`}
			_hover={{ textDecoration: 'none' }}
		>
			<Box
				maxWidth="sm"
				borderRadius="lg"
				backgroundColor="white"
				overflow="hidden"
				transition="0.1s"
				_hover={{ backgroundColor: 'cyan.50', transform: 'scale(1.1)' }}
			>
				<Image
					src={product.image}
					alt={product.name}
					minHeight="360px"
					objectFit="cover"
				/>
				<Flex
					direction="column"
					paddingX="5"
					paddingY="3"
					justifyContent="space-between"
				>
					<Heading as="h4" fontSize="lg">
						{product.name}
					</Heading>
					<Flex justifyContent="space-between" alignItems="center">
						<Rating
							value={product.rating}
							text={`(${product.numReviews}) reviews`}
							color="yellow.500"
						/>
						<Text fontSize="2xl" fontWeight="bold" color="blue.400">
							₹ {product.price}
						</Text>
					</Flex>
				</Flex>
			</Box>
		</Link>
	);
};

export default Product;
