# Gerenciador de Usuários e Autenticação - Planejamento de Qualidade e Estratégia de Testes

## Sistema a Ser Testado

O sistema básico fornecido é um **gerenciador de usuários e autenticação**, com as seguintes funcionalidades principais:

### 1. Cadastro de Usuário
- Permite cadastrar um usuário com **nome**, **email** e **senha**.
- Validações:
  - O **email** deve ser único (dois usuários não podem ter o mesmo email).
  - A **senha** deve atender aos requisitos de segurança:
    - Pelo menos **8 caracteres**.
    - Deve conter **pelo menos um número**.

### 2. Login
- Permite que o usuário faça login utilizando **email** e **senha**.
- Validações:
  - O **email** e a **senha** devem ser corretos.

---

## Regras de Negócio
1. **Email Único**: O sistema não permite duplicidade de emails.
2. **Requisitos de Senha**:
   - Pelo menos 8 caracteres.
   - Pelo menos um número.

---

## Tarefas e Etapas

### 1. Planejamento de Qualidade de Software
#### Definição dos Requisitos de Qualidade
Com base nas funcionalidades do sistema, foram definidos **10 requisitos de qualidade**. Exemplos incluem:
- Garantir **cobertura de código** acima de 80%.
- Estabelecer o **tempo de resposta máximo** para cada requisição (ex.: 200ms).
- Validar a **robustez** ao lidar com entradas inválidas.
- Medir a **eficácia do sistema** na prevenção de dados duplicados.
- Certificar que as senhas atendem aos critérios definidos.
- O sistema deve armazenar as informações de usuários de forma segura em um banco de dados.
- O sistema deve garantir que a senha do usuário seja armazenada de forma segura, utilizando **criptografia como bcrypt**.
- O sistema deve garantir que ao realizar o login gere um **token** de acesso ao usuário, com o tempo de expiração de 24 horas.
- O sistema deve fornecer mensagens de erro claras e específicas quando o cadastro ou login falharem (por exemplo, "Email já em uso" ou "Credenciais inválidas").
- O sistema deve ser capaz de escalar para suportar mais usuários sem necessidade de grandes mudanças no código ou arquitetura.
- O sistema deve ser modular, com código bem estruturado, para que futuras modificações sejam facilmente implementadas sem quebrar a funcionalidade existente.
- O sistema deve ser projetado com base na **Arquitetura Hexagonal** e nos princípios do **SOLID**, garantindo alta modularidade, manutenibilidade e testabilidade, promovendo a separação de responsabilidades e o desacoplamento entre as camadas.

#### Métricas de Qualidade
1. Cobertura de testes unitários.
2. Tempo médio de resposta das requisições.
3. Correção e consistência na validação de entradas.
4. Capacidade de lidar com cargas simultâneas (testes de carga).
5. Precisão na exibição de mensagens de erro.

---

### 2. Estratégia de Testes

#### Testes Unitários com Jest
Os testes serão implementados para cobrir as funcionalidades e validar as regras de negócio:

##### **Cadastro de Usuário**
1. Verificar se o sistema aceita dados válidos de cadastro.
2. Testar a rejeição de emails duplicados.
3. Validar a rejeição de senhas curtas (menos de 8 caracteres).
4. Testar a rejeição de senhas sem números.

##### **Login de Usuário**
1. Validar login bem-sucedido com credenciais corretas.
2. Testar falha de login com credenciais incorretas.
3. Verificar rejeição de login com email não cadastrado.

#### Testes de Exceção
- Validar se o sistema retorna mensagens claras e apropriadas para erros internos (ex.: erro 500).

#### Testes de Limite
- Verificar comportamento com senhas exatamente no limite (8 caracteres).
- Testar o comportamento com entradas inválidas (emails com formato incorreto).

---

### 3. Planejamento de Refatoração e Melhoria Contínua
- Realizar **refatorações periódicas** baseadas nos resultados dos testes e métricas.
- Implementar uma **pipeline de CI/CD** para executar testes automaticamente.

---

## Requisitos para Executar o Projeto

- **Node.js** (versão 16 ou superior).
- **Docker** e **Docker Compose** instalados.
- Banco de dados configurado via Docker Compose.
- Ambiente configurado para TypeScript.

---

## Scripts Disponíveis

