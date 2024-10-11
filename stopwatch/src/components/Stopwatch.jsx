import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleRest = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };
  const handleFormatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className={styles.display}>{handleFormatTime()}</div>
      <div className={styles.control}>
        <button onClick={handleStart} className={styles.startBtn}>
          Start
        </button>
        <button onClick={handleStop} className={styles.stopBtn}>
          Stop
        </button>
        <button onClick={handleRest} className={styles.resetBtn}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
