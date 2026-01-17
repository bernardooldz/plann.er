# 🌍 Plann.er

Uma aplicação completa para planejamento de viagens colaborativo, desenvolvida com tecnologias modernas e arquitetura robusta.

## 🚀 Tecnologias

### Backend
- **Node.js** com **TypeScript**
- **Fastify** - Framework web performático
- **Prisma ORM** - Modelagem e queries do banco de dados
- **SQLite** - Banco de dados
- **Zod** - Validação de schemas
- **Nodemailer** - Envio de emails

### Frontend
- **React 19** com **TypeScript**
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **React Day Picker** - Seletor de datas

## 📋 Funcionalidades

- ✅ **Criação de viagens** com destino e período
- ✅ **Sistema de participantes** com convites por email
- ✅ **Confirmação de viagens** e participantes
- ✅ **Confirmação de presença via email** com link direto
- ✅ **Gerenciamento completo de convidados** (adicionar/remover)
- ✅ **Gerenciamento de atividades** programadas
- ✅ **Links importantes** organizados
- ✅ **Interface responsiva** e moderna
- ✅ **Validação robusta** de dados
- ✅ **Sistema de notificações por email**
- ✅ **Redirecionamento inteligente** após confirmações
- ✅ **Arquitetura escalável**

## 🏗️ Arquitetura

```
Plann.er/
├── api-planner/          # Backend API
│   ├── prisma/           # Schema e migrações do banco
│   ├── src/
│   │   ├── routes/       # Endpoints da API
│   │   ├── lib/          # Utilitários e configurações
│   │   └── errors/       # Tratamento de erros
│   └── ...
└── front-planner/        # Frontend React
    ├── src/
    │   ├── components/   # Componentes reutilizáveis
    │   ├── pages/        # Páginas da aplicação
    │   └── lib/          # Configurações e utilitários
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

## 📁 Estrutura de Pastas

Consulte os READMEs específicos para mais detalhes:
- [Backend Documentation](./api-planner/README.md)
- [Frontend Documentation](./front-planner/README.md)

## 🔒 Segurança

- Validação de entrada com Zod
- Sanitização de dados
- Variáveis de ambiente protegidas
- CORS configurado adequadamente
- Tratamento centralizado de erros

## 📊 Banco de Dados

O projeto utiliza SQLite com Prisma ORM, com as seguintes entidades:
- **Trips** - Viagens
- **Participants** - Participantes
- **Activities** - Atividades
- **Links** - Links importantes

---

## 👤 Autor

Feito por *Bernardo Diniz* inspirado no projeto do NLW Journey da Rockeseat.
