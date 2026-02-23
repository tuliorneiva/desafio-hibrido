# Desafio Técnico Automax - Painel de Carrinhos

## Descrição do Projeto

Esta aplicação fullstack foi desenvolvida como solução para o desafio técnico da Automax. O objetivo principal do sistema é atuar como um painel interno que consome, armazena e exibe dados de carrinhos de compras provenientes de um sistema de e-commerce externo (Fake Store API).

O sistema procura estas informações numa API pública, persiste os dados localmente numa base de dados SQLite e expõe estes registos através de uma API RESTful própria. O frontend consome esta API local e apresenta os dados de forma legível, permitindo a visualização de detalhes como o ID do carrinho, a data de criação, o ID do utilizador e a quantidade total de produtos.

## Tecnologias Utilizadas

| Camada | Tecnologias |
|--------|-------------|
| **Backend** | Node.js, Express, TypeScript, TypeORM, SQLite |
| **Frontend** | React, TypeScript, Vite |

## Instruções de Execução

> Certifique-se de que tem o **Node.js (versão 18 ou superior)** instalado na sua máquina.

### Executar o Backend

1. Navegue até à pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente, renomiando o arquivo `.env.development` para `.env`

4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

O backend estará disponível na porta configurada.

### Executar o Frontend

1. Num novo terminal, navegue até à pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente, renomiando o arquivo `.env.development` para `.env`


4. Inicie a aplicação React:
   ```bash
   npm run dev
   ```

O terminal exibirá o URL local (geralmente `http://localhost:5173`) para aceder ao painel no navegador.

---

## Decisões Técnicas e Arquiteturais

### Backend

A arquitetura do backend foi desenhada visando a facilidade de manutenção, escalabilidade e testabilidade, adotando as seguintes premissas:

#### **1. Separação em Camadas**
O código foi estruturado dividindo as responsabilidades de forma estrita entre `Controllers` (lidam com pedidos e respostas HTTP), `Services` (contêm a regra de negócio), `Repositories` (abstraem o acesso à base de dados) e `Entities` (representam o modelo de dados). Isto garante baixo acoplamento e alta coesão.

#### **2. Uso de DTOs (Data Transfer Objects)**
Implementados para tipar, validar e transitar dados com segurança entre as camadas, evitando que entidades da base de dados sejam expostas indevidamente para o exterior.

#### **3. Mappers**
Foi introduzida uma camada de Mappers para centralizar a lógica de transformação de dados. Isto é essencial para converter as respostas brutas da API externa para o formato esperado pelas entidades internas e vice-versa.

#### **4. Sincronização com Scheduler**
Para cumprir o requisito de manter os dados atualizados periodicamente sem intervenção manual, foi implementada uma rotina de agendamento (scheduler). Esta rotina automatiza o processo de busca na API externa e a atualização da base de dados local.

#### **5. Estratégia de Limpeza de Dados (clear e Cascade Delete)**
Para evitar inconsistências e registos órfãos durante a sincronização dos dados, adotou-se o uso do método `clear` do TypeORM em conjunto com a exclusão em cascata (cascade delete). Isto garante que, ao atualizar os registos de carrinhos, a tabela `cart_products` seja limpa e preenchida novamente de forma íntegra e eficiente.

### Frontend

O frontend foi projetado para ser responsivo, de fácil leitura e focado na separação clara de responsabilidades:

#### **1. Isolamento de Lógica com Custom Hooks**
A lógica complexa de estado e filtragem dos carrinhos foi extraída dos componentes visuais e alocada num hook customizado (`useCartFilters`). Isto deixa o código dos componentes muito mais limpo e facilita os testes da regra de negócio da interface.

#### **2. Layout Responsivo com Grids Dinâmicos**
A listagem dos carrinhos utiliza um sistema de grid cujas colunas variam dinamicamente de acordo com o tamanho da tela. Isto garante que o painel seja perfeitamente utilizável tanto em monitores largos quanto em dispositivos móveis.

#### **3. Camada de Serviços para Pedidos de Rede**
Os pedidos HTTP para a API local não ficam espalhados pelos componentes. Foram isolados no arquivo `cart.service.ts`, usando do axios para fazer as requisições, e criando assim um ponto único de manutenção caso a estrutura da API mude no futuro.

#### **4. Tipagem Estrita Fim a Fim**
Foram definidas interfaces TypeScript (`types/cart.ts`) que espelham os DTOs do backend. Isto proporciona um ambiente de desenvolvimento mais seguro, com validação em tempo de compilação, reduzindo erros de execução.
