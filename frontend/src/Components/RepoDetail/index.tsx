import styles from "./RepoDetail.module.scss";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

function RepoDetail() {
  const { repoDetails } = useSelector((state: RootState) => state.user);

  if (!repoDetails) {
    return <div>Loading...</div>; // or any other fallback UI
  }

  const created_at = new Date(repoDetails.created_at);
  const formattedCreated_at = created_at.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updated_at = new Date(repoDetails.created_at);
  const formattedUpdated_at = updated_at.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.img}>
          <img src="/github-mark.svg" alt="git repo logo" />
        </div>
        <div className={styles.leftText}>
          <div className={styles.leftHeading}>
            <img src="/check-circle.svg" alt="Check icon" />
            <p> Verified by GitHub</p>
          </div>
          <p className={styles.leftPText}>
            GitHub confirms that this app meets the{" "}
            <span className={styles.leftSpanText}>
              requirements for verification
            </span>
          </p>
        </div>
        <div>
          <p className={styles.languageHeading}>Language</p>
          <p className={styles.languageText}>
            {repoDetails.language || "Please update"}
          </p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.application}>Application</div>
        <div className={styles.rightHeading}>{repoDetails.name}</div>
        <div className={styles.aTag}>
          <a href={repoDetails.html_url} target="_blank">
            Take me to GitHub Repo
          </a>
        </div>
        <div className={styles.description}>
          <p>
            <span>{repoDetails.name}</span> is a repo in GitHub.
          </p>
          <p>{repoDetails.description || "No description available!"}</p>
          <p>
            The Repo was created on {formattedCreated_at} and was last updated
            on {formattedUpdated_at}.
          </p>
          <p>
            The default branch is {repoDetails.default_branch} with visibility
            is {repoDetails.visibility}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RepoDetail;
