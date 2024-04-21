import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUserDetails } from "../../store/userSlice";
import axios from "axios";

import styles from "./InputPage.module.scss";
import { useNavigate } from "react-router-dom";

function InputPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_NODE_API_URI}/save-user/${inputValue}`
        );
        console.log("response: ", response);
        if (response.status === 200) {
          dispatch(updateCurrentUserDetails(response.data.user));
          const updatedUser = response.data.user;
          if (updatedUser && updatedUser.username) {
            navigate(`/user/${updatedUser.username}`);
          }
        }
        setLoading(false);
        setInputValue("");
      } catch (error) {
        console.error(error);
        setLoading(false);
        setErrorData(true);

        setTimeout(() => {
          setErrorData(false);
          setInputValue("");
        }, 4000);
      }
    }
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
        <button
          onClick={handleSubmit}
          className={loading ? styles.loadingBtn : styles.btnSearch}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {errorData && (
        <div className={styles.errorMsg}>
          There's no one named <span>{inputValue}</span> on GitHub
        </div>
      )}
    </div>
  );
}

export default InputPage;
