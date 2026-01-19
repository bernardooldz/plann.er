# 🌍 Plann.er

Uma aplicação completa para planejamento de viagens colaborativo, desenvolvida com tecnologias modernas e arquitetura robusta.

## 🚀 Tecnologias

### Backend
- **Node.js** com **TypeScript**
- **Fastify** - Framework web performático
- **Prisma ORM** - Modelagem e queries do banco de dados
- **SQLite** - Banco de dados
- **Zod** - Validação de schemas
- **JWT** - Autenticação e autorização
- **Bcrypt** - Hash de senhas

### Frontend
- **React 19** com **TypeScript**
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP com interceptors
- **Lucide React** - Ícones
- **React Day Picker** - Seletor de datas
- **Context API** - Gerenciamento de estado de autenticação

## 📋 Funcionalidades

- ✅ **Sistema de autenticação JWT** completo com registro e login
- ✅ **Dashboard de usuário** com listagem de viagens pessoais
- ✅ **Criação de viagens** via modal com destino e período
- ✅ **Sistema de convites por link** (sem emails)
- ✅ **Controle de permissões** baseado em proprietário/participante
- ✅ **Auto-confirmação de participantes** via interface
- ✅ **Gerenciamento completo de convidados** (adicionar/remover)
- ✅ **CRUD de atividades** com controle de permissões
- ✅ **CRUD de links importantes** com controle de permissões
- ✅ **Interface responsiva** e moderna
- ✅ **Validação robusta** de dados no frontend e backend
- ✅ **Middleware de proteção** de rotas
- ✅ **Interceptors automáticos** para renovação de tokens
- ✅ **Arquitetura escalável** com separação de responsabilidades

## 🏗️ Arquitetura

```
Plann.er/
├── api-planner/          # Backend API
│   ├── prisma/           # Schema e migrações do banco
│   ├── src/
│   │   ├── routes/       # Endpoints da API
│   │   │   ├── auth/     # Rotas de autenticação
│   │   │   ├── trips/    # CRUD de viagens
│   │   │   ├── participants/ # Gerenciamento de participantes
│   │   │   ├── activities/   # CRUD de atividades
│   │   │   └── links/    # CRUD de links
│   │   ├── lib/          # Utilitários e configurações
│   │   ├── middleware/   # Middleware de autenticação
│   │   └── errors/       # Tratamento de erros
│   └── ...
└── front-planner/        # Frontend React
    ├── src/
    │   ├── features/     # Funcionalidades organizadas
    │   │   ├── auth/     # Sistema de autenticação
    │   │   │   ├── hooks/    # useAuth context
    │   │   │   ├── pages/    # Login, Register, Dashboard
    │   │   │   └── services/ # API calls de auth
    │   │   └── trips/    # Gerenciamento de viagens
    │   │       ├── components/ # Componentes reutilizáveis
    │   │       ├── pages/     # Páginas de viagem
    │   │       ├── modals/    # Modais de CRUD
    │   │       └── services/  # API calls de viagens
    │   ├── design-system/ # Componentes base
    │   └── shared/       # Utilitários compartilhados
    └── ...
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/plann.er.git
cd plann.er
```

### 2. Configure o Backend
```bash
cd api-planner
npm install
cp .env.example .env
# Configure JWT_SECRET no .env
npm run db:migrate
npm run dev
```

### 3. Configure o Frontend
```bash
cd ../front-planner
npm install
npm run dev
```

### 4. Acesse a aplicação
- Frontend: http://localhost:5173
- Backend: http://localhost:3333
- **Primeiro acesso:** Crie uma conta na página de registro

## 📁 Estrutura de Pastas

Consulte os READMEs específicos para mais detalhes:
- [Backend Documentation](./api-planner/README.md)
- [Frontend Documentation](./front-planner/README.md)

## 🔒 Autenticação e Segurança

- **JWT tokens** com refresh automático
- **Middleware de proteção** em rotas sensíveis
- **Hash de senhas** com bcrypt
- **Validação de entrada** com Zod
- **Controle de permissões** baseado em roles
- **Sanitização de dados**
- **CORS configurado** adequadamente
- **Tratamento centralizado** de erros

## 👥 Sistema de Permissões

- **Proprietário da viagem:**
  - Pode editar informações da viagem
  - Pode remover participantes
  - Pode editar/excluir qualquer atividade ou link
  
- **Participante:**
  - Pode visualizar detalhes da viagem
  - Pode criar atividades e links
  - Pode editar/excluir apenas seus próprios itens
  - Pode confirmar/desconfirmar apenas sua própria participação

## 📊 Banco de Dados

O projeto utiliza SQLite com Prisma ORM, com as seguintes entidades:
- **Users** - Usuários do sistema
- **Trips** - Viagens
- **Participants** - Participantes (com referência ao usuário)
- **Activities** - Atividades (com criador)
- **Links** - Links importantes (com criador)

---

## 👤 Autor

Feito por *Bernardo Diniz* inspirado no projeto do NLW Journey da Rockeseat.
