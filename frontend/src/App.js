import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import Footer from './components/Footer';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Flex
				as="main"
				direction="column"
				marginTop="72px"
				minHeight="xl"
				padding="6"
				backgroundColor="gray.800"
			>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/product/:id" element={<ProductScreen />} />
					<Route path="/cart" element={<CartScreen />} />
					<Route path="/cart/:id" element={<CartScreen />} />
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/register" element={<RegisterScreen />} />
					<Route path="/profile" element={<ProfileScreen />} />
					<Route path="/shipping" element={<ShippingScreen />} />
					<Route path="/payment" element={<PaymentScreen />} />
					<Route path="/placeorder" element={<PlaceOrderScreen />} />
				</Routes>
			</Flex>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
