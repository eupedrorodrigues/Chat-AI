# 🤖 Chat AI

Este projeto é um chat-ai que utiliza a API da Gemini para gerar respostas inteligentes. Foi desenvolvido com Next.js, shadcn para componentes UI, Tailwind CSS para estilização e i18n para suporte a internacionalização.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Como configurar o projeto

### 1. Clonar o repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Instalando as dependencies

```bash
cd seu-repositorio

npm install ou yarn install
```

### 3. Crie uma conta no [Google AI Studio](https://ai.google.dev/aistudio)

- Clique em `Get API key` e depois em `Criar chave de API`;
- Copie a chave da API;

### 4. Consumindo API da Google AI Studio

- Crie um arquivo na raiz do projeto chamado

```bash
.env.local
```

- E coloque nele:

```bash
NEXT_PUBLIC_API_KEY="<Insira sua chave gerada no Google Studio AI>"
NEXT_STATIC_ROUTE_INDICATOR=false
```

### 5. Rodar o projeto

```bash
npm run dev
yarn dev
```
