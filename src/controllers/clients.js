import { Book, User, Loan } from '../models/clientsModel.js';  // Importa os modelos de Livro, Usuário e Empréstimo

// -------------------- Livros --------------------

function addBook(req, res) {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear,
    })
    .then((result) => res.json(result))  // Retorna o livro criado
    .catch((error) => res.status(500).json({ message: 'Erro ao criar livro', error }));
}

function getAllBooks(req, res) {
    Book.findAll()
    .then((result) => res.json(result))  // Retorna todos os livros
    .catch((error) => res.status(500).json({ message: 'Erro ao listar livros', error }));
}

function getBookById(req, res) {
    Book.findByPk(req.params.id)
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(result);  // Retorna o livro encontrado
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao buscar livro', error }));
}

function updateBook(req, res) {
    Book.update({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear,
    }, {
        where: { id: req.params.id },
    })
    .then(() => Book.findByPk(req.params.id))  // Retorna o livro atualizado
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(result);  // Retorna o livro atualizado
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao atualizar livro', error }));
}

function deleteBook(req, res) {
    Book.destroy({
        where: { id: req.params.id },
    })
    .then((result) => {
        if (result === 0) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json({ message: 'Livro deletado com sucesso' });
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao deletar livro', error }));
}


// -------------------- Usuários --------------------

function addUser(req, res) {
    User.create({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
    })
    .then((result) => res.json(result))  // Retorna o usuário criado
    .catch((error) => res.status(500).json({ message: 'Erro ao criar usuário', error }));
}

function getAllUsers(req, res) {
    User.findAll()
    .then((result) => res.json(result))  // Retorna todos os usuários
    .catch((error) => res.status(500).json({ message: 'Erro ao listar usuários', error }));
}

function getUserById(req, res) {
    User.findByPk(req.params.id)
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(result);  // Retorna o usuário encontrado
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao buscar usuário', error }));
}

function updateUser(req, res) {
    User.update({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
    }, {
        where: { id: req.params.id },
    })
    .then(() => User.findByPk(req.params.id))  // Retorna o usuário atualizado
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(result);  // Retorna o usuário atualizado
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao atualizar usuário', error }));
}

function deleteUser(req, res) {
    User.destroy({
        where: { id: req.params.id },
    })
    .then((result) => {
        if (result === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao deletar usuário', error }));
}


// -------------------- Empréstimos --------------------

function addLoan(req, res) {
    const { userId, bookId, loanDate, returnDate } = req.body;
    
    User.findByPk(userId)
    .then((user) => {
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return Book.findByPk(bookId);
    })
    .then((book) => {
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        return Loan.create({ userId, bookId, loanDate, returnDate });
    })
    .then((result) => res.json(result))  // Retorna o empréstimo criado
    .catch((error) => res.status(500).json({ message: 'Erro ao criar empréstimo', error }));
}

function getAllLoans(req, res) {
    Loan.findAll({ include: [User, Book] })
    .then((result) => res.json(result))  // Retorna todos os empréstimos
    .catch((error) => res.status(500).json({ message: 'Erro ao listar empréstimos', error }));
}

function getLoanById(req, res) {
    Loan.findByPk(req.params.id, { include: [User, Book] })
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        res.json(result);  // Retorna o empréstimo encontrado
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao buscar empréstimo', error }));
}

function updateLoan(req, res) {
    const { userId, bookId, loanDate, returnDate } = req.body;
    
    User.findByPk(userId)
    .then((user) => {
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return Book.findByPk(bookId);
    })
    .then((book) => {
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        return Loan.update({ userId, bookId, loanDate, returnDate }, {
            where: { id: req.params.id },
        });
    })
    .then(() => Loan.findByPk(req.params.id))
    .then((result) => {
        if (!result) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        res.json(result);  // Retorna o empréstimo atualizado
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao atualizar empréstimo', error }));
}

function deleteLoan(req, res) {
    Loan.destroy({ where: { id: req.params.id } })
    .then((result) => {
        if (result === 0) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
        res.json({ message: 'Empréstimo deletado com sucesso' });
    })
    .catch((error) => res.status(500).json({ message: 'Erro ao deletar empréstimo', error }));
}

export {
    addBook, getAllBooks, getBookById, updateBook, deleteBook,
    addUser, getAllUsers, getUserById, updateUser, deleteUser,
    addLoan, getAllLoans, getLoanById, updateLoan, deleteLoan
};
