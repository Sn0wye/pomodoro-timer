import { formatDistanceToNow } from 'date-fns';
import { useCycles } from '../../hooks/useCycles';
import { HistoryContainer, HistoryList, Status } from './styles';

export const History = () => {
  const { cycles } = useCycles();
  return (
    <HistoryContainer>
      <h1>My History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor='green'>Done</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor='red'>Interrupted</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor='yellow'>In Progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};
