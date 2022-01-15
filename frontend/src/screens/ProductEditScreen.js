import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Flex,
	Heading,
	Button,
	FormControl,
	FormLabel,
	Input,
	Icon,
	Spacer,
} from '@chakra-ui/react';
import { MdPublishedWithChanges } from 'react-icons/md';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productActions';
import {
	PRODUCT_DETAILS_RESET,
	PRODUCT_UPDATE_RESET,
} from '../constants/productConstants';

const ProductEditScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: productId } = useParams();

	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [countInStock, setCountInStock] = useState(0);

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;
	console.log(product);

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			dispatch({ type: PRODUCT_DETAILS_RESET });
			navigate('/admin/productslist');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setDescription(product.description);
				setCountInStock(product.countInStock);
			}
		}
	}, [dispatch, productId, product, navigate, successUpdate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	return (
		<>
			<Flex marginBottom="5">
				<Button
					as={RouterLink}
					to="/admin/productslist"
					colorScheme="gray"
					_hover={{ color: 'red' }}
				>
					Go Back
				</Button>
			</Flex>

			{errorUpdate && <Message type="error">{errorUpdate}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<Flex
					width="full"
					alignItems="center"
					justifyContent="center"
					paddingY="5"
				>
					<FormContainer>
						<Heading as="h1" marginBottom="8" fontSize="3xl">
							Edit Product
						</Heading>

						<form onSubmit={submitHandler}>
							<FormControl id="name">
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter Product Name"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="price">
								<FormLabel>Price</FormLabel>
								<Input
									type="number"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									placeholder="Enter Price in Rupees"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="brand">
								<FormLabel>Brand</FormLabel>
								<Input
									type="text"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
									placeholder="Enter Brand Name"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="image">
								<FormLabel>Image</FormLabel>
								<Input
									type="text"
									value={image}
									onChange={(e) => setImage(e.target.value)}
									placeholder="Image URL"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="category">
								<FormLabel>Category</FormLabel>
								<Input
									type="text"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									placeholder="Enter Category"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="description">
								<FormLabel>Description</FormLabel>
								<Input
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Enter Description"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<FormControl id="countInStock">
								<FormLabel>Count In Stock</FormLabel>
								<Input
									type="number"
									value={countInStock}
									onChange={(e) => setCountInStock(e.target.value)}
									placeholder="Enter available Quantity"
									borderRadius="50px"
									borderColor="black"
									_hover={{ borderColor: 'gray.300' }}
									_focus={{ background: 'white' }}
								/>
							</FormControl>

							<Spacer height="3" />

							<Button
								type="submit"
								marginTop="3"
								isLoading={loadingUpdate}
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
			)}
		</>
	);
};

export default ProductEditScreen;
