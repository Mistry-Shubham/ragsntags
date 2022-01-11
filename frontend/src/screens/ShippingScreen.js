import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Spacer,
} from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [country, setCountry] = useState(shippingAddress.country || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ''
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
	};

	return (
		<Flex width="full" justifyContent="center" alignItems="center" padding="5">
			<FormContainer bgColor="gray.100">
				<CheckoutSteps step1 step2 />

				<Heading as="h1" marginBottom="8" fontSize="3xl">
					Shipping Address
				</Heading>

				<form onSubmit={submitHandler}>
					<FormControl id="address">
						<FormLabel>Address</FormLabel>
						<Input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Enter your Address"
							borderRadius="50px"
							borderColor="black"
							_hover={{ borderColor: 'gray.300' }}
							_focus={{ background: 'white' }}
						/>
					</FormControl>

					<Spacer height="3" />

					<FormControl id="city">
						<FormLabel>City</FormLabel>
						<Input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder="Enter your City"
							borderRadius="50px"
							borderColor="black"
							_hover={{ borderColor: 'gray.300' }}
							_focus={{ background: 'white' }}
						/>
					</FormControl>

					<Spacer height="3" />

					<FormControl id="country">
						<FormLabel>Country</FormLabel>
						<Input
							type="text"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							placeholder="Enter your Country"
							borderRadius="50px"
							borderColor="black"
							_hover={{ borderColor: 'gray.300' }}
							_focus={{ background: 'white' }}
						/>
					</FormControl>

					<Spacer height="3" />

					<FormControl id="postalCode">
						<FormLabel>Postal Code</FormLabel>
						<Input
							type="text"
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
							placeholder="Enter your Postal Code"
							borderRadius="50px"
							borderColor="black"
							_hover={{ borderColor: 'gray.300' }}
							_focus={{ background: 'white' }}
						/>
					</FormControl>

					<Spacer height="3" />

					<Button
						type="submit"
						marginTop="3"
						colorScheme="teal"
						color="white"
						_hover={{ color: 'cyan' }}
						fontWeight="bold"
					>
						Continue
					</Button>
				</form>
			</FormContainer>
		</Flex>
	);
};

export default ShippingScreen;
