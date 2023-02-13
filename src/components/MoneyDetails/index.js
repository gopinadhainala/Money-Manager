import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expenseAmount} = props

  return (
    <ul className="balance-unordered-list">
      <li className="balance-list-item clr-green">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image-styling"
        />
        <div>
          <p className="amount-type">Your Balance</p>
          <p className="amount" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </li>
      <li className="balance-list-item clr-blue">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image-styling"
        />
        <div>
          <p className="amount-type">Your Income</p>
          <p className="amount" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </li>
      <li className="balance-list-item clr-violet">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image-styling"
        />
        <div>
          <p className="amount-type">Your Expenses</p>
          <p className="amount" data-testid="expensesAmount">
            Rs {expenseAmount}
          </p>
        </div>
      </li>
    </ul>
  )
}

export default MoneyDetails
