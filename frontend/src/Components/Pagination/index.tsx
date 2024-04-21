import styles from "./Pagination.module.scss";

interface iPagination {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({ totalPage, currentPage, setCurrentPage }: iPagination) {
  return (
    <div className={styles.main}>
      <div
        className={
          currentPage === 1
            ? `${styles.btn} ${styles.disableBtn}`
            : `${styles.btn}`
        }
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        First
      </div>
      <div
        className={
          currentPage === 1
            ? `${styles.btn} ${styles.disableBtn}`
            : `${styles.btn}`
        }
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        Prev
      </div>
      <div className={styles.currentPage}>{currentPage}</div>
      <div
        className={
          currentPage === totalPage
            ? `${styles.btn} ${styles.disableBtn}`
            : `${styles.btn}`
        }
        onClick={() => {
          if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        Next
      </div>
      <div
        className={
          currentPage === totalPage
            ? `${styles.btn} ${styles.disableBtn}`
            : `${styles.btn}`
        }
        onClick={() => {
          setCurrentPage(totalPage);
        }}
      >
        Last
      </div>
    </div>
  );
}

export default Pagination;
