import { Sequelize } from 'sequelize';
import Loan from '../models/LoanModel.js';
import Book from '../models/bookModel.js';
import client from '../models/clientsModel.js'

async function addLoan(req, res) {
  const { idClient, idBook, loanDate } = req.body;

  try {
    const cliente = await client.findByPk(idClient);
    if (!cliente) {
      console.error(`Cliente com id ${idClient} não encontrado`);
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    const book = await Book.findByPk(idBook);
    if (!book) {
      console.error(`Livro com id ${idBook} não encontrado`);
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    const activeLoans = await Loan.count({ where: { idClient, returnDate: null } });
    if (activeLoans >= 3) {
      console.error(`Cliente com id ${idClient} excedeu o número máximo de empréstimos`);
      return res.status(400).json({ message: "Número máximo de empréstimos excedido" });
    }

    const existingLoan = await Loan.findOne({ where: { idBook, returnDate: null } });
    if (existingLoan) {
      console.error(`Livro com id ${idBook} já está emprestado`);
      return res.status(400).json({ message: "Livro já emprestado" });
    }

    const newLoan = await Loan.create({ idClient, idBook, loanDate, returnDate: null });
    console.log(`Empréstimo criado: ${JSON.stringify(newLoan)}`);
    res.json(newLoan);
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error);
    res.status(500).json({ message: "Erro ao criar empréstimo", error: error.message });
  }
}

async function returnLoan(req, res) {
  const { returnDate } = req.body; 
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Empréstimo não encontrado" });
    }

    if (!returnDate) {
      return res.status(400).json({ message: "Data de devolução é obrigatória" });
    }

    loan.returnDate = new Date(returnDate); 
    await loan.save(); 

    res.json({ message: "Livro devolvido com sucesso", loan });
  } catch (error) {
    console.error("Erro ao registrar devolução:", error); 
    res.status(500).json({ message: "Erro ao registrar devolução", error: error.message });
  }
}

async function rankLoans(req, res) {
  try {
    const rankedLoans = await Loan.findAll({
      attributes: [
        'idBook',
        [Sequelize.fn('COUNT', Sequelize.col('Loan.idBook')), 'loan_count'], 
      ],
      include: [
        {
          model: Book, 
          attributes: ['idBook', 'title'], 
        },
      ],
      group: ['Loan.idBook', 'Book.idBook'], 
      order: [[Sequelize.literal('loan_count'), 'DESC']], 
    });

    res.json(rankedLoans);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Erro ao listar livros mais emprestados", error });
  }
}



async function getActiveLoans(req, res) {
  try {
    const activeLoans = await Loan.findAll({
      attributes: [
        'idClient',
        [Sequelize.fn('COUNT', Sequelize.col('idBook')), 'active_loans'], 
      ],
      where: { returnDate: null }, 
      group: ['Loan.idClient'], 
      include: [
        {
          model: client, 
          attributes: ['name'], 
        },
      ],
      order: [[Sequelize.fn('COUNT', Sequelize.col('idBook')), 'DESC']], 
    });

    res.json(activeLoans);
  } catch (error) {
    console.error(error); // Log para debug
    res.status(500).json({ message: "Erro ao listar pendências de devolução", error });
  }
}



function getAllLoans(req, res) {
  Loan.findAll({ include: [client, Book] })
    .then((result) => res.json(result))  
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
      res.json(result);  
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
    clientPromise = client.findByPk(idClient);  
  }
  if (idBook) {
    bookPromise = Book.findByPk(idBook);  
  }

  Promise.all([clientPromise, bookPromise])
    .then(([client, book]) => {
      if (idClient && !client) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      if (idBook && !book) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

   
      return Loan.update(
        { idClient, idBook, loanDate, returnDate },
        { where: { idLoan: req.params.id } }
      );
    })
    .then(() => Loan.findByPk(req.params.id))  
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.json(result);  
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
  returnLoan,
  getActiveLoans,
  rankLoans,
  getAllLoans,
  getLoanById,
  updateLoan,
  deleteLoan
};
