Projeto AgroCitro
=================

Resumo Executivo
----------------

O projeto AgroCitro é uma aplicação web simples desenvolvida para ajudar a empresa Agro Citro a gerenciar e contabilizar suas operações agrícolas. A plataforma permite o registro centralizado de plantios, o agendamento de irrigações e o controle das colheitas, substituindo processos manuais e oferecendo uma visão organizada da produção.

Integrantes do Projeto
----------------------

-   Tiago Padovani Cardoso

-   Ana Julia Costilho Martins

-   Lucas Grosa Takano

-   Guilherme Oliveira Araujo

1\. Requisitos e Estrutura
--------------------------

### Requisitos Obrigatórios do Repositório

-   [x] Código-fonte completo.

-   [x] Backup do Banco de Dados (`AgroCitro_Banco (2).sql`).

-   [x] Documentação completa (`README.md`).

-   [x] Instruções de instalação e execução.

-   [x] Instruções para validação e testes.

### Estrutura Sugerida do Repositório

Para melhor organização, recomendamos a seguinte estrutura de pastas:

```
agrocitro/
├── public/              # Arquivos de frontend (HTML, CSS, JS estático)
│   ├── index.html
│   ├── cadastrar.html
│   ├── plantio.html
│   ├── irrigacao.html
│   ├── colheita.html
│   └── css/
├── src/                 # Código-fonte do backend
│   ├── index.js         # Servidor Express e rotas
│   └── database.js      # Lógica de acesso ao banco de dados
├── db/                  # Backups do banco de dados
│   └── AgroCitro_Banco (2).sql
├── .env.example         # Exemplo de variáveis de ambiente
├── package.json
└── README.md

```

2\. Instalação e Execução Local
-------------------------------

Siga as instruções passo a passo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

-   **Node.js**: Versão 18.x ou superior.

-   **npm** ou **yarn**: Gerenciador de pacotes Node.js.

-   **MariaDB** ou **MySQL**: Servidor de banco de dados.

-   **(Opcional) nodemon**: Para reiniciar o servidor automaticamente durante o desenvolvimento.

### Passo 1: Configurar o Banco de Dados

O backup fornecido (`AgroCitro_Banco (2).sql`) contém a estrutura das tabelas e alguns dados de exemplo.

1.  Restaure o backup:

    O arquivo SQL já contém os comandos CREATE DATABASE agrocitro_bd e USE agrocitro_bd. Portanto, você pode importá-lo diretamente. Abra o terminal e execute:

    ```
    # Use este comando. Ele criará o banco 'agrocitro_bd' e importará as tabelas.
    mysql -u root -p < "db/AgroCitro_Banco (2).sql"

    ```

2.  Crie o usuário do banco de dados:

    O backend (database.js) espera se conectar com o usuário citro_user. Crie este usuário e conceda as permissões necessárias:

    ```
    -- Conecte-se ao seu cliente SQL (mysql -u root -p) e execute os comandos abaixo:
    CREATE USER 'citro_user'@'localhost' IDENTIFIED BY 'senhaforte123!';
    GRANT ALL PRIVILEGES ON agrocitro_bd.* TO 'citro_user'@'localhost';
    FLUSH PRIVILEGES;

    ```

    > **Aviso de Segurança**: O usuário acima só pode se conectar localmente (`localhost`). O código original usa o host `10.111.9.90`, o que indica acesso via rede. Se o banco de dados estiver em outra máquina, substitua `'localhost'` pelo IP do servidor da aplicação.

### Passo 2: Configurar Variáveis de Ambiente

As credenciais do banco de dados estão fixas no código (`database.js`), o que é uma má prática de segurança. Recomenda-se movê-las para variáveis de ambiente.

1.  **Crie um arquivo `.env`** na raiz do projeto, usando o `.env.example` como modelo.

