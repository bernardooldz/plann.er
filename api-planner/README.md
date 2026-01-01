# 🔧 API Plann.er - Backend

API REST robusta para gerenciamento de viagens colaborativas, construída com Fastify e TypeScript.

## 🚀 Stack Tecnológica

- **Node.js** + **TypeScript** - Runtime e tipagem
- **Fastify** - Framework web de alta performance
- **Prisma ORM** - Modelagem e queries do banco
- **SQLite** - Banco de dados relacional
- **Zod** - Validação de schemas e tipos
- **Nodemailer** - Sistema de emails
- **Day.js** - Manipulação de datas

## 📡 Endpoints da API

### 🧳 Viagens
- `POST /trips` - Criar nova viagem
- `GET /trips/:tripId` - Detalhes da viagem
- `PUT /trips/:tripId` - Atualizar viagem
- `GET /trips/:tripId/confirm` - Confirmar viagem

### 👥 Participantes
- `GET /trips/:tripId/participants` - Listar participantes
- `POST /trips/:tripId/invites` - Criar convite
- `GET /participants/:participantId/confirm` - Confirmar participação
- `GET /participants/:participantId` - Detalhes do participante

### 📅 Atividades
- `POST /trips/:tripId/activities` - Criar atividade
- `GET /trips/:tripId/activities` - Listar atividades

### 🔗 Links
- `POST /trips/:tripId/links` - Criar link
- `GET /trips/:tripId/links` - Listar links

### 🏥 Health Check
- `GET /health` - Status da API

## 🗄️ Modelo de Dados

```prisma
model Trip {
  id           String   @id @default(uuid())
  destination  String
  starts_at    DateTime
  ends_at      DateTime
  is_confirmed Boolean  @default(false)
  created_at   DateTime @default(now())
  
  participants Participant[]
  activities   Activity[]
  links        Link[]
}

model Participant {
  id           String  @id @default(uuid())
  name         String?
  email        String
  is_confirmed Boolean @default(false)
  is_owner     Boolean @default(false)
  trip_id      String
}

model Activity {
  id        String   @id @default(uuid())
  title     String
  occurs_at DateTime
  trip_id   String
}

model Link {
  id      String @id @default(uuid())
  title   String
  url     String
  trip_id String
}
```

## ⚙️ Configuração

### Variáveis de Ambiente
```env
DATABASE_URL="file:./dev.db"
API_BASE_URL="http://localhost:3333"
WEB_BASE_URL="http://localhost:3000"
PORT="3333"

# Email (opcional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor em desenvolvimento
npm run build        # Build para produção
npm run start        # Executar build de produção
npm run db:migrate   # Executar migrações
npm run db:studio    # Interface visual do banco
npm run db:generate  # Gerar cliente Prisma
npm run db:seed      # Popular banco com dados iniciais
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Executar migrações
npm run db:migrate

# Gerar cliente Prisma
npm run db:generate

# Iniciar servidor
npm run dev
```

## 📁 Estrutura do Projeto

```
src/
├── routes/           # Endpoints da API
│   ├── create-trip.ts
│   ├── confirm-trip.ts
│   ├── get-trip-details.ts
│   ├── update-trip.ts
│   ├── create-activity.ts
│   ├── get-activities.ts
│   ├── create-link.ts
│   ├── get-links.ts
│   ├── create-invite.ts
│   ├── get-participants.ts
│   ├── confirm-participant.ts
│   └── get-participant.ts
├── lib/              # Utilitários
│   ├── prisma.ts     # Cliente do banco
│   ├── mail.ts       # Configuração de email
│   └── dayjs.ts      # Configuração de datas
├── errors/           # Tratamento de erros
│   └── client-error.ts
├── env.ts            # Validação de variáveis
├── error-handler.ts  # Handler global de erros
└── server.ts         # Configuração do servidor
```

## 🔒 Segurança e Validação

- **Validação de entrada** com Zod em todas as rotas
- **Sanitização** automática de dados
- **CORS** configurado para origens específicas
- **Tratamento centralizado** de erros
- **Variáveis de ambiente** validadas
- **UUIDs** para identificadores únicos

## 📊 Performance

- **Fastify** - Framework otimizado para alta performance
- **Prisma** - Queries otimizadas e type-safe
- **SQLite** - Banco leve e eficiente para desenvolvimento
- **TypeScript** - Detecção de erros em tempo de compilação