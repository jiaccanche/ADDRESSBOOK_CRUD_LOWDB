const low = require('lowdb');
const fileAsync = require('lowdb/adapters/FileAsync');

let dataBase;

async function createConnection(){
  const adapter = new fileAsync('db.json');
  dataBase = await low(adapter);
  dataBase.defaults({users:[],contacts:[]}).write(); 
}

const getConnection = () => dataBase;

module.exports = {
  createConnection,
  getConnection
}