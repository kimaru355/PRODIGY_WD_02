import { useEffect, useState } from "react";

function Stopwatch() {
  // Variable declarations and initialization
  const common =
    "w-28 h-28 rounded-full text-3xl hover:scale-90 active:scale-110";
  const [timer, setTimer] = useState(["00", "00", "00"]);
  const [main, setMain] = useState("Start");
  const [mod, setMod] = useState("Lap");
  const [mainUI, setMainUI] = useState(`${common} bg-green-300`);
  const [modUI, setModUI] = useState(`${common} bg-cyan-300`);
  const [laps, setLaps] = useState([]);

  // handle start and pause
  const handleMain = (event) => {
    if (event.target.id === "Start") {
      setMain("Pause");
      setMainUI(`${common} bg-orange-300`);
      setMod("Lap");
      setModUI(`${common} bg-cyan-300`);
    } else if (event.target.id === "Pause") {
      setMain("Start");
      setMainUI(`${common} bg-green-300`);
      setMod("Reset");
      setModUI(`${common} bg-red-300`);
    }
  };

  // handle lap and reset
  const handleMod = (event) => {
    if (event.target.id === "Lap" && main === "Pause") {
      setLaps((prevLaps) => {
        let newLaps = JSON.parse(JSON.stringify(prevLaps));
        newLaps.splice(0, 0, [...timer]);
        return newLaps;
      });
    } else {
      setMod("Lap");
      setModUI(`${common} bg-cyan-300`);
      setTimer(["00", "00", "00"]);
      setLaps([]);
    }
  };

  // run stopwatch
  useEffect(() => {
    if (main === "Pause") {
      const setIntval = setInterval(() => {
        setTimer((prevTimer) => {
          let currentTime = 0;
          let newTimer = [...prevTimer];
          if (+newTimer[newTimer.length - 1] < 99) {
            currentTime = +newTimer[newTimer.length - 1] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            newTimer[newTimer.length - 1] = currentTime;
            return newTimer;
          } else if (+newTimer[newTimer.length - 2] < 59) {
            currentTime = +newTimer[newTimer.length - 2] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            newTimer[newTimer.length - 2] = currentTime;
            newTimer[newTimer.length - 1] = "00";
            return newTimer;
          } else if (+newTimer[newTimer.length - 3] < 59) {
            currentTime = +newTimer[newTimer.length - 3] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            newTimer[newTimer.length - 3] = currentTime;
            newTimer[newTimer.length - 2] = "00";
            newTimer[newTimer.length - 1] = "00";
            return newTimer;
          } else if (+newTimer[newTimer.length - 3] === 60) {
            if (newTimer.length < 4) {
              newTimer[newTimer.length - 3] = "01";
              newTimer[newTimer.length - 2] = "00";
              newTimer[newTimer.length - 1] = "00";
              newTimer.push("00");
              return newTimer;
            }
            currentTime = +newTimer[newTimer.length - 4] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            newTimer[newTimer.length - 4] = currentTime;
            newTimer[newTimer.length - 3] = "00";
            newTimer[newTimer.length - 2] = "00";
            newTimer[newTimer.length - 1] = "00";
            return newTimer;
          }
        });
      }, 10);

      return () => clearInterval(setIntval);
    }
  }, [main]);

  return (
    <div>
      <h2 className="text-blue-500 font-bold text-4xl text-center bg-gray-400 mb-8 py-4">
        Stopwatch
      </h2>
      <div className="flex justify-center items-center flex-col gap-8">
        <div className="flex justify-center items-center bg-gray-600 gap-2 py-4 px-8">
          {timer.map((time, index) => (
            <p key={index} className="bg-white text-4xl font-bold">
              {time}
            </p>
          ))}
        </div>
        <div className="flex justify-between w-full max-w-72">
          <button id={mod} type="button" onClick={handleMod} className={modUI}>
            {mod}
          </button>
          <button
            id={main}
            type="button"
            onClick={handleMain}
            className={mainUI}
          >
            {main}
          </button>
        </div>
        <div className="flex flex-col w-full text-2xl bg-gray-800 max-w-96 gap-1">
          {laps.length > 0 &&
            laps.map((lap, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center w-full bg-gray-400"
                >
                  <p>Lap {laps.length - index}</p>
                  <div className="bg-gray-500 flex gap-2 px-2 py-2">
                    {lap.map((lapItem, index) => {
                      return (
                        <p key={index} className="bg-red-300">
                          {lapItem}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
