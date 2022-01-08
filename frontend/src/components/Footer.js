import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
	return (
		<Flex
			as="footer"
			alignItems="center"
			paddingY="8"
			marginTop="400px"
			justifyContent="center"
			backgroundColor="teal.500"
		>
			<Text fontSize="lg" fontWeight="semibold" color="white">
				Copyright 2022. All Rights Reserved.
			</Text>
		</Flex>
	);
};

export default Footer;
