import styles from "./App.module.scss";
import InputPage from "./Components/InputPage";
import Header from "./Components/Header";
import RepoContainerPage from "./Components/RepoContainerPage";
import RepoDetail from "./Components/RepoDetail";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <InputPage />
      {/* <RepoContainerPage /> */}
      <RepoDetail />
    </div>
  );
}

export default App;
