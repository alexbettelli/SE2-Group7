import '../style/Board.css';

function Board(props){
  return (
    <table className='board'>
        <thead>
          <tr>
              <th>Ticket</th>
              <th>Counter</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(props.board).map(([key, value], index) => {
              return (
                <tr key={index}>
                    <td>{value}</td>
                    <td>{key}</td>
                </tr>
              )
            })
          }
        </tbody>
    </table>
  )
}

export default Board;