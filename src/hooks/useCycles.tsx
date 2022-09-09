import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: Cycle['id'] | null;
  passedSecondsAmount: number;
  markCurrentCycleAsFinished: () => void;
  setPassedSeconds: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

const CyclesContext = createContext({} as CyclesContextType);

export const CyclesContextProvider = ({ children }: PropsWithChildren) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<Cycle['id'] | null>(null);
  const [passedSecondsAmount, setPassedSecondsAmount] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const setPassedSeconds = (seconds: number) => {
    setPassedSecondsAmount(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  };

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: window.crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevState) => [...prevState, newCycle]);
    setActiveCycleId(newCycle.id);
    setPassedSecondsAmount(0);
  };

  const interruptCurrentCycle = () => {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        passedSecondsAmount,
        setPassedSeconds,
        interruptCurrentCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => {
  return useContext(CyclesContext);
};
