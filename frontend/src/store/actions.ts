import { ActionTypes } from "./types";

export const setInputText = (text: string) => ({
  type: ActionTypes.SET_INPUT_TEXT,
  payload: text,
});

export type InputActions = ReturnType<typeof setInputText>;
