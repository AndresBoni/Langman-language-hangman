import { useState, useEffect } from "react";
import wordsEn from "../words/words-en";
import wordsEs from "../words/words-es";
import wordsPt from "../words/words-pt";
import unorm from "unorm";

export const useHangman = () => {
  const [currentWord, setCurrentWord] = useState({});
  const [displayedWord, setDisplayedWord] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [gameState, setGameState] = useState("inProgress");
  const [language, setLanguage] = useState("EN");
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem(`hangmanScore_${language}`)) || 0;
  });
  const [level, setLevel] = useState("A1");
  const wordsByLanguage = {
    EN: wordsEn,
    ES: wordsEs,
    PT: wordsPt,
  };
  const [wordList, setWordList] = useState(wordsByLanguage[language]);

  useEffect(() => {
    selectRandomWord();
  }, [level, language]);

  const selectRandomWord = () => {
    const shuffledWords = shuffleArray(wordList[level]);
    const randomIndex = Math.floor(Math.random() * shuffledWords.length);
    const selectedWord = shuffledWords[randomIndex];

    setCurrentWord(selectedWord);
    setDisplayedWord(Array(selectedWord.word.length).fill("_"));
    setRemainingAttempts(6);
    setIncorrectLetters([]);
    setGameState("inProgress");
  };

  const handleKeyPress = (event) => {
    const letter = event.key.toUpperCase();

    const normalizeLetter = (input) => {
      const regex = /[A-Za-záéíóúüçñ'-]/;

      if (regex.test(input) || input === " ") {
        return input.toUpperCase();
      }

      const normalizedInput = unorm.nfd(input).replace(/[\u0300-\u036f]/g, "");

      return normalizedInput.toUpperCase();
    };

    if (/^[A-Za-záéíóúüçñ'-]|\s$/.test(letter) && gameState === "inProgress") {
      const normalizedLetter = normalizeLetter(letter);

      const normalizedWord = unorm
        .nfd(currentWord.word)
        .replace(/[\u0300-\u036f]/g, "");

      if (normalizedWord.includes(normalizedLetter)) {
        const newDisplayedWord = displayedWord.map((char, index) =>
          unorm
            .nfd(currentWord.word[index])
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase() === normalizedLetter
            ? currentWord.word[index] === " "
              ? " "
              : currentWord.word[index]
            : char
        );
        setDisplayedWord(newDisplayedWord);

        if (!newDisplayedWord.includes("_")) {
          setGameState("won");
          const newScore = score + 1;
          setScore(newScore);
          localStorage.setItem(`hangmanScore_${language}`, newScore);
          const utterance = new SpeechSynthesisUtterance(currentWord.word);
          utterance.lang = language;
          speechSynthesis.speak(utterance);
          setTimeout(() => {
            selectRandomWord();
          }, 2000);
        }
      } else {
        if (!incorrectLetters.includes(normalizedLetter)) {
          const newIncorrectLetters = [...incorrectLetters, normalizedLetter];
          setIncorrectLetters(newIncorrectLetters);
          setRemainingAttempts(remainingAttempts - 1);
        }

        if (remainingAttempts === 1) {
          setGameState("lost");
          const newScore = score - 1;
          setScore(newScore);
          localStorage.setItem(`hangmanScore_${language}`, newScore);
          const utterance = new SpeechSynthesisUtterance(currentWord.word);
          utterance.lang = language;
          speechSynthesis.speak(utterance);
          setTimeout(() => {
            restartGame();
          }, 6000);
        }
      }
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const restartGame = () => {
    setRemainingAttempts(6);
    setIncorrectLetters([]);
    setGameState("inProgress");
    selectRandomWord();
  };

  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setWordList(wordsByLanguage[newLanguage]);

    const newScore =
      parseInt(localStorage.getItem(`hangmanScore_${newLanguage}`)) || 0;
    setScore(newScore);
    selectRandomWord();
  };

  return {
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
  };
};
