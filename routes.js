import express from "express";
import clients from "./src/controllers/clients.js";
import book from "./src/controllers/book.js";
import Loan from "./src/controllers/Loan.js";

const routes = express.Router();

routes.get("/clients", clients.getAllUsers);
routes.get("/clients/:id", clients.getUserById); 
routes.put("/clients/:id", clients.updateUser); 
routes.delete("/clients/:id", clients.deleteUser); 
routes.post("/clients", clients.addUser); 


routes.get("/book", book.getAllBooks);
routes.get("/book/:id", book.getBookById);
routes.put("/book/:id", book.updateBook);
routes.delete("/book/:id", book.deleteBook);
routes.post("/book", book.addBook);

routes.get("/loan/", Loan.getAllLoans);
routes.get("/loan/:id", Loan.getLoanById);
routes.put("/loan/:id", Loan.updateLoan);
routes.delete("/loan/:id", Loan.deleteLoan);
routes.post("/loan", Loan.addLoan);

export { routes as default };
