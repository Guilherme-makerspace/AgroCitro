const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: '10.111.9.90',
  user: 'citro_user',
  database: 'agrocitro_bd',
  password: 'senhaforte123!'
});

// ================== SELECTS ==================
async function ObterPlantio() {
  const sql = 'SELECT * FROM plantio';
  const [rows] = await connection.execute(sql);
  return rows;
}

async function ObterIrrigacao() {
  const sql = 'SELECT * FROM irrigacao';
  const [rows] = await connection.execute(sql);
  return rows;
}

async function ObterColheita() {
  const sql = 'SELECT * FROM colheita';
  const [rows] = await connection.execute(sql);
  return rows;
}

// ================== INSERTS ==================
async function RegisterPlantio(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) {
  const sql = 'INSERT INTO plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) VALUES (?,?,?,?)';
  const [result] = await connection.execute(sql, [Variedade, Data_Plantio, Quantidade_Plantada, Localizacao]);
  return { affectedRows: result.affectedRows, insertId: result.insertId };
}

async function AgendarIrrigacao(Horario_Inicial, Horario_Final) {
  const sql = 'INSERT INTO irrigacao (Horario_Inicial, Horario_Final) VALUES (?, ?)';
  const [result] = await connection.execute(sql, [Horario_Inicial, Horario_Final]);
  return { affectedRows: result.affectedRows, insertId: result.insertId };
}

async function RegisterColheita(Data_Colheita, Quantidade_Colhida, Qualidade) {
  const sql = 'INSERT INTO colheita (Data_Colheita, Quantidade_Colhida, Qualidade) VALUES (?, ?, ?)';
  const [result] = await connection.execute(sql, [Data_Colheita, Quantidade_Colhida, Qualidade]);
  return { affectedRows: result.affectedRows, insertId: result.insertId };
}

// ================== AUTH ==================
async function RegisterUser(email, senha) {
  const sql = 'INSERT INTO login (Email, Senha) VALUES (?, ?)';
  const [result] = await connection.execute(sql, [email, senha]);
  return { affectedRows: result.affectedRows, insertId: result.insertId };
}

async function FindUser(email, senha) {
  const sql = 'SELECT * FROM login WHERE Email = ? AND Senha = ? LIMIT 1';
  const [rows] = await connection.execute(sql, [email, senha]);
  return rows[0];
}

module.exports = {
  ObterPlantio,
  RegisterPlantio,
  AgendarIrrigacao,
  RegisterColheita,
  ObterIrrigacao,
  ObterColheita,
  RegisterUser,
  FindUser
};
