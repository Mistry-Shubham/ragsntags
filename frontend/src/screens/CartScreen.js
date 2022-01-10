import { Link as RouterLink } from 'react-router-dom';
import { Flex, Button, Heading } from '@chakra-ui/react';

const CartScreen = () => {
	return (
		<>
			<Flex
				marginBottom="5"
				justifyContent="space-between"
				alignItems="center"
				marginBottom="8"
			>
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
		</>
	);
};
export default CartScreen;
