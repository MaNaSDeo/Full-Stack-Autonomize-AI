import styles from "./App.module.scss";
import InputPage from "./Components/InputPage";

import { useSelector } from "react-redux";
import { InputState } from "./store/types";

function App() {
  const { inputText } = useSelector((state: InputState) => state);
  return (
    <div className={styles.app}>
      <h1>{inputText}</h1>
      <InputPage />
    </div>
  );
}

export default App;
