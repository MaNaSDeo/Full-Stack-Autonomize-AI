import { ActionTypes, type InputState } from "./types";
import { type InputActions } from "./actions";

const initialState: InputState = {
  inputText: "",
};

const inputReducer = (
  state = initialState,
  action: InputActions
): InputState => {
  switch (action.type) {
    case ActionTypes.SET_INPUT_TEXT:
      return { ...state, inputText: action.payload };
    default:
      return state;
  }
};

export default inputReducer;
