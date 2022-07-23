import React, { useEffect, useRef, useState } from "react";
import { usePomodoro } from "../../contexts/PomodoroContext";
import { HiPause, HiPlay, HiXCircle } from "react-icons/hi";
import PomodoroTime from "./PomodoroTime";
import { CircularProgressbar } from "react-circular-progressbar";
import PomodoroCard from "./PomodoroCard";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

const Pomodoro = () => {
  const minute = 1;

  const { duration, startSession, completeSession, currentId, setCurrentId } =
    usePomodoro();

  const [isPaused, setIsPaused] = useState(true);
  const [started, setStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [pomodoros, setPomodoros] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      completeSession(currentId);
      setSecondsLeft(duration * minute);
      secondsLeftRef.current = duration * minute;
      setIsPaused(true);
      isPausedRef.current = true;
      setStarted(false);
    }

    secondsLeftRef.current = duration * minute;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, currentId, completeSession]);

  const resetTimer = () => {
    secondsLeftRef.current = duration * minute;
    setSecondsLeft(secondsLeftRef.current);
    setIsPaused(true);
    isPausedRef.current = true;
  };

  const totalSeconds = duration * minute;
  const percentage = Math.round((secondsLeft / totalSeconds) * 1000) / 10;

  const minutes = Math.floor(secondsLeft / minute);
  let seconds = secondsLeft % minute;
  if (seconds < 10) seconds = "0" + seconds;

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "Users", currentUser.uid, "Pomodoros"),
        orderBy("createdAt", "desc"),
        limit(5)
      ),
      (allPomodoros) => {
        let tempPomodoros = [];
        allPomodoros.docs.forEach((session) => {
          tempPomodoros.push(session.data());
        });
        console.log("Updating pomodoros");
        console.log(tempPomodoros);
        setPomodoros(tempPomodoros);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

  return (
    <div>
      <div className="p-3">
        <div className="relative flex aspect-square w-full flex-col items-center justify-center rounded-full">
          <PomodoroTime
            minutes={minutes}
            minute={minute}
            seconds={seconds}
            time={secondsLeftRef.current}
            isPaused={isPausedRef.current}
          />
          {/* Create circular progress bar with svg */}
          <div className="absolute -z-10 h-full w-full">
            <CircularProgressbar value={percentage} strokeWidth={4} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {isPaused && !started ? (
          <button
            onClick={() => {
              const id = uuidv4();
              setCurrentId(id);
              startSession(id, totalSeconds / 60);
              setIsPaused(false);
              isPausedRef.current = false;
              setStarted(true);
            }}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-accent hover:text-white"
          >
            <HiPlay className="-ml-1 text-xl" />
            Start
          </button>
        ) : isPaused && started ? (
          <button
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-accent hover:text-white"
          >
            <HiPlay className="-ml-1 text-xl" />
            Resume
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
              className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-500 hover:text-white"
            >
              <HiPause className="-ml-1 text-xl" />
              Pause
            </button>
            <button
              onClick={() => {
                resetTimer();
                setCurrentId(null);
              }}
              className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-red-400 hover:text-white"
            >
              <HiXCircle className="-ml-1 text-xl" />
              Reset
            </button>
          </>
        )}
      </div>
      <div className="relative mt-8 mb-4">
        <hr className="h-[2px] w-full border-0 bg-gray-100" />
        <p
          className={`label-center absolute truncate bg-white px-2 text-xs font-bold uppercase text-gray-400`}
        >
          Recent Sessions
        </p>
      </div>
      <ul className="space-y-1">
        {pomodoros.map((session) => (
          <PomodoroCard key={session.id} session={session} />
        ))}
      </ul>
    </div>
  );
};

export default Pomodoro;
