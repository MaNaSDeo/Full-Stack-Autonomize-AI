import styles from "./InputBox.module.scss";

function index() {
  return (
    <div className={styles.main}>
      <input type="text" className={styles.inputBox} />
    </div>
  );
}

export default index;
