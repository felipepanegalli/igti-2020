import db from '../models/index.js';

const accounts = db.account;

const all = async (req, res) => {
  try {
    const ListAccounts = await accounts.find({});
    res.json(ListAccounts);
  } catch (error) {
    res.json({ error: error });
  }
};

const deposit = async (req, res) => {
  const { agencia, conta, valor } = req.body;

  if (!agencia) res.send('Agencia não informada');

  try {
    const account = await accounts.findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });
    if (!account) res.send('Agencia ou conta não encontrada');
    account.balance += valor;
    account.save();

    res.json({ msg: `Seu novo saldo é ${account.balance}` });
  } catch (error) {
    res.json({ error: error });
  }
};

const withdraw = async (req, res) => {
  const { agencia, conta, valor } = req.body;

  if (!agencia) res.send('Agencia não informada');

  try {
    const account = await accounts.findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });
    if (!account) res.send('Agencia ou conta não encontrada');

    if (account.balance - (valor + 1) >= 0) {
      account.balance -= valor + 1;
      account.save();
      res.json({ msg: `Seu novo saldo é ${account.balance}` });
    } else {
      res.json({
        msg: `Você não tem saldo suficiente para realizar essa operação.`,
      });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

const balance = async (req, res) => {
  const { agencia, conta } = req.body;

  if (!agencia) res.send('Agencia não informada');
  if (!conta) res.send('Conta não informada');

  try {
    const account = await accounts.findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });
    if (!account) res.send('Agencia ou conta não encontrada');

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const deleteAccount = async (req, res) => {
  const { agencia, conta } = req.body;

  if (!agencia) res.send('Agencia não informada');
  if (!conta) res.send('Conta não informada');

  try {
    let account = await accounts.findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });

    if (account) {
      account = await accounts.deleteOne({
        $and: [{ agencia: agencia }, { conta: conta }],
      });

      const listAccounts = await accounts.find({});

      res.json({
        ativeAccounts: listAccounts,
      });
    } else {
      res.send('Agencia ou conta não encontrada');
    }
  } catch (error) {
    res.json({ error: error });
  }
};

const transfer = async (req, res) => {
  const { contaOrig, valorOrig, contaDest } = req.body;

  if (!contaOrig) return res.send('Conta de origem não informada.');
  if (!valorOrig) return res.send('Valor da transferência não informado.');
  if (!contaDest) return res.send('Conta de destino não informada.');

  try {
    let accountOrig = await accounts.findOne({
      $and: [{ conta: contaOrig }],
    });
    if (!accountOrig) return res.send('Conta de origem inválidas.');

    let accountDest = await accounts.findOne({
      $and: [{ conta: contaDest }],
    });
    if (!accountDest) return res.send('Conta de destino inválidas.');

    let tax = 0;
    accountOrig.agencia === accountDest.agencia ? (tax = 0) : (tax = 8);
    if (accountOrig.balance - valorOrig + tax >= 0) {
      accountOrig.balance -= valorOrig + tax;
      accountDest.balance += valorOrig;
      accountOrig.save();
      accountDest.save();
      return res.json({ de: accountOrig.balance });
    }

    return res.json({
      msg: `Você não tem saldo suficiente para realizar essa operação.`,
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const average = async (req, res) => {
  const { agencia } = req.body;

  if (!agencia) return res.send('Agencia não informada');
  let accountAvg = await accounts.aggregate([
    { $match: { agencia: agencia } },
    { $group: { _id: '$agencia', media: { $avg: '$balance' } } },
  ]);
  return res.json({ accountAvg });
};

const findByAsc = async (req, res) => {
  const { limit } = req.body;

  if (!limit)
    return res.send('Informe um limite de contas a serem retornadas.');
  let totalAccounts = await accounts
    .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
    .sort({ balance: 1 })
    .limit(limit);
  return res.json({ totalAccounts });
};

const findByDesc = async (req, res) => {
  const { limit } = req.body;

  if (!limit)
    return res.send('Informe um limite de contas a serem retornadas.');
  let totalAccounts = await accounts
    .find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
    .sort({ balance: -1, name: 1 })
    .limit(limit);
  return res.json({ totalAccounts });
};

const privateAccounts = async (req, res) => {
  const totalAccounts = await accounts.aggregate([
    { $sort: { balance: -1, name: 1 } },
    {
      $group: {
        _id: '$agencia',
        conta: { $first: '$conta' },
        name: { $first: '$name' },
        balance: { $first: '$balance' },
      },
    },
  ]);

  await accounts.updateMany(
    {
      conta: { $in: totalAccounts.map((a) => a.conta) },
    },
    { $set: { agencia: 99 } }
  );

  return res.json({ totalAccounts });
};

export default {
  all,
  deposit,
  withdraw,
  balance,
  deleteAccount,
  transfer,
  average,
  findByAsc,
  findByDesc,
  privateAccounts,
};
