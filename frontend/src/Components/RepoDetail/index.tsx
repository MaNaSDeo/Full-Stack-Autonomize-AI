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
  const created_at = new Date(testData.created_at);
  const formattedCreated_at = created_at.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updated_at = new Date(testData.created_at);
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
          <p className={styles.languageText}>{testData.language}</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.application}>Application</div>
        <div className={styles.rightHeading}>{testData.name}</div>
        <div className={styles.aTag}>
          <a href={testData.html_url} target="_blank">
            Take me to GitHub Repo
          </a>
        </div>
        <div className={styles.description}>
          <p>
            <span>{testData.name}</span> is a repo in GitHub.
          </p>
          <p>{testData.description || "No description available!"}</p>
          <p>
            The Repo was created on {formattedCreated_at} and was last updated
            on {formattedUpdated_at}.
          </p>
          <p>
            The default branch is {testData.default_branch} with visibility is{" "}
            {testData.visibility}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RepoDetail;
