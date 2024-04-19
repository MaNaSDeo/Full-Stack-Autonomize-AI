import styles from "./App.module.scss";
import Button from "./Components/Button";
import InputBox from "./Components/InputBox";

import store from "./store";
import { Provider, useSelector } from "react-redux";
import { InputState } from "./store/types";

function App() {
  const { inputText } = useSelector((state: InputState) => state);
  return (
    <div className={styles.app}>
      <h1>{inputText}</h1>
      <InputBox />
      <Button />
    </div>
  );
}

export default App;
