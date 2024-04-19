import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useUserDispatch = () => useDispatch<AppDispatch>();
export const useUserDataSelector: TypedUseSelectorHook<RootState> = useSelector;
