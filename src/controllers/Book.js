import Book from "../models/bookModel.js";

// -------------------- Livros --------------------

function addBook(req, res) {
  
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publicationYear: req.body.publicationYear,
  })
    .then((result) => res.json(result)) // Retorna o livro criado
    .catch((error) =>
      res.status(500).json({ message: "Erro ao criar livro", error })
    );
}

function getAllBooks(req, res) {
  Book.findAll()
    .then((result) => res.json(result)) // Retorna todos os livros
    .catch((error) =>
      res.status(500).json({ message: "Erro ao listar livros", error })
    );
}

function getBookById(req, res) {
  Book.findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.json(result); // Retorna o livro encontrado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao buscar livro", error })
    );
}

function updateBook(req, res) {
  Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationYear: req.body.publicationYear,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then(() => Book.findByPk(req.params.id)) // Retorna o livro atualizado
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.json(result); // Retorna o livro atualizado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao atualizar livro", error })
    );
}

function deleteBook(req, res) {
  Book.destroy({
    where: { id: req.params.id },
  })
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.json({ message: "Livro deletado com sucesso" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao deletar livro", error })
    );
}

export default{
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
