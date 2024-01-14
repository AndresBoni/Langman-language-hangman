import PropTypes from "prop-types";
import "../styles/LanguageMenu.css";

const LanguageMenu = ({ language, changeLanguage }) => {
  return (
    <div className="language-menu">
      <span
        onClick={() => changeLanguage("EN")}
        className={language === "EN" ? "selected" : ""}
      >
        <img
          src="https://flagcdn.com/48x36/gb.png"
          className="flag"
          alt="UK Flag"
        />{" "}
        EN
      </span>
      <span
        onClick={() => changeLanguage("ES")}
        className={language === "ES" ? "selected" : ""}
      >
        <img
          src="https://flagcdn.com/48x36/es.png"
          className="flag"
          alt="Spain Flag"
        />
        ES
      </span>
      <span
        onClick={() => changeLanguage("PT")}
        className={language === "PT" ? "selected" : ""}
      >
        <img
          src="https://flagcdn.com/48x36/br.png"
          className="flag"
          alt="Spain Flag"
        />
        PT
      </span>
    </div>
  );
};

export default LanguageMenu;
LanguageMenu.propTypes = {
  language: PropTypes.string,
  changeLanguage: PropTypes.func.isRequired,
};
