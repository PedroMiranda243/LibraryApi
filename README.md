![GitHub repo size](https://img.shields.io/github/repo-size/PedroMiranda243/LibraryApi?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/PedroMiranda243/LibraryApi?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/PedroMiranda243/LibraryApi?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/PedroMiranda243/LibraryApi?style=for-the-badge)


> [!NOTE]
> Este repositório contém o projeto LibraryApi, referente a segunda avaliação da cadeira de Back-End Frameworks.
LibraryApi é uma Api RestFull que é responsável por:
>  Gerenciamento de usuários (CRUD);
>  <p>
>  Gerenciamento de livros (CRUD);
> <p>
>  Registro e controle de empréstimos;
> <p> 
>  Validação de número máximo de empréstimos por usuário (3 ativos);
> <p>
>  Listagem de livros mais emprestados.



## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente de '<Sequelize / Express / MySql/ NodeMon/ Node>'
- Você tem uma máquina '<Windows>', compatível com as tecnologias citadas.

## 🚀 Baixando LibraryApi

Para baixar o repositório do LibraryApi, siga estas etapas:

Windows:

Abra a pasta desejada para o download do repositório e abra o git bash na mesma.

Execute o seguite código no terminal:


'git clone https://github.com/PedroMiranda243/LibraryApi'

Instale as dependências
'bash'
'npm install'

Configure o seu banco em 'src/config/connection.js'
Por exemplo:
'bash
import { Sequelize } from 'sequelize';

const nomeDB = "libraryDB"
const db = new Sequelize(nomeDB, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  
});'

export default db;

Execute o projeto
bash
node server.js

## 📫 Contribuindo para LibraryApi

Para contribuir com LibraryApi, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: git checkout -b <nome_branch>.
3. Faça suas alterações e confirme-as: git commit -m '<mensagem_commit>'
4. Envie para o branch original: git push origin LibraryApi / main
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Equipe do projeto

Elenco responsável pela elaboração deste projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/camimcl" title="Perfil do GitHub">
        <img src="https://avatars.githubusercontent.com/u/143668626?v=4" width="100px;" alt="pfp camile"/><br>
        <sub>
          <b>Camile Marcele</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/PedroMiranda243" title="Perfil do GitHub">
        <img src="https://avatars.githubusercontent.com/u/142632758?v=4" width="100px;" alt="pfp pedro"/><br>
        <sub>
          <b>Pedro Miranda</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RicardoAlmeida06" title="Perfil do GitHub">
        <img src="https://avatars.githubusercontent.com/u/142633316?v=4" width="100px;" alt="pfp rick"/><br>
        <sub>
          <b>Ricardo Cézar</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mihaeldatoman" title="Perfil do GitHub">
        <img src="https://avatars.githubusercontent.com/u/140518477?v=4" width="100px;" alt="pfp maycom"/><br>
        <sub>
          <b>Marcio Maycom</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RAM2252" title="Perfil do GitHub">
        <img src="https://avatars.githubusercontent.com/u/138143680?v=4" width="100px;" alt="pfp rafa"/><br>
        <sub>
          <b>Rafael Antônio</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](https://github.com/PedroMiranda243/LibraryApi/blob/main/LICENSE) para mais detalhes.