2.  **Preencha o arquivo `.env`** com as credenciais corretas:

    ```
    DB_HOST=localhost
    DB_USER=citro_user
    DB_PASS=senhaforte123!
    DB_NAME=agrocitro_bd
    APP_PORT=3000

    ```

3.  **Modifique o arquivo `src/database.js`** para usar essas variáveis:

    -   **Antes (Linha 4-8):**

        ```
        const connection = mysql.createPool({
          host: '10.111.9.90',
          user: 'citro_user',
          database: 'agrocitro_bd',
          password: 'senhaforte123!'
        });

        ```

    -   **Depois (Recomendado):**

        ```
        require('dotenv').config(); // Adicione no topo do arquivo

        const connection = mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
          password: process.env.DB_PASS
        });

        ```

    -   **Instale o `dotenv`**: `npm install dotenv`

### Passo 3: Instalar Dependências e Executar

1.  **Instale as dependências do backend**:

    ```
    npm install express mysql2
    npm install -D nodemon # Apenas para desenvolvimento

    ```

    Use o `package.json` sugerido no final desta documentação para facilitar o processo com `npm install`.

2.  **Execute o servidor**:

    -   Para desenvolvimento (com `nodemon`):

        ```
        npm run dev

        ```

    -   Para produção:

        ```
        npm start

        ```

3.  Acesse a aplicação:

    Abra seu navegador e acesse http://localhost:3000. Você será redirecionado para a página de login (index.html).

3\. Verificação e Testes Manuais
--------------------------------

Para validar se o backend está funcionando corretamente, você pode usar ferramentas como `curl` ou Postman.

-   **Testar a rota GET `/plantios`**:

    ```
    curl http://localhost:3000/plantios

    ```

    O resultado esperado é um JSON contendo um array de plantios cadastrados.

-   **Testar a rota POST `/registrarPlantio`**:

    ```
    curl -X POST http://localhost:3000/registrarPlantio\
    -H "Content-Type: application/json"\
    -d '{
          "Variedade": "Laranja Pera",
          "Data_Plantio": "2025-10-02",
          "Quantidade_Plantada": 150,
          "Localizacao": "Lote 12"
        }'

    ```

    O resultado esperado é: `{"msg":"Sucesso","novoID":<id_do_novo_plantio>}`

-   **Testar a rota POST `/agendarIrrigacao`**:

    ```
    curl -X POST http://localhost:3000/agendarIrrigacao\
    -H "Content-Type: application/json"\
    -d '{
          "Horario_Inicial": "08:00:00",
          "Horario_Final": "09:30:00"
        }'

    ```

-   **Testar a rota POST `/registrarColheita`**:

    ```
    curl -X POST http://localhost:3000/registrarColheita\
    -H "Content-Type: application/json"\
    -d '{
          "Data_Colheita": "2025-10-02",
          "Quantidade_Colhida": 5000,
          "Qualidade": "Excelente"
        }'

    ```

4\. Análise Detalhada por Componente
------------------------------------

### Backend (`src/index.js`)

O backend é construído com **Express.js** e gerencia todas as rotas da API.

-   **Dependências**: `express` para o servidor e `mysql2` para comunicação com o banco.

-   **Middlewares**:

    -   `express.json()`: Habilita o parsing de corpos de requisição no formato JSON.

    -   `express.static(path.join(__dirname, '../public'))`: Serve os arquivos estáticos (HTML, CSS, JS do frontend) da pasta `public`.

-   **Rotas GET**:

    -   `/plantios`: Retorna todos os registros da tabela `plantio`.

    -   `/colheita`: Retorna todos os registros da tabela `colheita`.

    -   `/irrigacao`: Retorna todos os registros da tabela `irrigacao`.

-   **Rotas POST**:

    -   `/registrarPlantio`: Recebe um JSON com dados do plantio e o insere no banco.

    -   `/agendarIrrigacao`: Recebe horários e agenda uma irrigação.

    -   `/registrarColheita`: Recebe dados da colheita e a registra.

