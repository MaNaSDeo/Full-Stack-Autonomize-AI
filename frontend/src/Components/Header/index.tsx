import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import styles from "./Header.module.scss";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.main}>
      <Link to="/">
        <HomeRoundedIcon sx={{ cursor: "pointer" }} />
      </Link>

      <p>Github Explorer</p>
      <MenuIcon sx={{ cursor: "pointer" }} />
    </div>
  );
}

export default Header;
