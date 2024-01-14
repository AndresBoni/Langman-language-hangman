import PropTypes from "prop-types";
import "../styles/LevelMenu.css";

const LevelMenu = ({ level, handleLevelChange }) => {
  return (
    <div className="level-menu">
      <h5>Level</h5>
      <span
        onClick={() => handleLevelChange("A1")}
        className={level === "A1" ? "selected" : ""}
      >
        A1
      </span>
      <span
        onClick={() => handleLevelChange("A2")}
        className={level === "A2" ? "selected" : ""}
      >
        A2
      </span>
      <span
        onClick={() => handleLevelChange("B1")}
        className={level === "B1" ? "selected" : ""}
      >
        B1
      </span>
      <span
        onClick={() => handleLevelChange("B2")}
        className={level === "B2" ? "selected" : ""}
      >
        B2
      </span>
      <span
        onClick={() => handleLevelChange("C1")}
        className={level === "C1" ? "selected" : ""}
      >
        C1
      </span>
      <span
        onClick={() => handleLevelChange("C2")}
        className={level === "C2" ? "selected" : ""}
      >
        C2
      </span>
    </div>
  );
};

export default LevelMenu;
LevelMenu.propTypes = {
  level: PropTypes.string,
  handleLevelChange: PropTypes.func.isRequired,
};
