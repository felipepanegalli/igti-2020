import mongoose from 'mongoose';

import accountModel from './accountModel.js';

const db = {
  url: 'mongodb://localhost:27017/local',
  mongoose: mongoose,
  account: accountModel(mongoose),
};

export default db;
