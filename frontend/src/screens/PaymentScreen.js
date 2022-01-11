import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Button,
	Heading,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
	HStack,
} from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod } = cart;

	const [paymentMethodRadio, setPaymentMethodRadio] = useState(
		paymentMethod || 'paypal'
	);

	if (!shippingAddress) {
		navigate('/shipping');
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethodRadio));
		navigate('/placeorder');
	};

	return (
		<Flex width="full" justifyContent="center" alignItems="center" padding="5">
			<FormContainer bgColor="gray.100">
				<CheckoutSteps step1 step2 step3 />

				<Heading as="h1" marginBottom="8" fontSize="3xl">
					Payment Method
				</Heading>

				<form onSubmit={submitHandler}>
					<FormControl id="payment" as="fieldset">
						<FormLabel as="legend">Select Method</FormLabel>
						<RadioGroup defaultValue={paymentMethodRadio}>
							<HStack spacing="24px">
								<Radio
									borderColor="blackAlpha.500"
									value="paypal"
									onChange={(e) => setPaymentMethodRadio(e.target.value)}
								>
									Paypal or Credit/Debit card
								</Radio>
							</HStack>
						</RadioGroup>
					</FormControl>

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

export default PaymentScreen;
