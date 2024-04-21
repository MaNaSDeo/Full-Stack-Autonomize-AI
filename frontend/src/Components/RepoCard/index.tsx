import styles from "./RepoCard.module.scss";
import { type iRepo } from "../../types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { updatecurrentRepoName } from "../../store/userSlice";

interface RepoCardProps {
  repo: iRepo;
}

function RepoCard({ repo }: RepoCardProps) {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const id = user?.username;
  const repoName = repo.name;

  const handleRepoClick = () => {
    dispatch(updatecurrentRepoName(repo.name));
  };

  return (
    <Link to={`/user/${id}/:${repoName}`} onClick={handleRepoClick}>
      <div className={styles.main}>
        <div className={styles.img}>
          <img src="/github-mark-white.svg" alt="git repo logo" />
        </div>
        <div className={styles.text}>
          <div className={styles.textHeading}>{repo.name || "No name"}</div>
          <div className={styles.textDescription}>
            {repo.description || "No description"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RepoCard;
