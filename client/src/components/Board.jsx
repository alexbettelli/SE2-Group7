import '../style/Board.css';

function Board(props){
  return (
    <table className='board'>
        <tr>
            <th>Ticket</th>
            <th>Counter</th>
        </tr>
      {
        Object.entries(props.board).map(([key, value], index) => {
          return (
            <tr>
                <td>{value}</td>
                <td>{key}</td>
            </tr>
          )
        })
      }
    </table>
  )
}

export default Board;