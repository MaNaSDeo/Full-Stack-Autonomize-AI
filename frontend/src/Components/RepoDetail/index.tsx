import styles from "./RepoDetail.module.scss";

function RepoDetail() {
  const testData = {
    html_url: "https://github.com/MaNaSDeo/Blog-fullstack",
    description:
      "This project is a GitHub profile viewer web application. It allows users to enter a GitHub username, and in response, it retrieves data from the GitHub API and displays the user's profile information in a styled card format on the webpage.",
    created_at: "2024-03-23T15:49:30Z",
    updated_at: "2024-03-23T19:58:12Z",
    visibility: "public",
    language: "JavaScript",
    default_branch: "main",
    size: 489,
    id: 102231033,
    name: "Blog-fullstack",
  };
  return (
    <div className={styles.main}>
      <div className={styles.leftSide}>
        <div className={styles.img}>
          <img src="/github-mark.svg" alt="git repo logo" />
        </div>
        <div className={styles.leftText}>
          <p className={styles.leftHeading}>Verified by GitHub</p>
          <p className={styles.leftPText}>
            GitHub confirms that this app meets the{" "}
            <span className={styles.leftSpanText}>
              requirements for verification
            </span>
          </p>
        </div>
        <div className={styles.language}>
          <p className={styles.languageHeading}>Language</p>
          <p className={styles.languageText}>{testData.language}</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.rightHeading}>{testData.name}</div>
        <div className={styles.aTag}>
          <a href={testData.html_url} target="_blank">
            Take me to GitHub Repo
          </a>
        </div>
        <div className={styles.description}>
          <p>{testData.description || "No description available!"}</p>
        </div>
      </div>
    </div>
  );
}

export default RepoDetail;
