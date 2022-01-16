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
	Text,
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
	MdSettings,
	MdPeopleAlt,
	MdShoppingBag,
} from 'react-icons/md';
import { logout } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

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

	const profileClickHandler = () => {
		dispatch({ type: USER_UPDATE_PROFILE_RESET });
		navigate('/profile');
	};

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
				zIndex="101"
				position="fixed"
				color="white"
				backgroundColor="teal.500"
			>
				<Flex align="center" marginRight="5">
					<Heading as="h1" fontWeight="bold" size="md">
						<Link as={RouterLink} to="/" _hover={{ color: 'yellow.400' }}>
							<Flex>
								<Text marginRight="1" color="white">
									Rags
								</Text>
								<Text marginRight="1" color="black">
									&
								</Text>
								<Text marginRight="1" color="red">
									Tags
								</Text>
							</Flex>
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
					<Flex alignItems="center" marginTop={{ sm: '4', md: '0' }}>
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
									<MenuItem onClick={profileClickHandler}>
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

						{/* admin menu */}
						{userInfo && userInfo.isAdmin && (
							<Menu>
								<MenuButton
									marginLeft="4"
									as={Button}
									rightIcon={<MdArrowDropDown />}
									color="white"
									backgroundColor="teal.500"
									_hover={{ backgroundColor: 'teal.400', color: 'orange.400' }}
								>
									<Flex alignItems="center">
										<Icon
											as={MdSettings}
											height="4"
											width="4"
											marginRight="1"
										/>
										Manage
									</Flex>
								</MenuButton>
								<MenuList color="black" background="gray.200">
									<MenuItem as={RouterLink} to="/admin/userslist">
										<Flex alignItems="center">
											<Icon as={MdPeopleAlt} marginRight="2" />
											Users List
										</Flex>
									</MenuItem>
									<MenuItem as={RouterLink} to="/admin/productslist">
										<Flex alignItems="center">
											<Icon as={MdShoppingBag} marginRight="2" />
											Products List
										</Flex>
									</MenuItem>
									<MenuItem as={RouterLink} to="/admin/orderslist">
										<Flex alignItems="center">
											<Icon as={MdListAlt} marginRight="2" />
											Orders List
										</Flex>
									</MenuItem>
								</MenuList>
							</Menu>
						)}
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default Header;