-   **Rotas de Autenticação**:

    -   `/api/register`: Cadastra um novo usuário.

    -   `/api/login`: Valida as credenciais de um usuário. **(ALERTA: Segurança fraca, veja seção de riscos)**.

### Camada de Dados (`src/database.js`)

Este arquivo é responsável por toda a interação com o banco de dados MySQL.

-   **Conexão**: Usa `mysql2/promise` para criar um `pool` de conexões, que é mais eficiente para gerenciar múltiplas conexões simultâneas.

-   **Funções**: Cada função encapsula uma query SQL específica (ex: `ObterPlantio`, `RegisterPlantio`).

-   **Segurança**: O uso de `connection.execute(sql, [params])` com placeholders (`?`) cria *prepared statements*, que previnem ataques de **SQL Injection**.

### Frontend (`public/`)

As páginas são compostas por HTML, CSS e JavaScript estático.

-   `index.html`: Página de **Login**. O formulário envia uma requisição `POST` para `/api/login`.

-   `cadastrar.html`: Página de **Cadastro**. Envia uma requisição `POST` para `/api/register`.

-   `plantio.html`: Permite **registrar e visualizar** plantios. Faz `POST` para `/registrarPlantio` e `GET` para `/plantios`.

-   `irrigacao.html`: Permite **agendar e visualizar** irrigações. Faz `POST` para `/agendarIrrigacao` e `GET` para `/irrigacao`.

-   `colheita.html`: Permite **registrar e visualizar** colheitas. Faz `POST` para `/registrarColheita` e `GET` para `/colheita`.

### Autenticação (`auth.js`)

Este arquivo contém a lógica de frontend para os formulários de login e cadastro.

-   **Fluxo**: Captura os eventos de `submit` dos formulários, coleta os dados dos campos, e envia-os para os endpoints `/api/register` e `/api/login` usando a API `fetch`.

-   **Feedback**: Usa `alert()` para dar feedback ao usuário (sucesso ou erro).

-   **Risco de Segurança**: O `auth.js` não foi encontrado nos arquivos, mas a lógica está embutida nos arquivos `index.html` e `cadastrar.html`. O principal risco é que a senha é enviada em **texto puro** para o backend.

### Banco de Dados (`AgroCitro_Banco (2).sql`)

-   **Tabelas Principais**:

    -   `plantio`: Armazena informações sobre as variedades plantadas, datas, quantidades e localização.

    -   `colheita`: Registra as colheitas, incluindo quantidade e qualidade.

    -   `irrigacao`: Agenda os períodos de irrigação.

    -   `login`: Armazena emails e senhas dos usuários.

-   **Inconsistência**: O arquivo `database_login.sql` parece ser uma versão antiga ou alternativa do schema de autenticação. Ele cria um banco chamado `database` e tabelas `login` e `cadastro` com uma estrutura diferente. **Recomendamos ignorá-lo e usar apenas `AgroCitro_Banco (2).sql` como fonte de verdade.**

5\. Inconsistências e Riscos de Segurança Identificados
-------------------------------------------------------

1.  **Senhas em Texto Puro**: As senhas são armazenadas e transmitidas sem qualquer tipo de criptografia (hashing). **Risco Crítico**.

    -   **Correção**: Use uma biblioteca como `bcrypt` no backend para gerar um hash da senha antes de salvá-la no banco. Na hora do login, compare o hash da senha enviada com o hash armazenado.

2.  **Credenciais Hard-Coded**: As informações de conexão com o banco de dados estão fixas no arquivo `src/database.js`.

    -   **Correção**: Mova as credenciais para variáveis de ambiente, como explicado na seção de instalação.

3.  **Endereço de IP Fixo**: O host do banco (`10.111.9.90`) está fixo no código e nas chamadas `fetch` do frontend (`plantio.html`, etc.). Isso quebra a aplicação se o IP mudar.

    -   **Correção**: No backend, use variáveis de ambiente. No frontend, use caminhos relativos para as chamadas `fetch` (ex: `fetch('/registrarPlantio', ...)` em vez de `fetch('http://10.111.9.90:3000/registrarPlantio', ...)`).

