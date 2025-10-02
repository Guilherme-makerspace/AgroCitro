const express = require('express');
const path = require('path');
const {
  ObterPlantio, RegisterPlantio, ObterIrrigacao, AgendarIrrigacao,
  ObterColheita, RegisterColheita, RegisterUser, FindUser
} = require('../database/database');

const script = express();
script.use(express.json());
script.use(express.static(path.join(__dirname, '../public')));

// npm list mysql2

// GETs
script.get('/plantios', async (req, res) => res.json(await ObterPlantio()));
script.get('/colheita', async (req, res) => res.json(await ObterColheita()));
script.get('/irrigacao', async (req, res) => res.json(await ObterIrrigacao()));

// POSTs compactos
script.post('/registrarPlantio', async (req, res) => {
  const { Variedade, Data_Plantio, Quantidade_Plantada, Localizacao } = req.body;
  const resposta = await RegisterPlantio(Variedade, Data_Plantio, Quantidade_Plantada, Localizacao);
  res.json(resposta.affectedRows ? { msg: 'Sucesso', novoID: resposta.insertId } : { msg: 'Não cadastrado!' });
});

script.post('/agendarIrrigacao', async (req, res) => {
  const { Horario_Inicial, Horario_Final } = req.body;
  const resposta = await AgendarIrrigacao(Horario_Inicial, Horario_Final);
  res.json(resposta.affectedRows ? { msg: 'Sucesso', novoID: resposta.insertId } : { msg: 'Não cadastrado!' });
});

script.post('/registrarColheita', async (req, res) => {
  const { Data_Colheita, Quantidade_Colhida, Qualidade } = req.body;
  const resposta = await RegisterColheita(Data_Colheita, Quantidade_Colhida, Qualidade);
  res.json(resposta.affectedRows ? { msg: 'Sucesso', novoID: resposta.insertId } : { msg: 'Não cadastrado!' });
});

// AUTH (no backend)
script.post('/api/register', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Email e senha obrigatórios' });

  const result = await RegisterUser(email, senha);
  res.status(result.affectedRows ? 201 : 500).json(result.affectedRows ? { msg: 'Usuário cadastrado com sucesso!' } : { error: 'Erro ao cadastrar' });
});

script.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Email e senha obrigatórios' });

  const user = await FindUser(email, senha);
  if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

  res.json({ msg: 'Login realizado', user: { id: user.id_login, email: user.Email } });
});

script.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando em http://10.111.9.90:3000');
});
