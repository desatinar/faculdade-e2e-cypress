# Plano de Testes Automatizados E2E - ServeRest

## 1. Objetivo
Este documento detalha o planejamento, os cenários e os resultados da automação de testes de ponta a ponta (E2E) para o sistema front-end **ServeRest**. O foco principal é garantir a qualidade e o funcionamento adequado dos fluxos críticos de Autenticação (Login) e Registro de Usuários.

## 2. Escopo
*   **Em Escopo:** Validação de interface, testes de usabilidade básica (placeholders), fluxos de sucesso (caminho feliz) e fluxos de exceção (erros de validação e credenciais) nas páginas de `/login` e `/cadastrarusuarios`.
*   **Fora de Escopo:** Testes de carga, testes de estresse, testes de segurança e testes diretos no banco de dados.

## 3. Ferramentas Utilizadas
*   **Framework de Teste:** Cypress
*   **Linguagem:** JavaScript
*   **Geração de Massa de Dados:** Dinâmica (uso da função `Date.now()` nativa do JS)
*   **Geração de Relatórios:** Mochawesome (HTML)

---

## 4. Casos de Teste (Test Cases)

Abaixo estão listados os casos de teste mapeados e automatizados no projeto, divididos por funcionalidade:

### Módulo: Cadastro de Usuários (`cadastrar.cy.js`)
*   **CT01 - Cadastrar novo administrador com sucesso:**
    *   *Ação:* Preencher formulário com dados válidos e e-mail dinâmico, marcar a opção de administrador e submeter.
    *   *Resultado Esperado:* Exibição da mensagem "Cadastro realizado com sucesso" e redirecionamento para a rota `/admin/home`.
*   **CT02 - Validar restrição de e-mail duplicado:**
    *   *Ação:* Preencher o formulário utilizando um e-mail já existente na base de dados (`fulano@qa.com`) e submeter.
    *   *Resultado Esperado:* Exibição da mensagem de erro "Este email já está sendo usado" e permanência na mesma página.

### Módulo: Login (`login.cy.js`)
*   **CT03 - Validar renderização visual do logotipo:**
    *   *Ação:* Acessar a página de login e inspecionar a tag de imagem principal.
    *   *Resultado Esperado:* O logotipo deve estar visível e renderizado corretamente.
*   **CT04 - Validar atributos de acessibilidade (Placeholders):**
    *   *Ação:* Acessar a página de login e inspecionar os campos de texto.
    *   *Resultado Esperado:* Os campos de e-mail e senha devem exibir os textos de instrução corretos ("Digite seu email" e "Digite sua senha").
*   **CT05 - Realizar login com credenciais válidas:**
    *   *Ação:* Inserir e-mail e senha de um usuário existente (`fulano@qa.com`) e submeter.
    *   *Resultado Esperado:* Redirecionamento bem-sucedido para o painel principal (`/admin/home`).
*   **CT06 - Validar erro de autenticação com credenciais inválidas:**
    *   *Ação:* Tentar efetuar o login com e-mail e/ou senha não cadastrados.
    *   *Resultado Esperado:* Exibição do alerta "Email e/ou senha inválidos" e bloqueio do redirecionamento.
*   **CT07 - Validar obrigatoriedade de campos:**
    *   *Ação:* Clicar no botão de submissão do formulário de login sem preencher nenhum dado.
    *   *Resultado Esperado:* O sistema deve exibir alertas indicando que "Email é obrigatório" e "Password é obrigatório".

---

## 5. Como Executar o Projeto

Siga os passos abaixo para rodar a automação na sua máquina local.

### 5.1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (O gerenciador de pacotes `npm` já vem embutido).
*   Git (Para clonar o repositório, caso necessário).

### 5.2. Instalação
Abra o terminal na pasta raiz do projeto e instale as dependências executando:

```bash
npm install
```

### 5.3. Executando os Testes

**Opção A: Modo Interativo (Com Interface Gráfica)**
Ideal para ver a execução em tempo real e debugar os testes.
```bash
npx cypress open
```
*No painel que abrir, selecione "E2E Testing", escolha seu navegador e clique no arquivo que deseja testar.*

**Opção B: Modo Headless (Segundo Plano)**
Ideal para esteiras de CI/CD ou execuções rápidas. Os testes rodam no terminal sem abrir a interface visual.
```bash
npx cypress run
```

---

## 6. Métricas e Relatórios (Mochawesome)

O projeto está configurado para gerar relatórios automatizados utilizando o `cypress-mochawesome-reporter`. 

Ao executar os testes em modo headless (`npx cypress run`), o Cypress irá processar todos os cenários e gerar automaticamente um painel HTML contendo os gráficos de aprovação/falha e o tempo de execução de cada CT.

Para visualizar o relatório final:
1. Navegue até a pasta `cypress/reports/html/` gerada na raiz do projeto.
2. Abra o arquivo `index.html` em qualquer navegador.