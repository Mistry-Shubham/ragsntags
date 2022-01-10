import { useState, useEffect } from 'react';
import {
	Link as RouterLink,
	useSearchParams,
	useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Button,
	Heading,
	Text,
	FormControl,
	FormLabel,
	Input,
	Link,
	Spacer,
	Icon,
} from '@chakra-ui/react';
import { MdOutlineLogin, MdLaunch } from 'react-icons/md';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { login } from '../actions/userActions';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchparams] = useSearchParams();
	const redirect = searchparams.get('redirect') || '/';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<Flex width="full" justifyContent="center" alignItems="center" padding="5">
			<FormContainer bgColor="gray.100">
				<Heading as="h1" marginBottom="8" fontSize="3xl">
					Login
				</Heading>

				{error && <Message type="error">{error}</Message>}

				<form onSubmit={submitHandler}>
					<FormControl id="email">
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your E-mail"
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

					<Button
						type="submit"
						isLoading={loading}
						marginTop="3"
						colorScheme="teal"
						color="white"
						_hover={{ color: 'cyan' }}
						fontWeight="bold"
					>
						<Icon as={MdOutlineLogin} marginRight="2" />
						Login
					</Button>
				</form>

				<Flex marginTop="4">
					<Text>
						New user, Dont have an account?{' '}
						<Link as={RouterLink} to="/register">
							Create account <Icon as={MdLaunch} fontSize="sm" />
						</Link>
					</Text>
				</Flex>
			</FormContainer>
		</Flex>
	);
};

export default LoginScreen;
