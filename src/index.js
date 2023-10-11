const express = require("express");
const rotas = require("./rotas");

const app = express();
const port = 3000;

app.use(express.json());
app.use(rota);

app.listen(3000);
