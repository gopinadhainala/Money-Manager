import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInputValue: '',
    amountInputValue: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  getOptionClicked = event => {
    this.setState({optionId: event.target.value})
  }

  getTitleEntered = event => {
    this.setState({titleInputValue: event.target.value})
  }

  clickedAddBtn = event => {
    event.preventDefault()
    const {optionId, titleInputValue, amountInputValue} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInputValue,
      amount: parseInt(amountInputValue),
      type: displayText,
    }
    if (titleInputValue !== '' && amountInputValue !== '') {
      this.setState(prevValue => ({
        transactionList: [...prevValue.transactionList, newTransaction],
        titleInputValue: '',
        amountInputValue: '',
        optionId: transactionTypeOptions[0].optionId,
      }))
    }
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expenseAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })
    return expenseAmount
  }

  getbalanceAmount = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  getAmountEntered = event => {
    this.setState({amountInputValue: event.target.value})
  }

  render() {
    const {
      transactionList,
      titleInputValue,
      amountInputValue,
      optionId,
    } = this.state
    const balanceAmount = this.getbalanceAmount()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpenses()
    return (
      <div className="main-money-container">
        <div className="container">
          <div className="profile-container">
            <h1 className="name-heading">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your
              <span className="welcome-span"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
          />
          <div className="input-and-history-container">
            <div className="transaction-input-container">
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <form className="transaction-form">
                <label htmlFor="transactionTitle" className="label-text">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="TITLE"
                  id="transactionTitle"
                  className="input-text"
                  value={titleInputValue}
                  onChange={this.getTitleEntered}
                />
                <label htmlFor="transactionAmount" className="label-text">
                  AMOUNT
                </label>
                <input
                  type="text"
                  placeholder="AMOUNT"
                  id="transactionAmount"
                  className="input-text"
                  onChange={this.getAmountEntered}
                  value={amountInputValue}
                />
              </form>
              <label htmlFor="transactionType" className="label-text">
                TYPE
              </label>
              <select
                id="transactionType"
                className="input-text"
                value={optionId}
                onChange={this.getOptionClicked}
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    key={eachTransactionType.optionId}
                    value={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="add-button"
                onClick={this.clickedAddBtn}
              >
                Add
              </button>
            </div>
            <div className="transaction-input-container transaction-history-container">
              <h1 className="add-transaction-heading">History</h1>
              <ul className="history-unordered-list">
                <li className="history-list-item">
                  <p className="transaction-cell">Title</p>
                  <p className="transaction-cell">Amount</p>
                  <p className="transaction-cell">Type</p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    eachTransaction={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
