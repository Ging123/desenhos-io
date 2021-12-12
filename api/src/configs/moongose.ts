const moongose = require('mongoose');

export default async function connectToMoongo() {
  const mode = process.env.MODE!;
  const dbUrl = mode === 'DEV' ?  process.env.DB_URL_TEST : process.env.DB_URL! 
  await moongose.connect(dbUrl, {
    useNewUrlParser:true, 
    useUnifiedTopology:true
  });
}