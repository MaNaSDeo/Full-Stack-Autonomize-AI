import styles from "./FollowerCard.module.scss";

interface iFollowerCard {
  username: string;
  id: number;
  avatar_url: string | null;
}

function FollowerCard({ username, id, avatar_url }: iFollowerCard) {
  return (
    <div className={styles.main}>
      <div className={styles.img}>
        <img src={avatar_url || ""} alt="User's avatar" />
      </div>
      <div className={styles.textHeading}>{username}</div>
    </div>
  );
}

export default FollowerCard;
