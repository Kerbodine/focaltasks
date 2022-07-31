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
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import PomodoroBar from "./PomodoroBar";
import splitbee from "@splitbee/web";

const Pomodoro = () => {
  const minute = 60; // seconds

  const { duration, startSession, completeSession } = usePomodoro();

  const [isPaused, setIsPaused] = useState(true);
  const [started, setStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [currentId, setCurrentId] = useState(null);
  const [pomodoros, setPomodoros] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const { currentUser } = useAuth();

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

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

    const start = document.timeline.currentTime;
    function frame(time) {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      const elapsed = time - start;
      const seconds = Math.round(elapsed / 1000);
      const secondsLeft = duration * minute;
      secondsLeftRef.current = secondsLeft - seconds;
      setSecondsLeft(secondsLeft - seconds);
      const targetNext = (seconds + 1) * 1000 + start;
      setTimeout(
        () => requestAnimationFrame(frame),
        targetNext - performance.now()
      );
    }

    frame(start);
  }, [duration, currentId]);

  const resetTimer = () => {
    secondsLeftRef.current = duration * minute;
    setSecondsLeft(secondsLeftRef.current);
    setIsPaused(true);
    isPausedRef.current = true;
    splitbee.track("Reset timer", {
      duration: secondsLeftRef.current,
    });
  };

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      if (started) {
        console.log("Beforeunload event triggered");
        return (event.returnValue = "Are you sure you want to exit?");
      } else {
        return;
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [started]);

  const totalSeconds = duration * minute;
  const percentage = Math.round((secondsLeft / totalSeconds) * 1000) / 10;

  const minutes = Math.floor(secondsLeft / minute);
  let seconds = secondsLeft % minute;
  if (seconds < 10) seconds = "0" + seconds;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "Users", currentUser.uid, "Pomodoros"),
        orderBy("createdAt", "desc"),
        limit(3)
      ),
      (allPomodoros) => {
        let tempPomodoros = [];
        allPomodoros.docs.forEach((session) => {
          tempPomodoros.push(session.data());
        });
        setPomodoros(tempPomodoros);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

  // group all documents into an array of dates
  const groupSessions = (pomodoros) => {
    let pastPomodorosByDay = {};
    pomodoros.forEach((pomodoro) => {
      const date = new Date(pomodoro.completedAt.seconds * 1000);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const weekday = date.getDay();
      const key = `${day}-${month}-${year}-${weekday}`;
      if (pastPomodorosByDay[key]) {
        pastPomodorosByDay[key] += pomodoro.time;
      } else {
        pastPomodorosByDay[key] = pomodoro.time;
      }
    });
    return pastPomodorosByDay;
  };

  // return array of labels based on current weekday
  const getLabels = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var goBackDays = 7;
    var today = new Date();
    var daysSorted = [];
    for (var i = 0; i < goBackDays; i++) {
      var newDate = new Date(today.setDate(today.getDate() - 1));
      daysSorted.push(days[newDate.getDay()]);
    }
    return daysSorted.reverse();
  };

  // return array of times based on label days and grouped pomodoro sessions
  const getData = (daysSorted, pastPomodorosByDay) => {
    const numDays = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    let chartData = {};
    daysSorted.forEach((day) => {
      let value =
        pastPomodorosByDay[
          Object.keys(pastPomodorosByDay).filter(
            (date) => date.split("-")[3] === numDays[day].toString()
          )
        ];
      chartData[day] = value;
    });
    return daysSorted.map((day) => chartData[day]);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "Users", currentUser.uid, "Pomodoros"),
        orderBy("completedAt", "desc"),
        where("completed", "==", true),
        where(
          "completedAt",
          ">=",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      ),
      (allPomodoros) => {
        let tempPomodoros = [];
        allPomodoros.docs.forEach((session) => {
          tempPomodoros.push(session.data());
        });
        // sum time spent for each day
        const pastPomodorosByDay = groupSessions(tempPomodoros);
        // get labels for chart
        const daysSorted = getLabels();
        setChartLabels(daysSorted);
        // get ordered chart data
        const chartData = getData(daysSorted, pastPomodorosByDay);
        setChartData(chartData);
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
          {/* Create circular progress bar with svg */}
          <div
            className={`absolute h-full w-full ${!started && "not-started"}`}
          >
            <CircularProgressbar value={percentage} strokeWidth={4} />
          </div>
          <PomodoroTime
            minutes={minutes}
            minute={minute}
            seconds={seconds}
            time={secondsLeftRef.current}
            isPaused={isPausedRef.current}
          />
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
              splitbee.track("Start pomodoro", {
                duration: totalSeconds / 60,
              });
            }}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-accent hover:text-white dark:bg-gray-800 dark:hover:bg-accent"
          >
            <HiPlay className="-ml-1 text-xl" />
            Start
          </button>
        ) : (
          <button
            onClick={() => {
              resetTimer();
              setCurrentId(null);
              setIsPaused(true);
              setStarted(false);
            }}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-red-400 hover:text-white dark:bg-gray-800 dark:hover:bg-red-400"
          >
            <HiXCircle className="-ml-1 text-xl" />
            Reset
          </button>
        )}
      </div>
      <div className="relative mt-8 mb-4">
        <hr className="h-[2px] w-full border-0 bg-gray-100 dark:bg-gray-800" />
        <p
          className={`label-center absolute truncate bg-white px-2 text-xs font-bold uppercase text-gray-400 dark:bg-gray-900 dark:text-gray-600`}
        >
          Recent Sessions
        </p>
      </div>
      <ul className="space-y-1">
        {pomodoros.map((session) => (
          <PomodoroCard key={session.id} session={session} />
        ))}
      </ul>
      <div className="relative mt-8 mb-4">
        <hr className="h-[2px] w-full border-0 bg-gray-100 dark:bg-gray-800" />
        <p
          className={`label-center absolute truncate bg-white px-2 text-xs font-bold uppercase text-gray-400 dark:bg-gray-900 dark:text-gray-600`}
        >
          Past week
        </p>
      </div>
      <div className="w-full overflow-hidden rounded-lg border-2 border-gray-200 px-1 pt-2 dark:border-gray-700">
        <div className="relative">
          <PomodoroBar labels={chartLabels} data={chartData} />
          <div className="absolute inset-0 grid place-items-center">
            {!chartData.filter((data) => data !== undefined).length && (
              <div className="text-center">
                <p className="text-gray-500">No data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
