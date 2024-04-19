import { createStore } from "redux";
import inputReducer from "./reducer";

const store = createStore(inputReducer);

export default store;
