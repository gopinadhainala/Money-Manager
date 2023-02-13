import './index.css'

const TransactionItem = props => {
  const {eachTransaction, deleteTransaction} = props
  const {id, title, amount, type} = eachTransaction

  const deleteListItem = () => {
    deleteTransaction(id)
  }

  return (
    <li className="list-item-container">
      <p className="transaction-cell">{title}</p>
      <p className="transaction-cell">{amount}</p>
      <p className="transaction-cell">{type}</p>
      <button
        className="delete-image-container"
        type="button"
        onClick={deleteListItem}
        data-testId="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="trash-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
