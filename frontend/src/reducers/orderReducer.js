import {
	OREDR_CREATE_REQUEST,
	OREDR_CREATE_SUCCESS,
	OREDR_CREATE_FAIL,
	OREDR_CREATE_RESET,
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
