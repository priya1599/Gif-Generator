
import { SET_CAPTURED_IMAGE } from '../redux/action';

const initialState = {
  capturedImage: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAPTURED_IMAGE:
      return {
        ...state,
        capturedImage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
