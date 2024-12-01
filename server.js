import express from 'express';
import db from './src/connection.js';


const app = express();

app.use(express.json());


db.sync( () => 
    console.log(`Banco de dados conectado: ${process.librarydb}`)
);

app.listen(3000, () => 
    console.log('Servidor iniciado na porta 3000')
);