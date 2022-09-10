import { differenceInSeconds } from 'date-fns';
import { useEffect } from 'react';
import { useCycles } from '../../../../hooks/useCycles';
import { CountdownContainer, Separator } from './styles';

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    passedSecondsAmount,
    setPassedSeconds,
  } = useCycles();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsPassed >= totalSeconds) {
          markCurrentCycleAsFinished();

          setPassedSeconds(totalSeconds);

          clearInterval(interval);
        } else {
          setPassedSeconds(secondsPassed);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setPassedSeconds,
  ]);

  const currentSeconds = activeCycle ? totalSeconds - passedSecondsAmount : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};
