import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateCurrentUserDetails } from "../../store/userSlice";
import axios from "axios";

import styles from "./InputPage.module.scss";

function InputPage() {
  const [inputValue, setInputValue] = useState<string>("");

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_NODE_API_URI}/save-user/${inputValue}`
        );
        console.log("response: ", response);
        if (response.status === 200) {
          dispatch(updateCurrentUserDetails(response.data.user));
        }
      } catch (error) {
        console.error(error);
      }
    }
    setInputValue("");
  };

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
    }
  });

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
