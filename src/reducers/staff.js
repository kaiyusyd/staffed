import {
  UPDATE_STAFF
} from '../actions/types';

const INITIAL_STATE = {
  staffList: {
    data: [],
    loading: false
  },
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STAFF:
      return {
        ...state, staffList: { ...state.staffList, [action.payload.prop]: action.payload.value }
      };
    default:
      return state;
  }
};

export default auth;
