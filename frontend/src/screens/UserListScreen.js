import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Box,
	Button,
	Heading,
	Text,
	Icon,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';
import {
	MdVerified,
	MdCancel,
	MdOutlineDeleteForever,
	MdModeEdit,
} from 'react-icons/md';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers } from '../actions/userActions';

const UserListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	useEffect(() => {
		dispatch(listUsers());
	}, [dispatch]);

	const deleteUserhandler = (id) => {
		console.log(id);
		// delete user fi=unction
	};

	return (
		<>
			<Heading as="h1" marginBottom="8" fontSize="3xl" color="white">
				Users List
			</Heading>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<Box background="white" borderRadius="lg" paddingY="2">
					<Table variant="striped" size="lg">
						<Thead>
							<Tr>
								<Th>SR.NO.</Th>
								<Th>NAME</Th>
								<Th>EMAIL</Th>
								<Th>ADMIN</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map((user, idx) => (
								<Tr key={idx + 1}>
									<Td>{idx + 1}</Td>
									<Td>{user.name}</Td>
									<Td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</Td>
									<Td>
										{user.isAdmin ? (
											<Icon as={MdVerified} color="green.500" fontSize="2xl" />
										) : (
											<Icon as={MdCancel} color="red" fontSize="2xl" />
										)}
									</Td>
									<Td>
										<Flex justifyContent="flex-end">
											<Button
												colorScheme="teal"
												marginRight="4"
												as={RouterLink}
												to={`/admin/user/${user._id}/edit`}
											>
												<Icon as={MdModeEdit} fontSize="2xl" />
											</Button>
											<Button
												colorScheme="red"
												onClick={() => deleteUserhandler(user._id)}
											>
												<Icon as={MdOutlineDeleteForever} fontSize="2xl" />
											</Button>
										</Flex>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
};

export default UserListScreen;
