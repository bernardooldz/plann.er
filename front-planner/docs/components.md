# 🧩 Componentes

Documentação dos componentes reutilizáveis da aplicação.

## 📋 Índice

- [Design System](#design-system)
- [Feature Components](#feature-components)
- [Padrões de Componentes](#padrões-de-componentes)
- [Boas Práticas](#boas-práticas)

## 🎨 Design System

Os componentes do Design System estão documentados em [design-system.md](./design-system.md).

Componentes disponíveis:
- Button
- Input
- Modal
- Toast
- Tag
- Notification
- Divider

## 🗺️ Feature Components

### Trips Components

#### TripHeader

Cabeçalho da página de detalhes da viagem.

**Localização:** `features/trips/components/TripHeader.tsx`

**Props:**
```typescript
interface TripHeaderProps {
  openUpdateTripModal: () => void;
}
```

**Responsabilidades:**
- Exibir destino e período da viagem
- Botão para alterar local/data
- Botão para gerenciar convidados
- Carregar dados da viagem via API

**Exemplo de uso:**
```tsx
<TripHeader openUpdateTripModal={openUpdateTripModal} />
```

**Estrutura:**
```tsx
<div className="px-4 h-16 rounded-xl bg-zinc-900">
  <div className="flex items-center justify-between">
    {/* Informações da viagem */}
    <div className="flex items-center gap-2">
      <MapPin className="size-5 text-zinc-400" />
      <span className="text-zinc-100">{destination}</span>
    </div>
    
    {/* Período */}
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{displayedDate}</span>
      </div>
      
      {/* Botões de ação */}
      <div className="flex gap-2">
        <Button variant="secondary" onClick={openUpdateTripModal}>
          Alterar local/data
        </Button>
        <Button variant="secondary" onClick={openManageGuestsModal}>
          Gerenciar convidados
        </Button>
      </div>
    </div>
  </div>
</div>
```

#### ActivitiesList

Lista de atividades agrupadas por data.

**Localização:** `features/trips/components/ActivitiesList.tsx`

**Props:** Nenhuma (usa `useParams` para obter tripId)

**Responsabilidades:**
- Carregar atividades da viagem
- Agrupar atividades por data
- Exibir estado vazio
- Formatar datas e horários

**Hook usado:**
```tsx
const { activities } = useActivities(tripId);
```

**Estrutura de dados:**
```typescript
// Atividades agrupadas por data
{
  "2024-07-17": [
    { id: "1", title: "Academia", occurs_at: "2024-07-17T08:00:00" },
    { id: "2", title: "Almoço", occurs_at: "2024-07-17T12:00:00" }
  ],
  "2024-07-18": [
    { id: "3", title: "Passeio", occurs_at: "2024-07-18T14:00:00" }
  ]
}
```

**Estado vazio:**
```tsx
{activities.length === 0 && (
  <p className="text-zinc-500 text-sm">
    Nenhuma atividade cadastrada nessa viagem ainda.
  </p>
)}
```

#### GuestsList

Lista de participantes da viagem.

**Localização:** `features/trips/components/GuestsList.tsx`

**Props:**
```typescript
interface GuestsListProps {
  openManageGuestsModal: () => void;
}
```

**Responsabilidades:**
- Carregar lista de participantes
- Exibir nome, email e status
- Destacar organizador
- Botão para gerenciar convidados

**Exemplo de uso:**
```tsx
<GuestsList openManageGuestsModal={openManageGuestsModal} />
```

**Estrutura:**
```tsx
<div className="space-y-6">
  <h2 className="font-semibold text-xl">Convidados</h2>
  
  <div className="space-y-5">
    {participants.map(participant => (
      <div key={participant.id} className="space-y-1.5">
        <span className="block font-medium text-zinc-100">
          {participant.name ?? `Convidado ${index}`}
        </span>
        <span className="block text-sm text-zinc-400 truncate">
          {participant.email}
        </span>
        
        <div className="flex gap-2">
          <Tag variant={participant.is_confirmed ? 'success' : 'pending'}>
            {participant.is_confirmed ? 'Confirmado' : 'Pendente'}
          </Tag>
          {participant.is_owner && (
            <Tag variant="default">Organizador</Tag>
          )}
        </div>
      </div>
    ))}
  </div>
  
  <Button variant="secondary" size="full" onClick={openManageGuestsModal}>
    Gerenciar convidados
  </Button>
</div>
```

#### ImportantLinks

Lista de links importantes da viagem.

**Localização:** `features/trips/components/ImportantLinks.tsx`

**Props:**
```typescript
interface ImportantLinksProps {
  openCreateLinkModal: () => void;
}
```

**Responsabilidades:**
- Carregar links da viagem
- Exibir título e URL
- Links clicáveis (nova aba)
- Botão para adicionar link

**Exemplo de uso:**
```tsx
<ImportantLinks openCreateLinkModal={openCreateLinkModal} />
```

**Estrutura:**
```tsx
<div className="space-y-6">
  <h2 className="font-semibold text-xl">Links importantes</h2>
  
  <div className="space-y-5">
    {links.map(link => (
      <div key={link.id} className="flex items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <span className="block font-medium text-zinc-100">
            {link.title}
          </span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
          >
            {link.url}
          </a>
        </div>
        <Link2 className="size-5 text-zinc-400 shrink-0" />
      </div>
    ))}
  </div>
  
  <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
    <Plus className="size-5" />
    Cadastrar novo link
  </Button>
</div>
```

#### DestinationAndDateStep

Primeiro passo da criação de viagem.

**Localização:** `features/trips/components/DestinationAndDateStep.tsx`

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

**Responsabilidades:**
- Input de destino
- Seletor de datas (DayPicker)
- Validação básica
- Transição para próximo passo

**Exemplo de uso:**
```tsx
<DestinationAndDateStep
  isGuestsInputOpen={isGuestsInputOpen}
  closeGuestsInput={closeGuestsInput}
  openGuestsInput={openGuestsInput}
  setDestination={setDestination}
  eventStartAndEndDates={eventStartAndEndDates}
  setEventStartAndEndDates={setEventStartAndEndDates}
/>
```

#### InviteGuestsStep

Segundo passo da criação de viagem.

**Localização:** `features/trips/components/InviteGuestsStep.tsx`

**Props:**
```typescript
interface InviteGuestsStepProps {
  emailsToInvite: string[];
  openConfirmTripModal: () => void;
  openGuestsModal: () => void;
}
```

**Responsabilidades:**
- Exibir quantidade de convidados
- Botão para alterar convidados
- Botão para confirmar viagem

**Exemplo de uso:**
```tsx
<InviteGuestsStep
  emailsToInvite={emailsToInvite}
  openConfirmTripModal={openConfirmTripModal}
  openGuestsModal={openGuestsModal}
/>
```

## 📐 Padrões de Componentes

### 1. Estrutura de Arquivo

```tsx
// Imports
import { useState } from 'react';
import { Button, Input } from '@/design-system';
import { MapPin } from 'lucide-react';

// Interface de Props
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// Componente
export function MyComponent({ title, onAction }: MyComponentProps) {
  // Estados
  const [isOpen, setIsOpen] = useState(false);
  
  // Handlers
  function handleClick() {
    onAction();
  }
  
  // Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Ação</Button>
    </div>
  );
}
```

### 2. Nomenclatura

- **Componentes:** PascalCase (ex: `TripHeader`)
- **Arquivos:** PascalCase (ex: `TripHeader.tsx`)
- **Props Interface:** `ComponentNameProps`
- **Handlers:** `handle` + ação (ex: `handleClick`)
- **Estados booleanos:** `is` + estado (ex: `isOpen`)

### 3. Props

```tsx
// ✅ Bom - Interface explícita
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps) {
  // ...
}

// ❌ Evitar - Props inline
export function Button({ variant, onClick, children }: {
  variant: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  // ...
}
```

### 4. Composição

Prefira composição a props complexas:

```tsx
// ✅ Bom - Composição
<Modal isOpen={isOpen} onClose={closeModal}>
  <div className="space-y-3">
    <Input placeholder="Nome" />
    <Button>Salvar</Button>
  </div>
</Modal>

// ❌ Evitar - Props complexas
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  fields={[
    { type: 'input', placeholder: 'Nome' }
  ]}
  actions={[
    { label: 'Salvar', onClick: handleSave }
  ]}
/>
```

### 5. Estados

```tsx
// Estados locais
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState<Data[]>([]);

// Estados derivados (não use useState)
const hasData = data.length > 0;
const isEmpty = !hasData;

// Efeitos
useEffect(() => {
  fetchData();
}, []);
```

### 6. Handlers

```tsx
// Handlers síncronos
function handleClick() {
  setIsOpen(true);
}

// Handlers assíncronos
async function handleSubmit() {
  setIsLoading(true);
  try {
    await api.post('/endpoint', data);
    addToast({ type: 'success', message: 'Sucesso!' });
  } catch {
    addToast({ type: 'error', message: 'Erro!' });
  } finally {
    setIsLoading(false);
  }
}

// Handlers com parâmetros
function handleRemove(id: string) {
  setItems(items.filter(item => item.id !== id));
}
```

## ✅ Boas Práticas

### 1. Componentes Pequenos

Mantenha componentes focados em uma responsabilidade:

```tsx
// ✅ Bom - Componente focado
export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl">
      <div className="flex items-center gap-3">
        <CircleCheck className="size-5 text-lime-300" />
        <span>{activity.title}</span>
        <span className="text-sm text-zinc-400 ml-auto">
          {format(activity.occurs_at, 'HH:mm')}h
        </span>
      </div>
    </div>
  );
}

// ❌ Evitar - Componente muito grande
export function ActivitiesSection() {
  // 200+ linhas de código
  // Múltiplas responsabilidades
  // Difícil de manter
}
```

### 2. Extrair Lógica Complexa

Use custom hooks para lógica complexa:

```tsx
// ✅ Bom - Lógica em hook
export function ActivitiesList() {
  const { activities, isLoading } = useActivities(tripId);
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <div>
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

// Hook separado
export function useActivities(tripId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchActivities();
  }, [tripId]);
  
  async function fetchActivities() {
    // Lógica de fetch
  }
  
  return { activities, isLoading };
}
```

### 3. Tipagem Forte

Use TypeScript para segurança:

```tsx
// ✅ Bom - Tipos explícitos
interface Activity {
  id: string;
  title: string;
  occurs_at: string;
}

interface ActivityItemProps {
  activity: Activity;
  onRemove?: (id: string) => void;
}

// ❌ Evitar - any
interface ActivityItemProps {
  activity: any;
  onRemove?: any;
}
```

### 4. Acessibilidade

Garanta acessibilidade em todos os componentes:

```tsx
// ✅ Bom - Acessível
<button
  onClick={handleClick}
  aria-label="Fechar modal"
  className="..."
>
  <X className="size-5" />
</button>

// Labels em inputs
<label htmlFor="email" className="sr-only">
  Email
</label>
<input
  id="email"
  type="email"
  placeholder="Digite seu email"
/>

// ❌ Evitar - Não acessível
<div onClick={handleClick}>
  <X className="size-5" />
</div>
```

### 5. Performance

Otimize quando necessário:

```tsx
// Memoização de componentes pesados
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Renderização pesada
});

// Callbacks memoizados
const handleClick = useCallback(() => {
  // Handler
}, [dependencies]);

// Valores computados
const sortedActivities = useMemo(() => {
  return activities.sort((a, b) => 
    new Date(a.occurs_at).getTime() - new Date(b.occurs_at).getTime()
  );
}, [activities]);
```

### 6. Tratamento de Erros

Sempre trate erros adequadamente:

```tsx
async function handleSubmit() {
  try {
    await api.post('/endpoint', data);
    addToast({
      type: 'success',
      title: 'Sucesso!',
      message: 'Dados salvos com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao salvar:', error);
    addToast({
      type: 'error',
      title: 'Erro ao salvar',
      message: 'Não foi possível salvar os dados. Tente novamente.'
    });
  }
}
```

### 7. Estados de Loading

Forneça feedback visual durante operações:

```tsx
export function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="size-6 animate-spin text-zinc-400" />
      </div>
    );
  }
  
  return (
    <div>
      {/* Conteúdo */}
    </div>
  );
}
```
