import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInputText } from "../../store/actions";

import styles from "./InputBox.module.scss";

function InputBox() {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(setInputText(inputValue));
    // You can also reset the input value or perform any other actions here
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
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default InputBox;
