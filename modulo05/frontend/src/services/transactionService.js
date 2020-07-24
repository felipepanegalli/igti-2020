import axios from 'axios';
import API from './config';

// Retorna todas as transações
const getAllTransactions = async (currentPeriod) => {
  const res = await axios.get(API + `?period=${currentPeriod}`);
  return res.data.transactions;

  // const grades = res.data.transactions.map((transaction) => {
  //   const { description, value, category, type, _id } = transaction;
  // });
};

// Retorna todas as despesas e receitas com base no typo da transação
const getAllIncomeExpenses = (transactions, typeTransaction) => {
  const data = transactions
    .filter((transaction) => {
      return transaction.type === typeTransaction;
    })
    .reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

  return data;
};

export { getAllTransactions, getAllIncomeExpenses };
