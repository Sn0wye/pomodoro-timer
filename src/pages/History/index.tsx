import { HistoryContainer, HistoryList, Status } from './styles';

export const History = () => {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='yellow'>Em andamento</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='red'>Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 cerca de 2 meses</td>
              <td>
                <Status statusColor='green'>Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};