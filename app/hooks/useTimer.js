import { useState } from "react";

/**
 * Creates a timer hook that counts down from a specified duration.
 * @param {number} [timerDuration=30] - The duration in seconds for the timer. Default is 30 seconds.
 * @returns {object} An object containing the time left and a function to trigger the timer.
 */

export default function (timerDuration = 30) {
  const [timeLeft, setTimeLeft] = useState();

  let timerInterval;

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) setTimeLeft(Math.round(difference / 1000));
    else {
      setTimeLeft(0);
      clearInterval(timerInterval);
    }
  };

  const triggerTimer = () => {
    const finalTime = +new Date() + timerDuration * 1000;
    timerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  return { timeLeft, triggerTimer };
}
