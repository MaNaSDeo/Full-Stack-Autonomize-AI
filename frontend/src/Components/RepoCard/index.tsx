import styles from "./RepoCard.module.scss";

function RepoCard() {
  const testData = {
    html_url: "https://github.com/atmos/aloha_2009",
    description:
      "my talk on open source business models and independent record labels",
    created_at: "2009-09-09T07:36:19Z",
    updated_at: "2018-03-25T12:49:53Z",
    visibility: "public",
    language: null,
    default_branch: "master",
    size: 80804,
    id: 38,
    name: "aloha_2009",
  };
  return (
    <div className={styles.main}>
      <div className={styles.img}>
        <img src="/github-mark-white.svg" alt="git repo logo" />
      </div>
      <div className={styles.text}>
        <div className={styles.textHeading}>{testData.name}</div>
        <div className={styles.textDescription}>{testData.description}</div>
      </div>
    </div>
  );
}

export default RepoCard;
