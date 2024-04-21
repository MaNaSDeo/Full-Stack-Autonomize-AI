import styles from "./FollowerContainerPage.module.scss";
import FollowerCard from "../FollowerCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Pagination from "../Pagination";
import { useState } from "react";

function FollowerContainerPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const follwersDetail =
    (user && user.followersData.length > 0 && user.followersData) || [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;
  const totalPage = Math.trunc(follwersDetail.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, follwersDetail.length);

  const follwersForPage = follwersDetail.slice(startIndex, endIndex);

  return (
    <div className={styles.main}>
      <div className={styles.repoCardContainer}>
        {follwersForPage.map((item) => (
          <FollowerCard
            key={item.id}
            username={item.username}
            avatar_url={item.avatar_url}
            id={item.id}
          />
        ))}
      </div>
      {follwersDetail.length > 1 && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default FollowerContainerPage;
