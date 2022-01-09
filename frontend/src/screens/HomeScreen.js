import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Heading } from '@chakra-ui/react';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

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
