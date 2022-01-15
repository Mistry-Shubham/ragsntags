import axios from 'axios';
import {
	OREDR_CREATE_REQUEST,
	OREDR_CREATE_SUCCESS,
	OREDR_CREATE_FAIL,
	OREDR_DETAILS_REQUEST,
	OREDR_DETAILS_SUCCESS,
	OREDR_DETAILS_FAIL,
	OREDR_PAY_REQUEST,
	OREDR_PAY_SUCCESS,
	OREDR_PAY_FAIL,
	OREDR_MY_LIST_REQUEST,
	OREDR_MY_LIST_SUCCESS,
	OREDR_MY_LIST_FAIL,
	OREDR_LIST_REQUEST,
	OREDR_LIST_SUCCESS,
	OREDR_LIST_FAIL,
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: OREDR_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({ type: OREDR_DETAILS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: OREDR_DETAILS_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({ type: OREDR_PAY_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

			dispatch({ type: OREDR_PAY_SUCCESS });
		} catch (err) {
			dispatch({
				type: OREDR_PAY_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: OREDR_MY_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/orders/myorders', config);

		dispatch({ type: OREDR_MY_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: OREDR_MY_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: OREDR_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/orders', config);

		dispatch({ type: OREDR_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: OREDR_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
