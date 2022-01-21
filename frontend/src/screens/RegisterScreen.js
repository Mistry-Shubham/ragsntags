import { useState, useEffect } from 'react';
import {
	Link as RouterLink,
	useNavigate,
	useSearchParams,
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
	Icon,
	Link,
	Spacer,
} from '@chakra-ui/react';
import { MdPersonAddAlt, MdLaunch } from 'react-icons/md';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchparams] = useSearchParams();
	const redirect = searchparams.get('redirect') || '/';

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;

	useEffect(() => {
		if (userInfo) {
			if (redirect === '/') {
				navigate('/');
			} else {
				navigate(`/${redirect}`);
			}
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<Flex width="full" justifyContent="center" alignItems="center" padding="5">
			<FormContainer bgColor="gray.100">
				<Heading as="h1" marginBottom="8" fontSize="3xl">
					Register
				</Heading>

				{error && <Message type="error">{error}</Message>}
				{message && <Message type="error">{message}</Message>}

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
						<Icon as={MdPersonAddAlt} marginRight="2" />
						Register
					</Button>
				</form>

				<Flex marginTop="4">
					<Text>
						Already have an account?{' '}
						<Link
							as={RouterLink}
							to={redirect ? `/login?redirect=${redirect}` : '/login'}
						>
							Login <Icon as={MdLaunch} fontSize="sm" />
						</Link>
					</Text>
				</Flex>
			</FormContainer>
		</Flex>
	);
};

export default RegisterScreen;
