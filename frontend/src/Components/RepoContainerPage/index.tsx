import styles from "./RepoContainerPage.module.scss";
import RepoCard from "../RepoCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Pagination from "../Pagination";
import { useState } from "react";

function RepoContainerPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const repos = (user && user.repos.length > 0 && user.repos) || [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPage = Math.trunc(repos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, repos.length);

  const reposForPage = repos.slice(startIndex, endIndex);

  console.log(repos.length);

  return (
    <div className={styles.main}>
      <div className={styles.repoCardContainer}>
        {reposForPage.map((item) => (
          <RepoCard repo={item} />
        ))}
      </div>
      {repos.length && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <button className={styles.followersBtn}>Check Followers</button>
    </div>
  );
}

export default RepoContainerPage;
