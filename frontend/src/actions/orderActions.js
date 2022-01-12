import axios from 'axios';
import {
	OREDR_CREATE_REQUEST,
	OREDR_CREATE_SUCCESS,
	OREDR_CREATE_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: OREDR_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post('/api/orders', order, config);

		dispatch({ type: OREDR_CREATE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: OREDR_CREATE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
