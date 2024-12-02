import { Loan } from "../models/LoanModel.js";

// -------------------- Empréstimos --------------------

function addLoan(req, res) {
  
  const { userId, bookId, loanDate, returnDate } = req.body;

  
  Loan.findByPk(userId)
    .then((client) => {
      if (!client) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return Book.findByPk(bookId);
    })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      return Loan.create({ userId, bookId, loanDate, returnDate });
    })
    .then((result) => res.json(result)) // Retorna o empréstimo criado
    .catch((error) =>
      res.status(500).json({ message: "Erro ao criar empréstimo", error })
    );
}

function getAllLoans(req, res) {
  Loan.findAll({ include: [User, Book] })
    .then((result) => res.json(result)) // Retorna todos os empréstimos
    .catch((error) =>
      res.status(500).json({ message: "Erro ao listar empréstimos", error })
    );
}

function getLoanById(req, res) {
  Loan.findByPk(req.params.id, { include: [client, Book] })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json(result); // Retorna o empréstimo encontrado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao buscar empréstimo", error })
    );
}

function updateLoan(req, res) {
  const { userId, bookId, loanDate, returnDate } = req.body;

  Loan.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return Book.findByPk(bookId);
    })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      return Loan.update(
        { userId, bookId, loanDate, returnDate },
        {
          where: { id: req.params.id },
        }
      );
    })
    .then(() => Loan.findByPk(req.params.id))
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json(result); // Retorna o empréstimo atualizado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao atualizar empréstimo", error })
    );
}

function deleteLoan(req, res) {
  Loan.destroy({ where: { id: req.params.id } })
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

export default{ 
  addLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan
};