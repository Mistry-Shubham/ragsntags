import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
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
				</Routes>
			</Flex>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
