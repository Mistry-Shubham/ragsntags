import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Grid,
	Button,
	FormControl,
	FormLabel,
	Input,
	Link,
	Heading,
	Text,
	Spacer,
	Icon,
} from '@chakra-ui/react';
import { MdPublishedWithChanges } from 'react-icons/md';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user, error } = userDetails;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [navigate, dispatch, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
			dispatch(getUserDetails());
		}
	};

	return (
		<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} padding="5" gap="10">
			<Flex
				width="full"
				justifyContent="center"
				alignItems="center"
				padding="5"
			>
				<FormContainer bgColor="gray.100">
					<Heading as="h1" marginBottom="8" fontSize="3xl">
						My Profile
					</Heading>

					{error && <Message type="error">{error}</Message>}
					{message && <Message type="error">{message}</Message>}
					{success && <Message type="success">Profile Updated</Message>}

					<form onSubmit={submitHandler}>
						<FormControl id="name">
							<FormLabel>Name</FormLabel>
							<Input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter your Full Name"
								borderRadius="50px"
								borderColor="black"
								_hover={{ borderColor: 'gray.300' }}
								_focus={{ background: 'white' }}
							/>
						</FormControl>

						<Spacer height="3" />

						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your Email"
								borderRadius="50px"
								borderColor="black"
								_hover={{ borderColor: 'gray.300' }}
								_focus={{ background: 'white' }}
							/>
						</FormControl>

						<Spacer height="3" />

						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your Password"
								borderRadius="50px"
								borderColor="black"
								_hover={{ borderColor: 'gray.300' }}
								_focus={{ background: 'white' }}
							/>
						</FormControl>

						<Spacer height="3" />

						<FormControl id="confirmPassword">
							<FormLabel>Confirm Password</FormLabel>
							<Input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Re-Enter your Password"
								borderRadius="50px"
								borderColor="black"
								_hover={{ borderColor: 'gray.300' }}
								_focus={{ background: 'white' }}
							/>
						</FormControl>

						<Spacer height="3" />

						<Button
							type="submit"
							isLoading={loading}
							marginTop="3"
							colorScheme="teal"
							color="white"
							_hover={{ color: 'cyan' }}
							fontWeight="bold"
						>
							<Icon as={MdPublishedWithChanges} marginRight="2" />
							Update
						</Button>
					</form>
				</FormContainer>
			</Flex>
		</Grid>
	);
};

export default ProfileScreen;
