// Importa os modelos de Livro, Usuário e Empréstimo
import { client } from "../models/clientsModel.js";


// -------------------- Usuários --------------------

function addUser(req, res) {
  client.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    })
    .then((result) => res.json(result)) // Retorna o cliente criado
    .catch((error) =>
      res.status(500).json({ message: "Erro ao criar novo Cliente", error })
    );
}

function getAllUsers(req, res) {
  client.findAll()
    .then((result) => res.json(result)) // Retorna todos os clientes
    .catch((error) =>
      res.status(500).json({ message: "Erro ao listar cliente", error })
    );
}

function getUserById(req, res) {
  client.findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(result); // Retorna o Cliente encontrado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao buscar cliente", error })
    );
}

function updateUser(req, res) {
  client.update({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
      },
      {
        where: { id: req.params.id },
      })
    .then(() => client.findByPk(req.params.id)) // Retorna o Cliente atualizado
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(result); // Retorna o Cliente atualizado
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao atualizar Cliente", error })
    );
}

function deleteUser(req, res) {
  client.destroy({
      where: { id: req.params.id },
    })
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json({ message: "Cliente deletado com sucesso" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Erro ao deletar cliente", error })
    );
}

export default{
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
