import {
	OREDR_CREATE_REQUEST,
	OREDR_CREATE_SUCCESS,
	OREDR_CREATE_FAIL,
	OREDR_CREATE_RESET,
	OREDR_DETAILS_REQUEST,
	OREDR_DETAILS_SUCCESS,
	OREDR_DETAILS_FAIL,
	OREDR_DETAILS_RESET,
	OREDR_PAY_REQUEST,
	OREDR_PAY_SUCCESS,
	OREDR_PAY_FAIL,
	OREDR_PAY_RESET,
	OREDR_MY_LIST_REQUEST,
	OREDR_MY_LIST_SUCCESS,
	OREDR_MY_LIST_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case OREDR_CREATE_REQUEST:
			return { loading: true };
		case OREDR_CREATE_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case OREDR_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case OREDR_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { order: { user: {}, orderItems: [], shippingAddress: {} } },
	action
) => {
	switch (action.type) {
		case OREDR_DETAILS_REQUEST:
			return { ...state, loading: true };
		case OREDR_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };
		case OREDR_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case OREDR_DETAILS_RESET:
			return { order: { user: {}, orderItems: [], shippingAddress: {} } };
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case OREDR_PAY_REQUEST:
			return { ...state, loading: true };
		case OREDR_PAY_SUCCESS:
			return { loading: false, success: true };
		case OREDR_PAY_FAIL:
			return { loading: false, error: action.payload };
		case OREDR_PAY_RESET:
			return {};
		default:
			return state;
	}
};

export const orderMyListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case OREDR_MY_LIST_REQUEST:
			return { loading: true };
		case OREDR_MY_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case OREDR_MY_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
