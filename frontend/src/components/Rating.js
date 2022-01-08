import { Flex, Icon } from '@chakra-ui/react';
import { MdStar, MdStarHalf, MdStarOutline } from 'react-icons/md';

const Rating = ({ value, text, color }) => {
	return (
		<Flex alignItems="flex-end">
			<Icon
				as={value >= 1 ? MdStar : value >= 0.5 ? MdStarHalf : MdStarOutline}
				color={color}
				fontSize="20px"
			/>
			<Icon
				as={value >= 2 ? MdStar : value >= 1.5 ? MdStarHalf : MdStarOutline}
				color={color}
				fontSize="20px"
			/>
			<Icon
				as={value >= 3 ? MdStar : value >= 2.5 ? MdStarHalf : MdStarOutline}
				color={color}
				fontSize="20px"
			/>
			<Icon
				as={value >= 4 ? MdStar : value >= 3.5 ? MdStarHalf : MdStarOutline}
				color={color}
				fontSize="20px"
			/>
			<Icon
				as={value >= 5 ? MdStar : value >= 4.5 ? MdStarHalf : MdStarOutline}
				color={color}
				fontSize="20px"
			/>
			{text}
		</Flex>
	);
};

export default Rating;
