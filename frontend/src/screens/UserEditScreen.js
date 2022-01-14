import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Button,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Spacer,
	Link,
	Icon,
	Checkbox,
} from '@chakra-ui/react';
import { MdPublishedWithChanges } from 'react-icons/md';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetailsById } from '../actions/userActions';

const UserEditScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: userId } = useParams();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	console.log(isAdmin);

	const userDetailsById = useSelector((state) => state.userDetailsById);
	const { Loading, user, error } = userDetailsById;

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetailsById(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [dispatch, user, userId]);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Flex marginBottom="5">
				<Button
					as={RouterLink}
					to="/admin/userslist"
					colorScheme="gray"
					_hover={{ color: 'red' }}
				>
					Go Back
				</Button>
			</Flex>

			<Flex
				width="full"
				alignItems="center"
				justifyContent="center"
				paddingY="5"
			>
				<FormContainer>
					<Heading as="h1" marginBottom="8" fontSize="3xl">
						Edit User
					</Heading>

					{Loading ? (
						<Loader />
					) : error ? (
						<Message type="error">{error}</Message>
					) : (
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
									placeholder="Enter your E-mail"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="isAdmin">
								<FormLabel>Admin Status</FormLabel>
								<Checkbox
									size="lg"
									colorScheme="teal"
									checked={isAdmin}
									isChecked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}
								>
									Is Admin?
								</Checkbox>
							</FormControl>

							<Button
								type="submit"
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
					)}
				</FormContainer>
			</Flex>
		</>
	);
};

export default UserEditScreen;