4.  **Falta de Tratamento de Erros**: As rotas no `index.js` não possuem blocos `try...catch`. Se uma query falhar, o servidor pode travar.

    -   **Correção**: Envolva a lógica de cada rota em um bloco `try...catch` para capturar erros e retornar uma resposta de erro (ex: status 500).

5.  **Nenhuma Validação no Backend**: Os dados recebidos nas rotas POST não são validados (ex: verificar se os tipos de dados estão corretos).

    -   **Correção**: Adicione validações no início de cada rota para garantir a integridade dos dados.

6\. Melhorias Sugeridas
-----------------------

-   **Curto Prazo**:

    -   Implementar hashing de senhas com `bcrypt`.

    -   Remover todas as credenciais e IPs fixos do código, usando variáveis de ambiente e caminhos relativos.

    -   Adicionar tratamento de erros robusto no backend.

-   **Médio Prazo**:

    -   Criar testes unitários e de integração (ex: com `Jest` e `Supertest`).

    -   Implementar um sistema de autenticação mais seguro (ex: JWT ou sessões).

    -   Refatorar o frontend para evitar código JavaScript duplicado nos arquivos HTML.

-   **Longo Prazo**:

    -   **Dockerizar a aplicação**: Criar um `Dockerfile` para a aplicação e um `docker-compose.yml` para orquestrar o serviço da aplicação e o banco de dados, facilitando o deploy.

    -   **CI/CD**: Configurar um pipeline de integração contínua (ex: GitHub Actions) para rodar testes automaticamente a cada commit.

7\. Checklist de Entrega para o GitHub
-----------------------------Relatório Técnico --- Projeto AgroCitro
=====================================

**Autores:** Tiago Padovani Cardoso, Ana Julia Costilho Martins, Lucas Grosa Takano, Guilherme Oliveira Araújo

* * * * *

1\. Resumo executivo
--------------------

O projeto AgroCitro propõe uma aplicação web simples para controlar e contabilizar as atividades agrícolas de uma empresa chamada *Agro Citro*. A solução integra cadastro de plantios, agendamento de irrigações e registro de colheitas, persistindo as informações em um banco de dados MySQL/MariaDB. O objetivo é oferecer uma ferramenta prática para que gestores acompanhem produções, volumes colhidos e histórico de operações.

Este relatório documenta a estrutura do repositório, o procedimento para instalar dependências, restaurar o banco de dados de exemplo, executar a aplicação em ambiente local, validar endpoints e incluir os artefatos obrigatórios para entrega no GitHub.

* * * * *

2\. Itens obrigatórios para entrega (confirmação)
-------------------------------------------------

-   Código-fonte completo do projeto (backend + frontend estático).

-   Backup do banco de dados: `AgroCitro_Banco (2).sql` (incluir na raiz do repositório).

-   Documentação completa (README.md) com instruções de instalação, configuração e execução.

-   Instruções de testes e validação do funcionamento.

-   Lista de integrantes visível no README.

-   Seção para comentários da turma.

* * * * *

3\. Pré-requisitos
------------------

-   Sistema operacional: Linux, macOS ou Windows.

-   Node.js (recomenda-se v18+).

-   MySQL ou MariaDB instalado e em execução.

-   npm (ou yarn) para instalar dependências.

-   Acesso ao terminal/linha de comando.

* * * * *

4\. Restaurar o banco de dados (passo a passo)
----------------------------------------------

1.  Copie `AgroCitro_Banco (2).sql` para o servidor onde o banco será restaurado.

2.  No terminal, execute (ajuste `root` e `agrocitro_bd` conforme necessário):

