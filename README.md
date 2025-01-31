# Marketspace

![GitHub repo size](https://img.shields.io/github/repo-size/lizandramalta/marketspace?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/lizandramalta/marketspace?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/lizandramalta/marketspace?style=for-the-badge)

## Sobre o projeto

O Marketspace é uma aplicação mobile que funciona como um marketplace, permitindo que usuários anunciem produtos para venda e que outros usuários visualizem os anúncios e entrem em contato com os vendedores via WhatsApp.

As principais funcionalidades incluem:

- Cadastro e login de usuários.
- Publicação de anúncios de produtos com imagens, descrição e preço.
- Visualização de anúncios disponíveis.
- Contato direto com o vendedor através do WhatsApp.
- Filtros avançados para busca, permitindo filtrar anúncios por:
  - Nome do produto
  - Métodos de pagamento aceitos
  - Disponibilidade para troca
  - Condição do produto (novo ou usado)

## Tecnologias utilizadas

- Framework: Expo
- Linguagem: Typescript
- Bibliotecas:
  - React Native (para construção da interface mobile)
  - React Navigation (para gerenciamento de navegação)
  - Gluestack UI v1 (para componentes visuais)
- Autenticação: JWT (JSON Web Token) com implementação de refresh token

## Como funciona

1. Login e autenticação:
   - Ao fazer login, um token JWT é gerado para autenticação do usuário. O sistema também utiliza refresh tokens para garantir a renovação segura do acesso.
2. Anúncios:
   - Usuários podem criar e publicar anúncios de produtos.
   - Os produtos podem ser visualizados por outros usuários na aplicação.
3. Contato com o vendedor:
   - Cada anúncio possui um botão que redireciona para o WhatsApp do vendedor, facilitando a comunicação direta.
4. Perfil:
   - Os usuários podem filtrar anúncios com base em critérios como nome do produto, métodos de pagamento aceitos, possibilidade de troca e estado do produto (novo ou usado).
5. Integração com backend:
   - A API foi disponibilizada para que a aplicação pudesse exercitar a integração com o backend, simulando um ambiente de produção completo.

## Executando o projeto mobile

Certifique-se de ter o yarn instalado em sua máquina. Além disso, é possível abrir o projeto em um emulador ou através do aplicativo [Expo Go](https://expo.dev/client) no dispositivo físico.

1. Clone o repositório.
2. Dentro do diretório `mobile`, instale as dependências com o comando: `yarn`.
3. Dentro do diretório `mobile`, execute o projeto com o comando: `yarn start`.
4. Siga as intruções do terminal para conectar com o emulador ou dispositivo físico.
5. Siga as instruções de integração com a API para que a aplicação mobile funcione corretamente.

## Integração com a API

_Esta API foi disponibilizada e desenvolvida pela Rocketseat para auxiliar no projeto._

Certifique-se de ter o npm instalado em sua máquina.

1. Dentro do diretório `api`, instale as dependências com o comando: `npm install`.
2. Dentro do diretório `api`, execute o projeto com o comando: `npm start`.
3. Dentro do direório `mobile`, na pasta raiz crie um arquivo .env e siga o exemplo do arquivo .env.example para configurar o endereço IP (provavelmente da sua máquina) que a API está rodando.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções neste projeto. Crie um fork do repositório, faça suas alterações e envie um pull request. Estamos abertos a sugestões!

---

**Desenvolvido por Lizandra Malta - github.com/lizandramalta**

_Este projeto foi desenvolvido como parte do desafio proposto pela Rocketseat._
