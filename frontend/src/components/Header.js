import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Heading,
	Box,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
} from '@chakra-ui/react';
import {
	MdMenu,
	MdOutlineShoppingCart,
	MdLogin,
	MdLogout,
	MdOutlinePersonAddAlt,
	MdArrowDropDown,
	MdPersonOutline,
	MdListAlt,
} from 'react-icons/md';
import { logout } from '../actions/userActions';

const MenuItems = ({ children, url }) => {
	return (
		<Link
			as={RouterLink}
			to={url}
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
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [show, setShow] = useState(false);

	const loguotHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

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
						<Link as={RouterLink} to="/" _hover={{ color: 'yellow.400' }}>
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
					<MenuItems url="/cart">
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

					{userInfo ? (
						<Menu>
							<MenuButton
								as={Button}
								rightIcon={<MdArrowDropDown />}
								color="black"
							>
								<Flex alignItems="center">
									<Icon as={MdPersonOutline} marginRight="2" />
									{userInfo.name.split(' ')[0]}
								</Flex>
							</MenuButton>
							<MenuList color="black" background="gray.200">
								<MenuItem as={RouterLink} to="/profile">
									<Flex alignItems="center">
										<Icon as={MdListAlt} marginRight="1" />
										Profile - {userInfo.name}
									</Flex>
								</MenuItem>
								<MenuItem onClick={loguotHandler}>
									<Flex alignItems="center">
										<Icon as={MdLogout} marginRight="1" />
										Logout
									</Flex>
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<MenuItems url="/login">
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
					)}
				</Box>
			</Flex>
		</>
	);
};

export default Header;
