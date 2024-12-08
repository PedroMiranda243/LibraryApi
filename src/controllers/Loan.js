import Loan from "../models/LoanModel.js";
import Book from "../models/bookModel.js";
import Client from "../models/clientsModel.js";

// -------------------- Empréstimos --------------------

function addLoan(req, res) {
  const { idClient, idBook, loanDate, returnDate } = req.body;

  Client.findByPk(idClient)  // Verificando se o cliente existe
    .then((client) => {
      if (!client) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return Book.findByPk(idBook);  // Verificando se o livro existe
    })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      // Criando o empréstimo
      return Loan.create({ idClient, idBook, loanDate, returnDate });
    })
    .then((result) => res.json(result))  // Retorna o empréstimo criado
    .catch((error) =>
      res.status(500).json({ message: "Erro ao criar empréstimo", error })
    );
}

function getAllLoans(req, res) {
  // Buscando todos os empréstimos com os dados de cliente e livro
  Loan.findAll({ include: [Client, Book] })
    .then((result) => res.json(result))  // Retorna todos os empréstimos
    .catch((error) =>
      res.status(500).json({ message: "Erro ao listar empréstimos", error })
    );
}

function getLoanById(req, res) {
  Loan.findByPk(req.params.id, { include: [Client, Book] })  // Buscando o empréstimo pelo id
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json(result);  // Retorna o empréstimo encontrado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao buscar empréstimo", error })
    );
}

function updateLoan(req, res) {
  const { idClient, idBook, loanDate, returnDate } = req.body;

  let clientPromise = Promise.resolve(null);
  let bookPromise = Promise.resolve(null);

  if (idClient) {
    clientPromise = Client.findByPk(idClient);  // Verificando se o cliente existe
  }
  if (idBook) {
    bookPromise = Book.findByPk(idBook);  // Verificando se o livro existe
  }

  Promise.all([clientPromise, bookPromise])
    .then(([client, book]) => {
      if (idClient && !client) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      if (idBook && !book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      // Atualizando o empréstimo
      return Loan.update(
        { idClient, idBook, loanDate, returnDate },
        { where: { idLoan: req.params.id } }
      );
    })
    .then(() => Loan.findByPk(req.params.id))  // Buscando o empréstimo atualizado
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json(result);  // Retorna o empréstimo atualizado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao atualizar empréstimo", error })
    );
}

function deleteLoan(req, res) {
  Loan.destroy({ where: { idLoan: req.params.id } }) 
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json({ message: "Empréstimo deletado com sucesso" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao deletar empréstimo", error })
    );
}

export default {
  addLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan
};
