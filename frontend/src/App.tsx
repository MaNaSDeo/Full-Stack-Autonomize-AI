import styles from "./App.module.scss";
import InputPage from "./Components/InputPage";
import Header from "./Components/Header";
import RepoContainerPage from "./Components/RepoContainerPage";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <InputPage />
      <RepoContainerPage />
    </div>
  );
}

export default App;
