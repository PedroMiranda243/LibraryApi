import express from "express";
import routes from "./routes.js";
import db from "./src/connection.js";

const app = express();

app.use(express.json());
app.use(routes);

db.sync(() => console.log(`Banco de dados conectado: ${process.nomeDB}`));

app.listen(3040, () => console.log("Servidor iniciado na porta 3000"));
