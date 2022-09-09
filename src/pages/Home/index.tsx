import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCycles } from '../../hooks/useCycles';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

const newCycleValidationSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export const Home = () => {
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycles();

  const { handleSubmit, reset, watch } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data);
    reset();
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={interruptCurrentCycle}>
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
