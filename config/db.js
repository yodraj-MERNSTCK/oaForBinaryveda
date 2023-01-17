const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const uri = 'mongodb+srv://yodrajDendukuri:1234567890@yodrajdendukuri.hutfs6k.mongodb.net/test?retryWrites=true&w=majority';
    const conn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDb Connected: ${conn.connection.host}`)
    mongoose.set('debug', true);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;