```
# criar banco (se desejar nome fixo)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS agrocitro_bd;"
# restaurar o backup
mysql -u root -p agrocitro_bd < "AgroCitro_Banco (2).sql"

```

1.  Se o arquivo SQL incluir criação de usuários, verifique se as credenciais batem com `database.js`. Caso haja credenciais diferentes, prefira usar variáveis de ambiente (ver seção 6).

* * * * *

5\. Configuração de variáveis de ambiente
-----------------------------------------

Crie um arquivo `.env` na raiz com base em `.env.example` (ver abaixo). Nunca comite `.env` com segredos.

`.env.example`:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=senha_do_banco
DB_NAME=agrocitro_bd
APP_PORT=3000

```

**Observação:** o arquivo `database.js` atualmente contém valores fixos (host 10.111.9.90 em alguns casos). É necessário mover esses valores para variáveis de ambiente e usar `process.env.DB_HOST` etc.

* * * * *

6\. Instalação do projeto (backend)
-----------------------------------

No diretório do projeto, execute:

```
npm init -y
npm install express mysql2 dotenv
npm install -D nodemon

```

Adicione scripts no `package.json` sugerido abaixo.

`package.json` sugerido:

```
{
  "name": "agrocitro",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mysql2": "^3.0.0",
    "dotenv": "^16.0.0"
  }
}

```

* * * * *

7\. Executando a aplicação
--------------------------

1.  Configure o `.env` com os valores corretos.

2.  Restaure o banco conforme seção 4.

3.  Inicie a aplicação:

```
npm run dev   # para desenvolvimento
# ou
npm start     # para produção simples

```

Acesse `http://localhost:3000` ou `http://<IP>:3000` conforme a configuração de `APP_PORT`.

* * * * *

8\. Validação rápida (testes manuais e exemplos)
------------------------------------------------

Exemplos de checagem via `curl`:

```
# obter listagem de plantios (exemplo de endpoint)
curl http://localhost:3000/plantios

# registrar um plantio
curl -X POST http://localhost:3000/registrarPlantio -H "Content-Type: application/json" -d '{"nome":"Laranja A","area":2.5,"data_plantio":"2025-09-01"}'

```

Substitua endpoints conforme definidos em `index.js`.

* * * * *

9\. Explicação por áreas (resumo técnico)
-----------------------------------------

### Backend (`index.js`)

-   **Responsabilidade:** expor endpoints HTTP para CRUD de plantios, irrigações e colheitas.

-   **Pontos-chave a revisar:** remover credenciais hard-coded; validar entradas; tratar erros de conexão com DB; usar prepared statements (mysql2 já suporta `?`).

### Camada de dados (`database.js`)

-   **Responsabilidade:** criar pool de conexões e encapsular queries.

-   **Melhorias:** usar `dotenv` para variáveis de ambiente; garantir `try/catch` e logs; fechar conexões quando necessário.

### Autenticação (`auth.js`)

-   **Fluxo:** cadastro e login via fetch no frontend; atualmente o frontend pode armazenar tokens/flags em `localStorage`.

-   **Risco atual:** senhas em texto. Recomenda-se hash (bcrypt) e uso de JWT ou sessions no backend.

### Frontend (páginas estáticas `.html`)

-   Cada HTML contém formulários que fazem `fetch()` para endpoints correspondentes. Teste manualmente preenchendo formulários e verificando respostas no console do navegador.

### Banco de dados (SQL)

-   Tabelas previstas: `plantio`, `irrigacao`, `colheita`, `users` (ou `login`). Verifique chaves primárias e estrangeiras no SQL de backup.

* * * * *

10\. Artefatos anexos sugeridos (incluir no repositório)
--------------------------------------------------------

-   `README.md` (pronto)

-   `AgroCitro_Banco (2).sql` (backup)

-   `.env.example` (exemplo de variáveis)

-   `package.json` (sugestão)

-   Trechos comentados de `index.js` e `database.js` (incluir como `docs/` ou diretamente no README)

* * * * *
