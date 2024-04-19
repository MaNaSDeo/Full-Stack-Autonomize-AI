import styles from "./RepoCard.module.scss";
import { type iRepo } from "../../types";

interface RepoCardProps {
  repo: iRepo;
}

function RepoCard({ repo }: RepoCardProps) {
  return (
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
  );
}

export default RepoCard;
