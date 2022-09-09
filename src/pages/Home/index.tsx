import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer,
  StartCountdownButton,
  // eslint-disable-next-line prettier/prettier
  StopCountdownButton
} from './styles';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: Cycle['id'] | null;
  passedSecondsAmount: number;
  markCurrentCycleAsFinished: () => void;
  setPassedSeconds: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCycleValidationSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<Cycle['id'] | null>(null);
  const [passedSecondsAmount, setPassedSecondsAmount] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const setPassedSeconds = (seconds: number) => {
    setPassedSecondsAmount(seconds);
  };

  const { handleSubmit, reset, watch } = newCycleForm;

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

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: window.crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((prevState) => [...prevState, newCycle]);
    setActiveCycleId(newCycle.id);
    setPassedSecondsAmount(0);

    reset();
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  const handleCycleInterrupt = () => {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            passedSecondsAmount,
            setPassedSeconds,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={handleCycleInterrupt}>
            <HandPalm size={24} />
            Interrupt
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
