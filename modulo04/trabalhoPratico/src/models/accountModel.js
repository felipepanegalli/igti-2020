export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: Number,
      required: true,
    },
    conta: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error('valor negativo não permitido');
        }
      },
    },
  });

  const Accounts = mongoose.model('accounts', schema);

  return Accounts;
};
