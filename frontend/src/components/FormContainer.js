import { Flex } from '@chakra-ui/react';

const FormContainer = ({ children, bgColor = 'white', width = 'xl' }) => {
	return (
		<Flex
			direction="column"
			borderRadius="lg"
			padding="8"
			bgColor={bgColor}
			width={width}
		>
			{children}
		</Flex>
	);
};

export default FormContainer;
