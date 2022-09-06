import { Play } from 'phosphor-react';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles';

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor='task'>I will work at</label>
          <TaskInput
            id='task'
            list='task-suggestions'
            placeholder='Name your task'
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

        <StartCountDownButton type='submit'>
          <Play size={24} />
          Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};
