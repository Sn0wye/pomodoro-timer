import { useFormContext } from 'react-hook-form';

import { useCycles } from '../../../../hooks/useCycles';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export const NewCycleForm = () => {
  const { activeCycle } = useCycles();
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor='task'>I will work at</label>
      <TaskInput
        id='task'
        list='task-suggestions'
        placeholder='Name your task'
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  );
};
