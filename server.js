import express from "express";
import routes from "./routes.js";
import db from "./src/connection.js";

const app = express();

app.use(express.json());
app.use(routes);

db.sync({ force: false }) 
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso");
    app.listen(3040, () => {
      console.log("Servidor iniciado na porta 3040");
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
