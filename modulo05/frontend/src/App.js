import React from 'react';
import * as API from './services/transactionService';
import M from 'materialize-css';
import { PERIODS } from './helpers/periods';
import { normalizeText } from './helpers/formatter';
import Header from './components/Header';
import Periods from './components/Periods';
import Status from './components/Status';
import Filter from './components/Filter';
import Spinner from './components/Spinner';
import Card from './components/Card/Card';
import ModalTransaction from './components/ModalTransaction';

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [filterTransactions, setFilterTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [income, setIncome] = React.useState(0);
  const [expenses, setExpenses] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState({});

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await API.getAllTransactions(currentPeriod);
      setTransactions(transactions);
      setFilterTransactions(transactions);
      calcTransactions(transactions);
    };
    fetchTransactions();
  }, [currentPeriod]);

  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handlePeriodChange = (value) => {
    setCurrentPeriod(value);
  };

  const calcTransactions = (transactions) => {
    setIncome(API.getAllIncomeExpenses(transactions, '+'));
    setExpenses(API.getAllIncomeExpenses(transactions, '-'));
  };

  const handleFilter = (value) => {
    const filteredTransactions = transactions.filter((transaction) => {
      let description = normalizeText(transaction.description);
      return description.includes(normalizeText(value));
    });
    setFilterTransactions(filteredTransactions);
    calcTransactions(filteredTransactions);
  };

  const handleNewTransaction = (value) => {
    setIsModalOpen(value);
  };

  const handleCloseModal = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="container">
      {transactions.length === 0 && (
        <Spinner text="Carregando..." size="small" />
      )}

      {transactions.length > 0 && (
        <>
          <Header />
          <Periods
            onSelectChange={handlePeriodChange}
            currentPeriod={currentPeriod}
            periods={PERIODS}
          />
          <Status
            totalTransactions={filterTransactions.length}
            totalIncome={income}
            totalExpenses={expenses}
            total={income - expenses}
          />
          <Filter
            onChange={handleFilter}
            onClickNewTransaction={handleNewTransaction}
          />
          <div>
            {filterTransactions.map((transaction) => {
              return <Card key={transaction._id} transaction={transaction} />;
            })}
          </div>
        </>
      )}
      <ModalTransaction
        showModal={handleCloseModal}
        isOpen={isModalOpen}
        selectedTransaction={selectedTransaction}
      />
    </div>
  );
}