Aqui estão os principais comandos que podem ser usados para executar o projeto:

- **Iniciar o Projeto**:
  ```bash
  npm run docker:up     # Inicializa os serviços do Docker
  npm run migration:up  # Cria e aplica as migrations do banco de dados
  npm run start:up      # Inicia o servidor na porta configurada
  ```

- **Rodar Testes Automatizados**:
  ```bash
  npm run test          # Executa os testes unitários e de integração
  ```

- **Executar Testes de Carga**:
  ```bash
  npm run load-test     # Executa o teste de carga definido no arquivo load-test.yml
  ```

---

## **Rotas Disponíveis**

### **1. Criar Usuário - `/createUser`**  
- **Método:** `POST`  
- **Descrição:** Permite cadastrar um novo usuário no sistema.  

#### **Parâmetros Esperados no Corpo da Requisição**:  
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```   

#### **Resposta de Sucesso (201)**:  
```json
{
  "user": {
    "userId": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "createdAt": "2024-11-25T00:00:00.000Z",
    "updatedAt": "2024-11-25T00:00:00.000Z"
  },
  "error": null
}
```

#### **Resposta de Erro (422 | 500)**:  
```json
{
  "user": null,
  "error": {
    "code": "validation | internal",
    "message": "string",
    "statusCode": "422 | 500"
  }
}
```

### **2. Login de Usuário - `/signIn`**  
- **Método:** `POST`  
- **Descrição:** Permite que um usuário faça login no sistema e receba um token de autenticação.  

#### **Parâmetros Esperados no Corpo da Requisição**:  
```json
{
  "email": "string",
  "password": "string"
}
```  

#### **Resposta de Sucesso (201)**:  
```json
{
  "token": "string",
  "error": null
}
```

#### **Resposta de Erro (422 | 500)**:  
```json
{
  "token": null,
  "error": {
    "code": "validation | internal",
    "message": "string",
    "statusCode": "422 | 500"
  }
}
```

---

## Como Executar o Projeto

### 1. Inicializar o Ambiente
Para rodar o sistema, siga os passos abaixo:

1. **Subir os serviços do Docker**:
   - Este comando inicializa o banco de dados e outros serviços necessários.
   ```bash
   npm run docker:up
   ```

2. **Gerar e Rodar as Migrations**:
   - Cria e aplica as tabelas no banco de dados.
   ```bash
   npm run migration:up
   ```

3. **Iniciar o Servidor**:
   - Inicia o sistema na porta configurada (geralmente `3000`).
   ```bash
   npm run start:up
   ```

O sistema estará acessível em `http://localhost:3000`.

---

## Como Rodar os Testes

### 1. Testes Automatizados
Para garantir a funcionalidade do sistema, rode os testes automatizados com o seguinte comando:
```bash
npm run test
```
Este comando executa todos os testes unitários e de integração.

---

## Como Executar Testes de Carga

### 1. Configurar o Arquivo `load-test.yml`
Antes de rodar o teste de carga, edite o arquivo `load-test.yml` para incluir um email e uma senha válidos de um usuário já cadastrado.

Exemplo de configuração:
```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60  # Tempo do teste (em segundos)
      arrivalRate: 10  # Número de requisições por segundo
scenarios:
  - flow:
      - post:
          url: "/signIn"
          json:
            email: "email@valido.com"
            password: "senhaSegura123"
```

### 2. Rodar o Teste de Carga
Com o servidor rodando, abra um novo terminal e execute:
```bash
npm run load-test
```

### 3. Analisar os Resultados
O Artillery exibirá métricas como:
- Número total de requisições.
- Tempo médio de resposta.
- Taxa de erros (se houver).

---

## Observações

- Certifique-se de que o projeto está rodando antes de executar os testes de carga.
- Sempre configure o arquivo `load-test.yml` com dados válidos para evitar falhas no teste.
- O sistema foi configurado para rodar na porta `3000`, mas você pode alterar isso no código, caso necessário.

### Resultados Esperados
- **Cobertura de Código**: Todos os cenários críticos cobertos.
- **Conformidade das Regras de Negócio**: O sistema deve rejeitar entradas inválidas e aceitar apenas dados válidos.
- **Desempenho**: Tempo de resposta dentro do limite especificado.