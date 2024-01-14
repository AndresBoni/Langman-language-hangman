import { useEffect } from "react";
import { useHangman } from "../hooks/useHangman";
import LevelMenu from "./LevelMenu";
import LanguageMenu from "./LanguageMenu";
import "../styles/HangmanGame.css";

const Hangman = () => {
  const {
    currentWord,
    displayedWord,
    remainingAttempts,
    incorrectLetters,
    gameState,
    score,
    level,
    language,
    handleKeyPress,
    handleLevelChange,
    changeLanguage,
  } = useHangman();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentWord, displayedWord, remainingAttempts, gameState, score]);

  return (
    <div className="container">
      <LevelMenu level={level} handleLevelChange={handleLevelChange} />
      <main>
        <LanguageMenu language={language} changeLanguage={changeLanguage} />
        <div className="hangman-container">
          <div className="top-data">
            <span>Incorrect letters: {incorrectLetters.join(", ")}</span>
            <h3 className="selected">Score: {score}</h3>
            <span>Remaining attempts: {remainingAttempts}</span>
          </div>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {gameState === "lost" ? (
              <span className="error">{currentWord.word}</span>
            ) : (
              displayedWord
                .map((char) => (char === " " ? `  ` : char))
                .join(" ")
            )}
          </div>
          <div>{currentWord.definition}</div>
        </div>
      </main>
    </div>
  );
};

export default Hangman;
