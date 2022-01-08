import { Grid, Heading } from '@chakra-ui/react';
import Product from '../components/Product';
import products from '../products';

const HomeScreen = () => {
	return (
		<>
			<Heading as="h2" marginBottom="8" fontSize="3xl" color="white">
				Latest Products
			</Heading>

			<Grid templateColumns="repeat(4,1fr)" gap="8">
				{products.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</Grid>
		</>
	);
};

export default HomeScreen;
