import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [sessionTime, setSessionTime] = useState(28 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [time, setTime] = useState(sessionTime);

  useEffect(() => {
    if (!onBreak) {
      setTime(sessionTime);
    }
  }, [sessionTime]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            setOnBreak((prev) => !prev);
            return onBreak ? sessionTime : breakTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, onBreak, sessionTime, breakTime]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <div className="session-timer">
        <motion.div
          className="timer-circle"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <h2>{onBreak ? "Break" : "Session"}</h2>
          <h1>{formatTime(time)}</h1>
          <div>
            <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "⏸️" : "▶️"}</button>
            <button onClick={() => setTime(sessionTime)}>🔄</button>
          </div>
        </motion.div>
      </div>

      <div className="controls">
        <div className="break-controls">
          <h2>Break Time</h2>
          <button onClick={() => setBreakTime((prev) => Math.max(prev - 60, 60))}>-</button>
          <span>{breakTime / 60}</span>
          <button onClick={() => setBreakTime((prev) => prev + 60)}>+</button>
        </div>

        <div className="session-controls">
          <h2>Session Time</h2>
          <button onClick={() => setSessionTime((prev) => Math.max(prev - 60, 60))}>-</button>
          <span>{sessionTime / 60}</span>
          <button onClick={() => setSessionTime((prev) => prev + 60)}>+</button>
        </div>
      </div>

      <div className="hourglass-container">
        <div className="box-canvas">
          <div className="frame">
            <div className="top"></div>
            <div className="bottom">
              <div className="drip"></div>
              <div className="blob"></div>
              <div className="glass"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;