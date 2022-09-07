import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles';

const newCycleValidationSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    console.log(data);
    reset();
  };

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor='task'>I will work at</label>
          <TaskInput
            id='task'
            list='task-suggestions'
            placeholder='Name your task'
            {...register('task')}
          />

          <datalist id='task-suggestions'>
            <option value='Projeto 1' />
            <option value='Projeto 2' />
            <option value='Projeto 3' />
            <option value='Banana' />
          </datalist>
          <label htmlFor='minutesAmount'>for</label>
          <MinutesAmountInput
            type='number'
            id='minutesAmount'
            placeholder='00'
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type='submit'>
          <Play size={24} />
          Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};
