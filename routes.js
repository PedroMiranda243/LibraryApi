import express from "express";
import clients from "./src/controllers/clients.js";
import book from "./src/controllers/Book.js";
import Loan from "./src/controllers/Loan.js";

const routes = express.Router();

routes.get("/client", clients.getAllUsers);
routes.get("/client/:id", clients.getUserById); 
routes.put("/client/:id", clients.updateUser); 
routes.delete("/client/:id", clients.deleteUser); 
routes.post("/client", clients.addUser); 


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
