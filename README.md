# Projeto Frontend Usuários Dockerizados 🐋
Um repositório que faz parte do conjunto entre outros 2 repositórios, que são APIs que salvam o dado de diferentes maneiras.
Neste projeto é realizado a exibição e salvamento dos dados que as aplicações proveem. Uma é responsável por exibir os dados que salvos em coleções no MongoDB e a outra dados salvos na tabela MySQL.

## Arquitetura Projeto:
![ArqProjeto](https://github.com/user-attachments/assets/6ad82a32-39cb-4194-91e6-c61104a21a0c)

## Projetos Relacionados:
- API que persiste o dado no MongoDB 🍃: [API MongoDB](https://github.com/gustavoc0imbra/API-Usuarios-Mongo-docker-1bim)
- API que persiste o dado no MySQL 🐬: [API MySQL](https://github.com/gustavoc0imbra/API-Usuarios-Mysql-docker-1bim)

## Stack utilizada:
- HTML
- CSS
- JS
- React
- MaterialUI
- Nginx (Servidor HTTP para rodar a aplicação)

## Como instalar (Quick start com Docker):
- Clonar este repositório no diretório que deseja `git clone https://github.com/gustavoc0imbra/frontusuarios-proj1bim-docker.git`
- Após clonar executar o comando `docker-compose up -d`, para estar gerando a imagem docker e subir o container da aplicação.

> [!NOTE]
> Após o container subir a aplicação é disponibilizada através do endereço `http://localhost:80`
> Caso efetue uma alteração no código será necessário realizar o build da imagem novamente.

## Como rodar caso não queire rodar através do docker:
- Após clonar o repositório, acesse o projeto via terminal ou abra em sua IDE favorita
- Através do terminal execute o comando `npm start`, para estar rodando a aplicação e habilitando o hot-reload.
- Agora qualquer alteração realizada no código será refletida na tela

> [!NOTE]
> A aplicação rodando através do `npm start` irá rodar no endereço `http://localhost:3000`
