import { useEffect, useState } from "react";

function Stopwatch() {
  const common =
    "w-28 h-28 rounded-full text-3xl hover:scale-90 active:scale-110";
  const [timer, setTimer] = useState(["00", "00", "00"]);
  const [main, setMain] = useState("Start");
  const [mod, setMod] = useState("Lap");
  const [mainUI, setMainUI] = useState(`${common} bg-green-300`);
  const [modUI, setModUI] = useState(`${common} bg-cyan-300`);
  const [laps, setLaps] = useState([]);

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

  const handleMod = (event) => {
    if (event.target.id === "Lap") {
      setLaps((prevLaps) => {
        prevLaps.push([...timer]);
        return prevLaps;
      });
      console.log(laps);
    } else {
      setMod("Lap");
      setModUI(`${common} bg-cyan-300`);
      setTimer(["00", "00", "00"]);
      setLaps([]);
    }
  };

  useEffect(() => {
    if (main === "Pause") {
      const setIntval = setInterval(() => {
        setTimer((prevTimer) => {
          let currentTime = 0;
          if (+prevTimer[prevTimer.length - 1] < 99) {
            currentTime = +prevTimer[prevTimer.length - 1] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            prevTimer[prevTimer.length - 1] = currentTime;
            return prevTimer;
          } else if (+prevTimer[prevTimer.length - 2] < 59) {
            currentTime = +prevTimer[prevTimer.length - 2] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            prevTimer[prevTimer.length - 2] = currentTime;
            prevTimer[prevTimer.length - 1] = "00";
            return prevTimer;
          } else if (+prevTimer[prevTimer.length - 3] < 59) {
            currentTime = +prevTimer[prevTimer.length - 3] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            prevTimer[prevTimer.length - 3] = currentTime;
            prevTimer[prevTimer.length - 2] = "00";
            prevTimer[prevTimer.length - 1] = "00";
            return prevTimer;
          } else if (+prevTimer[prevTimer.length - 3] === 60) {
            if (prevTimer.length < 4) {
              prevTimer[prevTimer.length - 3] = "01";
              prevTimer[prevTimer.length - 2] = "00";
              prevTimer[prevTimer.length - 1] = "00";
              prevTimer.push("00");
              return prevTimer;
            }
            currentTime = +prevTimer[prevTimer.length - 4] + 1;
            currentTime =
              currentTime < 10 ? "0" + currentTime : "" + currentTime;
            prevTimer[prevTimer.length - 4] = currentTime;
            prevTimer[prevTimer.length - 3] = "00";
            prevTimer[prevTimer.length - 2] = "00";
            prevTimer[prevTimer.length - 1] = "00";
            return prevTimer;
          }
        });
      }, 100);

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
        <div className="flex flex-col gap-4 text-2xl">
          {laps.length > 0 &&
            laps.map((lap, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between w-full max-w-96 bg-red-300"
                >
                  <div className="bg-">
                    <p>Lap {index}</p>
                    {lap.map((lapItem, index) => {
                      return <p key={index}>{lapItem}</p>;
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
