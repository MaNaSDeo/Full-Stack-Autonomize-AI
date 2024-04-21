import styles from "./App.module.scss";
import InputPage from "./Components/InputPage";
import Header from "./Components/Header";
import RepoContainerPage from "./Components/RepoContainerPage";
import RepoDetail from "./Components/RepoDetail";
import FollowerContainerPage from "./Components/FollowerContainerPage";

import { type FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "./store/store";

const App: FC = () => {
  const { user, currentRepo } = useSelector((state: RootState) => state.user);
  const id = user?.username;

  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path={`/user/${id}`} element={<RepoContainerPage />} />
          <Route
            path={`/user/${id}/:${currentRepo}`}
            element={<RepoDetail />}
          />
          <Route
            path={`/user/:${id}/followers`}
            element={<FollowerContainerPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
