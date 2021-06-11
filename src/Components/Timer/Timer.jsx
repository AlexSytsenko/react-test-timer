import { useEffect, useState, useCallback} from 'react';
import { interval } from 'rxjs';
import { timestamp, take } from 'rxjs/operators';

import calculateTime from '../../helpers/calculateTime';
import ControlsList from '../ControlsList';
import styles from "./Timer.module.scss";

const  Timer = () => {
  const [controls, setControls] = useState(["Start", "Wait", "Reset"]);
  const [time, setTime] = useState(0);
  const [subId, setSubId] = useState(null);
  const [wait, setWait] = useState(null);
  const [arrayOfTimestamp, setArrayOfTimestamp] = useState([]);

  const delayForWaitButton = 300;
  const intervalStep = 16;
  const lengthArrayOfTimestamp = Math.floor(delayForWaitButton / intervalStep);
  const interval$ = interval(intervalStep);
  const formatedTime = calculateTime(time);

  const resetTimer = useCallback(() => {
    setTime(0);
  }, []);

  const resetMainSubscribe = useCallback(() => {
    subId && subId.unsubscribe();
    setSubId(null);
  }, [subId]);

  const resetWaitSubscribe = useCallback(() => {
    wait && wait.unsubscribe();
    setWait(null);
  }, [wait]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.nodeName === "BUTTON" && e.target.innerText === "Start") {
      const subscribeId = interval$.subscribe(() => setTime((prev) => prev + intervalStep));
      setControls([["Stop"], ...controls.splice(1)]);
      setSubId(subscribeId);
    }
    if (e.target.nodeName === "BUTTON" && e.target.innerText === "Stop") {
      setControls([["Start"], ...controls.splice(1)]);
      resetMainSubscribe();
      resetTimer();
    }
    
    if (e.target.nodeName === "BUTTON" && e.target.innerText === "Wait") {
      

      if (wait && arrayOfTimestamp.length) {
        setControls([["Start"], ...controls.splice(1)]);
        resetWaitSubscribe();
        resetMainSubscribe();
      } else {
        setArrayOfTimestamp(() => []);
        const takeTimestamp = interval$.pipe(timestamp(), take(lengthArrayOfTimestamp));
        const subscribeId = takeTimestamp.subscribe((value) =>
          setArrayOfTimestamp((prev) => [...prev, value])
        );
        setWait(() => subscribeId);
      }
    }
    if (e.target.nodeName === "BUTTON" && e.target.innerText === "Reset") {
      resetTimer();
    }
  }
  useEffect(() => {
    if (wait && arrayOfTimestamp.length === lengthArrayOfTimestamp) {
      resetWaitSubscribe();
    }
  }, [wait, arrayOfTimestamp, lengthArrayOfTimestamp, resetWaitSubscribe]);

  useEffect(() => {
    return () => {
      resetMainSubscribe();
    };
  },[]);

  return (
    <>
      <h2 className={styles.title}>TIMER</h2>
      <div className={styles.clock}>{formatedTime}</div>
      <ControlsList onClick={handleClick} controls={controls} />
    </>
  );
}

export default Timer;



