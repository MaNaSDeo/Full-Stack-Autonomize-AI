import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.main}>
      <HomeRoundedIcon sx={{ cursor: "pointer" }} />
      <p>Github Explorer</p>
      <MenuIcon sx={{ cursor: "pointer" }} />
    </div>
  );
}

export default Header;
