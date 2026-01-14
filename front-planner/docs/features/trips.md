# 🗺️ Feature: Trips

Documentação completa da feature de gerenciamento de viagens do Plann.er.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura](#estrutura)
- [Páginas](#páginas)
- [Componentes](#componentes)
- [Modais](#modais)
- [Hooks](#hooks)
- [Serviços](#serviços)
- [Tipos](#tipos)
- [Fluxos de Uso](#fluxos-de-uso)

## 🎯 Visão Geral

A feature Trips é o coração da aplicação, responsável por todo o ciclo de vida de uma viagem:

1. **Criação** - Definir destino, datas e convidados
2. **Confirmação** - Validar informações e criar a viagem
3. **Gerenciamento** - Adicionar atividades, links e gerenciar participantes
4. **Atualização** - Modificar informações da viagem

## 📁 Estrutura

```
trips/
├── components/          # Componentes reutilizáveis
│   ├── ActivitiesList.tsx
│   ├── DestinationAndDateStep.tsx
│   ├── GuestsList.tsx
│   ├── ImportantLinks.tsx
│   ├── InviteGuestsStep.tsx
│   └── TripHeader.tsx
├── hooks/              # Custom hooks
│   ├── useActivities.ts
│   └── useTrips.ts
├── modals/             # Modais da feature
│   ├── ConfirmRemoveParticipantModal.tsx
│   ├── ConfirmTripModal.tsx
│   ├── CreateActivityModal.tsx
│   ├── CreateLinkModal.tsx
│   ├── InviteGuestsModal.tsx
│   ├── ManageGuestsModal.tsx
│   └── UpdateTripModal.tsx
├── pages/              # Páginas
│   ├── CreateTripPage.tsx
│   └── TripDetailsPage.tsx
├── services/           # Comunicação com API
│   └── trips.service.ts
├── types/              # Tipos TypeScript
│   ├── Activity.ts
│   ├── Participant.ts
│   └── Trip.ts
└── styles/             # Estilos específicos
    ├── create-trip-date-picker.css
    └── date-picker.css
```

## 📄 Páginas

### CreateTripPage

Página inicial para criação de uma nova viagem.

**Rota:** `/`

**Funcionalidades:**
- Definir destino da viagem
- Selecionar datas (início e fim)
- Adicionar emails de convidados
- Confirmar criação com nome e email do organizador

**Estados:**
```typescript
const [destination, setDestination] = useState("");
const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange>();
const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
const [ownerName, setOwnerName] = useState("");
const [ownerEmail, setOwnerEmail] = useState("");
```

**Fluxo:**
1. Usuário preenche destino e datas → `DestinationAndDateStep`
2. Clica em "Continuar" → Abre `InviteGuestsStep`
3. Adiciona emails de convidados → `InviteGuestsModal`
4. Clica em "Confirmar viagem" → `ConfirmTripModal`
5. Preenche nome e email → Cria viagem
6. Redireciona para `/trips/:tripId`

### TripDetailsPage

Página de detalhes e gerenciamento da viagem.

**Rota:** `/trips/:tripId`

**Funcionalidades:**
- Visualizar informações da viagem
- Atualizar destino e datas
- Gerenciar participantes (adicionar/remover)
- Criar e visualizar atividades
- Adicionar links importantes

**Seções:**
- **Header** - Informações da viagem + ações
- **Atividades** - Lista de atividades por data
- **Links** - Links importantes
- **Convidados** - Lista de participantes

## 🧩 Componentes

### TripHeader

Cabeçalho com informações da viagem e botões de ação.

**Props:**
```typescript
interface TripHeaderProps {
  openUpdateTripModal: () => void;
}
```

**Exibe:**
- Destino da viagem
- Período (datas formatadas)
- Botão "Alterar local/data"
- Botão "Gerenciar convidados"

**Dados carregados:**
- Busca informações da viagem via `useParams` (tripId)
- Formata datas com `date-fns`

### ActivitiesList

Lista de atividades agrupadas por data.

**Funcionalidades:**
- Carrega atividades da viagem
- Agrupa por data
- Exibe horário e título
- Mostra estado vazio quando não há atividades

**Hook usado:** `useActivities(tripId)`

**Estrutura:**
```tsx
<div className="space-y-8">
  {/* Para cada data */}
  <div className="space-y-2.5">
    <div className="flex gap-2 items-baseline">
      <span className="text-xl font-semibold">Dia 17</span>
      <span className="text-xs text-zinc-500">Sábado</span>
    </div>
    
    {/* Atividades do dia */}
    <div className="space-y-2.5">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl">
        <div className="flex items-center gap-3">
          <CircleCheck className="size-5 text-lime-300" />
          <span className="text-zinc-100">Academia em grupo</span>
          <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### GuestsList

Lista de participantes da viagem.

**Props:**
```typescript
interface GuestsListProps {
  openManageGuestsModal: () => void;
}
```

**Exibe:**
- Nome do participante
- Email
- Tag de status (Confirmado/Pendente)
- Tag "Organizador" para o criador
- Botão "Gerenciar convidados"

### ImportantLinks

Lista de links importantes da viagem.

**Props:**
```typescript
interface ImportantLinksProps {
  openCreateLinkModal: () => void;
}
```

**Funcionalidades:**
- Exibe título e URL dos links
- Botão para adicionar novo link
- Links clicáveis (abrem em nova aba)

### DestinationAndDateStep

Primeiro passo da criação de viagem.

**Props:**
```typescript
interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}
```

**Campos:**
- Input de destino (com ícone MapPin)
- Seletor de datas (DayPicker)
- Botão "Continuar"

### InviteGuestsStep

Segundo passo da criação de viagem.

**Props:**
```typescript
interface InviteGuestsStepProps {
  emailsToInvite: string[];
  openConfirmTripModal: () => void;
  openGuestsModal: () => void;
}
```

**Exibe:**
- Quantidade de pessoas convidadas
- Botão "Alterar" (abre modal de convites)
- Botão "Confirmar viagem"

## 🪟 Modais

### ConfirmTripModal

Modal para confirmar criação da viagem.

**Props:**
```typescript
interface ConfirmTripModalProps {
  closeConfirmModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}
```

**Campos:**
- Nome completo do organizador
- Email do organizador

**Ação:** Cria a viagem e redireciona para detalhes

### InviteGuestsModal

Modal para adicionar/remover convidados.

**Props:**
```typescript
interface InviteGuestsModalProps {
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
  closeGuestsModal: () => void;
}
```

**Funcionalidades:**
- Input para adicionar email
- Lista de emails adicionados
- Botão X para remover email
- Validação de duplicatas

### ManageGuestsModal

Modal para gerenciar participantes da viagem.

**Props:**
```typescript
interface ManageGuestsModalProps {
  closeManageGuestsModal: () => void;
  onGuestsUpdated: () => void;
}
```

**Funcionalidades:**
- Adicionar novos convidados (abre InviteGuestsModal)
- Listar participantes atuais
- Remover participantes (exceto organizador)
- Exibir status de confirmação

### ConfirmRemoveParticipantModal

Modal de confirmação para remover participante.

**Props:**
```typescript
interface ConfirmRemoveParticipantModalProps {
  participantId: string;
  participantName: string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

**Ação:** Remove participante da viagem

### CreateActivityModal

Modal para criar nova atividade.

**Props:**
```typescript
interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}
```

**Campos:**
- Título da atividade
- Data e horário (DayPicker + input time)

**Validações:**
- Data deve estar dentro do período da viagem
- Todos os campos obrigatórios

### CreateLinkModal

Modal para adicionar link importante.

**Props:**
```typescript
interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}
```

**Campos:**
- Título do link
- URL

### UpdateTripModal

Modal para atualizar informações da viagem.

**Props:**
```typescript
interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
}
```

**Campos:**
- Destino
- Datas (início e fim)

**Comportamento:**
- Carrega dados atuais da viagem
- Atualiza informações
- Recarrega página após sucesso

## 🪝 Hooks

### useTrips

Hook para gerenciar dados de viagens.

**Retorno:**
```typescript
{
  trip: Trip | null;
  isLoading: boolean;
  error: Error | null;
  fetchTrip: (tripId: string) => Promise<void>;
}
```

**Uso:**
```tsx
const { trip, isLoading } = useTrips(tripId);

if (isLoading) return <div>Carregando...</div>;
if (!trip) return <div>Viagem não encontrada</div>;
```

### useActivities

Hook para gerenciar atividades da viagem.

**Retorno:**
```typescript
{
  activities: Activity[];
  isLoading: boolean;
  fetchActivities: () => Promise<void>;
}
```

**Funcionalidades:**
- Carrega atividades da viagem
- Agrupa por data
- Ordena por data e horário

## 🔌 Serviços

### trips.service.ts

Cliente Axios configurado para comunicação com a API.

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});
```

**Endpoints utilizados:**

```typescript
// Criar viagem
POST /trips
Body: {
  destination: string;
  starts_at: Date;
  ends_at: Date;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
}

// Buscar viagem
GET /trips/:tripId

// Atualizar viagem
PUT /trips/:tripId
Body: {
  destination: string;
  starts_at: Date;
  ends_at: Date;
}

// Buscar participantes
GET /trips/:tripId/participants

// Convidar participante
POST /trips/:tripId/invites
Body: {
  email: string;
}

// Remover participante
DELETE /trips/:tripId/participants/:participantId

// Buscar atividades
GET /trips/:tripId/activities

// Criar atividade
POST /trips/:tripId/activities
Body: {
  title: string;
  occurs_at: Date;
}

// Buscar links
GET /trips/:tripId/links

// Criar link
POST /trips/:tripId/links
Body: {
  title: string;
  url: string;
}
```

## 📦 Tipos

### Trip

```typescript
export interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
  created_at: string;
}
```

### Participant

```typescript
export interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
  is_owner: boolean;
}
```

### Activity

```typescript
export interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  trip_id: string;
}
```

## 🔄 Fluxos de Uso

### 1. Criar Nova Viagem

```
1. Usuário acessa página inicial (/)
2. Preenche destino e seleciona datas
3. Clica em "Continuar"
4. Adiciona emails de convidados
5. Clica em "Confirmar viagem"
6. Preenche nome e email do organizador
7. Sistema cria viagem e envia convites
8. Redireciona para /trips/:tripId
```

### 2. Adicionar Atividade

```
1. Na página de detalhes da viagem
2. Clica em "Cadastrar atividade"
3. Preenche título, data e horário
4. Clica em "Salvar atividade"
5. Sistema valida e cria atividade
6. Lista de atividades é atualizada
7. Toast de sucesso é exibido
```

### 3. Gerenciar Convidados

```
1. Clica em "Gerenciar convidados"
2. Modal exibe lista de participantes
3. Para adicionar:
   - Clica em "Convidar pessoa"
   - Digita email
   - Clica em "Enviar convite"
4. Para remover:
   - Clica no X ao lado do participante
   - Confirma remoção no modal
5. Sistema atualiza lista
```

### 4. Atualizar Viagem

```
1. Clica em "Alterar local/data"
2. Modal carrega dados atuais
3. Modifica destino e/ou datas
4. Clica em "Salvar atualizações"
5. Sistema valida e atualiza
6. Página recarrega com novos dados
7. Toast de sucesso é exibido
```

## 🎯 Boas Práticas

### 1. Validação de Dados

Sempre valide antes de enviar para API:

```tsx
if (!destination || !eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
  addToast({
    type: 'error',
    title: 'Dados incompletos',
    message: 'Preencha todos os campos obrigatórios.'
  });
  return;
}
```

### 2. Feedback ao Usuário

Use toasts para todas as ações:

```tsx
try {
  await api.post('/endpoint', data);
  addToast({
    type: 'success',
    title: 'Sucesso!',
    message: 'Operação realizada com sucesso.'
  });
} catch {
  addToast({
    type: 'error',
    title: 'Erro',
    message: 'Não foi possível realizar a operação.'
  });
}
```

### 3. Estados de Loading

Desabilite ações durante operações assíncronas:

```tsx
const [isLoading, setIsLoading] = useState(false);

async function handleSubmit() {
  setIsLoading(true);
  try {
    await api.post('/endpoint', data);
  } finally {
    setIsLoading(false);
  }
}

<Button disabled={isLoading}>
  {isLoading ? 'Salvando...' : 'Salvar'}
</Button>
```

### 4. Atualização de Dados

Após mutações, atualize a UI:

```tsx
// Opção 1: Recarregar página
window.document.location.reload();

// Opção 2: Re-fetch dos dados
await fetchActivities();

// Opção 3: Forçar re-render com key
setKey(prev => prev + 1);
<Component key={key} />
```

## 🐛 Troubleshooting

### Problema: Atividades não aparecem

**Causa:** Data da atividade fora do período da viagem

**Solução:** Validar data antes de criar:
```tsx
if (activityDate < tripStartDate || activityDate > tripEndDate) {
  addToast({
    type: 'error',
    message: 'A data deve estar dentro do período da viagem.'
  });
  return;
}
```

### Problema: Email duplicado

**Causa:** Tentativa de adicionar email já existente

**Solução:** Validar antes de adicionar:
```tsx
if (emailsToInvite.includes(email)) {
  addToast({
    type: 'warning',
    message: 'Este email já foi adicionado.'
  });
  return;
}
```

### Problema: Não consegue remover organizador

**Causa:** Organizador não pode ser removido

**Solução:** Desabilitar botão de remoção:
```tsx
{!participant.is_owner && (
  <button onClick={() => handleRemove(participant.id)}>
    Remover
  </button>
)}
```
