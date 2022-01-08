import { Flex } from '@chakra-ui/react';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';

const App = () => {
	return (
		<>
			<Header />
			<Flex
				as="main"
				direction="column"
				marginTop="72px"
				minHeight="xl"
				padding="6"
				backgroundColor="gray.800"
			>
				<HomeScreen />
			</Flex>
			<Footer />
		</>
	);
};

export default App;
