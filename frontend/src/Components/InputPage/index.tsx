import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInputText } from "../../store/actions";

import styles from "./InputPage.module.scss";

function InputPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(setInputText(inputValue));
    setInputValue("");
  };

  return (
    <div className={styles.main}>
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Please provide the username!"
        className={styles.inputBox}
      />
      <div className={styles.btnContainer}>
        <button className={styles.btnReset} onClick={() => setInputValue("")}>
          Reset
        </button>
        <button onClick={handleSubmit} className={styles.btnSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default InputPage;
