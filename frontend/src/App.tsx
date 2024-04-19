import styles from "./App.module.scss";
import InputPage from "./Components/InputPage";
import Header from "./Components/Header";
import RepoCard from "./Components/RepoCard";

import { useSelector } from "react-redux";
import { InputState } from "./store/types";

function App() {
  const { inputText } = useSelector((state: InputState) => state);
  return (
    <div className={styles.app}>
      <Header />
      <h1>{inputText}</h1>
      <InputPage />
      <RepoCard />
    </div>
  );
}

export default App;
