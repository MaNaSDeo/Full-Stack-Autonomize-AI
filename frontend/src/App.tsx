import styles from "./App.module.scss";
import InputBox from "./Components/InputBox";

function App() {
  return (
    <div className={styles.app}>
      <InputBox />
    </div>
  );
}

export default App;
