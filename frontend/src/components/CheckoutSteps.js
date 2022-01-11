import { Link as RouterLink } from 'react-router-dom';
import {
	Flex,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from '@chakra-ui/react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<Flex justifyContent="center" marginBottom="8">
			<Breadcrumb separator={<MdOutlineArrowForwardIos />}>
				<BreadcrumbItem>
					{step1 ? (
						<BreadcrumbLink>Login</BreadcrumbLink>
					) : (
						<BreadcrumbLink
							disabled
							color="gray.400"
							_hover={{ textDecoration: 'none' }}
						>
							Login
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>

				<BreadcrumbItem>
					{step2 ? (
						<BreadcrumbLink as={RouterLink} to="/shipping">
							Shipping
						</BreadcrumbLink>
					) : (
						<BreadcrumbLink
							disabled
							color="gray.400"
							_hover={{ textDecoration: 'none' }}
						>
							Shipping
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>

				<BreadcrumbItem>
					{step3 ? (
						<BreadcrumbLink as={RouterLink} to="/payment">
							Payment
						</BreadcrumbLink>
					) : (
						<BreadcrumbLink
							disabled
							color="gray.400"
							_hover={{ textDecoration: 'none' }}
						>
							Payment
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>

				<BreadcrumbItem>
					{step4 ? (
						<BreadcrumbLink as={RouterLink} to="/placeorder">
							Place Order
						</BreadcrumbLink>
					) : (
						<BreadcrumbLink
							disabled
							color="gray.400"
							_hover={{ textDecoration: 'none' }}
						>
							Place Order
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
			</Breadcrumb>
		</Flex>
	);
};

export default CheckoutSteps;
