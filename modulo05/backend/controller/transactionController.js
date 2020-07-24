const Transaction = require('../models/TransactionModel');
const { isEmpty } = require('lodash');

const findByPeriod = async (req, res) => {
  periodQry = req.query.period;
  if (!periodQry) {
    return res.status(400).send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
  }

  const transactions = await Transaction.find({ yearMonth: periodQry }).sort({
    day: 1,
  });
  if (!transactions) {
    return res
      .status(400)
      .send({ message: 'Nenhuma transação foi encontrada.' });
  }

  return res.json({
    lenght: transactions.length,
    transactions: transactions,
  });
};

const create = async (req, res) => {
  const transaction = new Transaction({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
  });
  try {
    await transaction.save(transaction);
    return res.send({ message: 'Transaction salvo com sucesso.' });
  } catch (e) {
    return res
      .status(500)
      .send({ message: 'Erro ao salvar.', error: e.message });
  }
};

// const findOne = async (req, res) => {
//   const description = req.params.description;

//   var condition = description
//     ? { description: { $regex: new RegExp(description), $options: 'i' } }
//     : {};

//   try {
//     const transaction = await Transaction.find(condition);
//     if (!transaction) {
//       return res
//         .status(400)
//         .send({ message: 'Nenhuma transação foi encontrada.' });
//     }
//     return res.send(transaction);
//   } catch (error) {
//     return res.status(500).send({ message: 'Erro ao buscar transação.' });
//   }
// };

const update = async (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(400).send({
      message: 'Os dados não podem ficar vazios.',
    });
  }

  if (req.body.id) {
    return res.status(400).send({
      message: 'ID é imutável.',
    });
  }

  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      return res
        .status(400)
        .send({ message: 'Nenhuma transação foi encontrada.' });
    }

    res.send({ message: 'Transação atualizada com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar transação' });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndDelete({ _id: id });

    if (!data) {
      return res
        .status(404)
        .send({ message: 'Nenhuma transação foi encontrada.' });
    }

    res.send({ message: 'Trensação excluida com sucesso.' });
  } catch (error) {
    res.status(500).send({ message: 'Nao foi possivel deletar a transação.' });
  }
};

module.exports = { findByPeriod, create, update, remove };
