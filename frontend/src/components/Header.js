import { useState } from 'react';
import { Flex, Heading, Box, Icon, Link } from '@chakra-ui/react';
import {
	MdMenu,
	MdOutlineShoppingCart,
	MdLogin,
	MdOutlinePersonAddAlt,
} from 'react-icons/md';

const MenuItems = ({ children, url }) => {
	return (
		<Link
			href={url}
			marginTop={{ base: 4, md: 0 }}
			fontSize="md"
			fontWeight="bold"
			textTransform="uppercase"
			marginRight="5"
			display="block"
			color="whiteAlpha.900"
			_hover={{ color: 'orange.400' }}
		>
			{children}
		</Link>
	);
};

const Header = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<Flex
				as="header"
				padding="6"
				align="center"
				justifyContent="space-between"
				wrap="wrap"
				width="100%"
				top="0"
				zIndex="2"
				position="fixed"
				color="white"
				backgroundColor="teal.500"
			>
				<Flex align="center" marginRight="5">
					<Heading as="h1" fontWeight="bold" size="md">
						<Link href="/" _hover={{ color: 'yellow.400' }}>
							Rags & Tags
						</Link>
					</Heading>
				</Flex>

				<Box
					display={{ base: 'block', md: 'none', sm: 'block' }}
					onClick={() => setShow(!show)}
				>
					<Icon as={MdMenu} height="6" width="6" _hover={{ color: 'red' }} />
					<title>Menu</title>
				</Box>

				<Box
					display={{ base: show ? 'block' : 'none', md: 'flex' }}
					width={{ base: 'full', md: 'auto' }}
					alignItems="center"
				>
					<MenuItems url="/">
						<Flex alignItems="center">
							<Icon
								as={MdOutlineShoppingCart}
								height="4"
								width="4"
								marginRight="1"
							/>
							Cart
						</Flex>
					</MenuItems>

					<MenuItems url="/">
						<Flex alignItems="center">
							<Icon as={MdLogin} height="4" width="4" marginRight="1" />
							Login /
							<Icon
								as={MdOutlinePersonAddAlt}
								height="4"
								width="4"
								marginX="1"
							/>
							Register
						</Flex>
					</MenuItems>
				</Box>
			</Flex>
		</>
	);
};

export default Header;
