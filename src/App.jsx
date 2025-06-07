import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [timeInput, setTimeInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!isRunning && timeInput > 0) {
      setTimeLeft(Number(timeInput));
      setIsRunning(true);
    }
  }, [timeInput, isRunning]);

  useEffect(() => {
    if (isRunning && timeInput > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setTimeInput(0);
      alert("Time's Up");
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimeInput("");
    setIsRunning(false);
    setTimeLeft(0);
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <h1 className="mt-10 font-bold text-2xl">Countdown Timer</h1>
      <div className="shadow-lg px-2 py-4 my-5">
        <div>
          <input
            type="number"
            placeholder="Enter seconds...."
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            disabled={isRunning}
            className="outline-none my-5"
          />
          <h2>Time Left: {timeLeft} seconds</h2>
        </div>
        <div className="my-10 flex justify-around">
          <button
            className="bg-green-600 w-18 text-white outline-none rounded-full h-8 cursor-pointer"
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="bg-red-600 w-18 text-white outline-none rounded-full h-8 cursor-pointer"
            onClick={resetTimer}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
