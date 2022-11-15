import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        '@pomodoro-timer:cycles-state-1.0.0'
      );

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }

      return {
        cycles: [],
        activeCycleId: null
      };
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [passedSecondsAmount, setPassedSecondsAmount] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  const setPassedSeconds = (seconds: number) => {
    setPassedSecondsAmount(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: window.crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    dispatch(addNewCycleAction(newCycle));

    setPassedSecondsAmount(0);
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
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
        createNewCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => {
  return useContext(CyclesContext);
};
