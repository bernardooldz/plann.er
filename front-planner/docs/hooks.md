# 🪝 Hooks

Documentação dos custom hooks da aplicação.

## 📋 Índice

- [Hooks do Design System](#hooks-do-design-system)
- [Hooks de Features](#hooks-de-features)
- [Hooks Compartilhados](#hooks-compartilhados)
- [Criando Custom Hooks](#criando-custom-hooks)
- [Boas Práticas](#boas-práticas)

## 🎨 Hooks do Design System

### useToast

Hook para gerenciar notificações toast.

**Localização:** `design-system/components/ui/toast-provider.tsx`

**Retorno:**
```typescript
{
  addToast: (toast: ToastData) => void;
}
```

**Tipos:**
```typescript
interface ToastData {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // padrão: 5000ms
}
```

**Uso:**
```tsx
import { useToast } from '@/design-system';

export function MyComponent() {
  const { addToast } = useToast();
  
  async function handleAction() {
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
  }
  
  return <button onClick={handleAction}>Executar</button>;
}
```

**Características:**
- Toasts são empilhados no topo direito
- Auto-dismiss após duração configurada
- Animação de entrada/saída
- Múltiplos toasts simultâneos

**Tipos de Toast:**

```tsx
// Sucesso - Operações bem-sucedidas
addToast({
  type: 'success',
  title: 'Viagem criada!',
  message: 'Sua viagem foi criada com sucesso.'
});

// Erro - Falhas e erros
addToast({
  type: 'error',
  title: 'Erro ao salvar',
  message: 'Não foi possível salvar as alterações.'
});

// Aviso - Alertas e validações
addToast({
  type: 'warning',
  title: 'Atenção',
  message: 'Preencha todos os campos obrigatórios.'
});

// Info - Informações gerais
addToast({
  type: 'info',
  title: 'Informação',
  message: 'Os participantes serão notificados por email.'
});
```

## 🗺️ Hooks de Features

### useTrips

Hook para gerenciar dados de viagens.

**Localização:** `features/trips/hooks/useTrips.ts`

**Parâmetros:**
```typescript
tripId: string
```

**Retorno:**
```typescript
{
  trip: Trip | null;
  isLoading: boolean;
  error: Error | null;
  fetchTrip: () => Promise<void>;
}
```

**Tipos:**
```typescript
interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
  created_at: string;
}
```

**Uso:**
```tsx
import { useTrips } from '@/features/trips/hooks/useTrips';

export function TripDetails() {
  const { tripId } = useParams();
  const { trip, isLoading, error } = useTrips(tripId);
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  if (error) {
    return <div>Erro ao carregar viagem</div>;
  }
  
  if (!trip) {
    return <div>Viagem não encontrada</div>;
  }
  
  return (
    <div>
      <h1>{trip.destination}</h1>
      <p>
        {format(new Date(trip.starts_at), 'dd/MM/yyyy')} até{' '}
        {format(new Date(trip.ends_at), 'dd/MM/yyyy')}
      </p>
    </div>
  );
}
```

**Implementação:**
```tsx
import { useState, useEffect } from 'react';
import { api } from '../services/trips.service';
import type { Trip } from '../types';

export function useTrips(tripId: string) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  async function fetchTrip() {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get(`/trips/${tripId}`);
      setTrip(response.data.trip);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);
  
  return { trip, isLoading, error, fetchTrip };
}
```

### useActivities

Hook para gerenciar atividades de uma viagem.

**Localização:** `features/trips/hooks/useActivities.ts`

**Parâmetros:**
```typescript
tripId: string
```

**Retorno:**
```typescript
{
  activities: Activity[];
  isLoading: boolean;
  error: Error | null;
  fetchActivities: () => Promise<void>;
}
```

**Tipos:**
```typescript
interface Activity {
  id: string;
  title: string;
  occurs_at: string;
  trip_id: string;
}
```

**Uso:**
```tsx
import { useActivities } from '@/features/trips/hooks/useActivities';

export function ActivitiesList() {
  const { tripId } = useParams();
  const { activities, isLoading } = useActivities(tripId);
  
  if (isLoading) {
    return <div>Carregando atividades...</div>;
  }
  
  if (activities.length === 0) {
    return <div>Nenhuma atividade cadastrada</div>;
  }
  
  return (
    <div>
      {activities.map(activity => (
        <div key={activity.id}>
          <h3>{activity.title}</h3>
          <span>{format(new Date(activity.occurs_at), 'HH:mm')}h</span>
        </div>
      ))}
    </div>
  );
}
```

**Funcionalidades:**
- Carrega atividades da API
- Agrupa por data
- Ordena por data e horário
- Recarrega após mutações

**Agrupamento por data:**
```tsx
const activitiesByDate = activities.reduce((acc, activity) => {
  const date = format(new Date(activity.occurs_at), 'yyyy-MM-dd');
  
  if (!acc[date]) {
    acc[date] = [];
  }
  
  acc[date].push(activity);
  return acc;
}, {} as Record<string, Activity[]>);
```

## 🔄 Hooks Compartilhados

### useDebounce

Hook para debounce de valores.

**Localização:** `shared/hooks/useDebounce.ts`

**Parâmetros:**
```typescript
value: T        // Valor a ser debounced
delay: number   // Delay em milissegundos
```

**Retorno:**
```typescript
T // Valor debounced
```

**Uso:**
```tsx
import { useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Buscar apenas após 500ms sem digitação
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

**Implementação:**
```tsx
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
```

**Casos de uso:**
- Busca em tempo real
- Validação de formulários
- Auto-save
- Filtros dinâmicos

## 🛠️ Criando Custom Hooks

### Estrutura Básica

```tsx
import { useState, useEffect } from 'react';

export function useMyHook(param: string) {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  async function fetchData() {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get(`/endpoint/${param}`);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [param]);
  
  return { data, isLoading, error, refetch: fetchData };
}
```

### Hook com Mutação

```tsx
import { useState } from 'react';
import { useToast } from '@/design-system';

export function useCreateActivity(tripId: string) {
  const [isCreating, setIsCreating] = useState(false);
  const { addToast } = useToast();
  
  async function createActivity(data: CreateActivityData) {
    try {
      setIsCreating(true);
      
      await api.post(`/trips/${tripId}/activities`, data);
      
      addToast({
        type: 'success',
        title: 'Atividade criada!',
        message: 'A atividade foi adicionada à viagem.'
      });
      
      return true;
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao criar',
        message: 'Não foi possível criar a atividade.'
      });
      
      return false;
    } finally {
      setIsCreating(false);
    }
  }
  
  return { createActivity, isCreating };
}
```

**Uso:**
```tsx
export function CreateActivityModal() {
  const { tripId } = useParams();
  const { createActivity, isCreating } = useCreateActivity(tripId);
  
  async function handleSubmit(data: CreateActivityData) {
    const success = await createActivity(data);
    
    if (success) {
      closeModal();
    }
  }
  
  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        {/* Campos */}
        <Button disabled={isCreating}>
          {isCreating ? 'Criando...' : 'Criar atividade'}
        </Button>
      </form>
    </Modal>
  );
}
```

### Hook com Cache

```tsx
import { useState, useEffect } from 'react';

const cache = new Map<string, any>();

export function useCachedData<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(cache.get(key) || null);
  const [isLoading, setIsLoading] = useState(!cache.has(key));
  
  async function fetchData() {
    try {
      setIsLoading(true);
      
      const result = await fetcher();
      
      cache.set(key, result);
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (!cache.has(key)) {
      fetchData();
    }
  }, [key]);
  
  return { data, isLoading, refetch: fetchData };
}
```

## ✅ Boas Práticas

### 1. Nomenclatura

Sempre comece com `use`:

```tsx
// ✅ Bom
export function useTrips() { }
export function useActivities() { }
export function useDebounce() { }

// ❌ Evitar
export function getTrips() { }
export function trips() { }
```

### 2. Retorno Consistente

Use objetos para retornos múltiplos:

```tsx
// ✅ Bom - Objeto nomeado
export function useTrips() {
  return { trip, isLoading, error, refetch };
}

// ✅ Bom - Array para valores relacionados
export function useState() {
  return [value, setValue];
}

// ❌ Evitar - Mistura de padrões
export function useTrips() {
  return [trip, { isLoading, error }];
}
```

### 3. Dependências do useEffect

Sempre declare todas as dependências:

```tsx
// ✅ Bom
useEffect(() => {
  fetchData(tripId);
}, [tripId]);

// ❌ Evitar - Dependências faltando
useEffect(() => {
  fetchData(tripId);
}, []); // tripId deveria estar aqui
```

### 4. Cleanup

Limpe efeitos quando necessário:

```tsx
useEffect(() => {
  const controller = new AbortController();
  
  async function fetchData() {
    try {
      const response = await api.get('/endpoint', {
        signal: controller.signal
      });
      setData(response.data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    }
  }
  
  fetchData();
  
  // Cleanup
  return () => {
    controller.abort();
  };
}, []);
```

### 5. Tratamento de Erros

Sempre trate erros adequadamente:

```tsx
export function useTrips(tripId: string) {
  const [error, setError] = useState<Error | null>(null);
  const { addToast } = useToast();
  
  async function fetchTrip() {
    try {
      setError(null);
      const response = await api.get(`/trips/${tripId}`);
      setTrip(response.data.trip);
    } catch (err) {
      const error = err as Error;
      setError(error);
      
      addToast({
        type: 'error',
        title: 'Erro ao carregar',
        message: 'Não foi possível carregar a viagem.'
      });
    }
  }
  
  return { trip, error, fetchTrip };
}
```

### 6. Estados de Loading

Forneça feedback de loading:

```tsx
export function useActivities(tripId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  async function fetchActivities(isRefresh = false) {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      
      const response = await api.get(`/trips/${tripId}/activities`);
      setActivities(response.data.activities);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }
  
  return { activities, isLoading, isRefreshing, refetch: () => fetchActivities(true) };
}
```

### 7. Memoização

Use useMemo e useCallback quando apropriado:

```tsx
export function useActivities(tripId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  
  // Memoizar computação pesada
  const activitiesByDate = useMemo(() => {
    return activities.reduce((acc, activity) => {
      const date = format(new Date(activity.occurs_at), 'yyyy-MM-dd');
      if (!acc[date]) acc[date] = [];
      acc[date].push(activity);
      return acc;
    }, {} as Record<string, Activity[]>);
  }, [activities]);
  
  // Memoizar callbacks
  const refetch = useCallback(async () => {
    const response = await api.get(`/trips/${tripId}/activities`);
    setActivities(response.data.activities);
  }, [tripId]);
  
  return { activities, activitiesByDate, refetch };
}
```

### 8. Composição de Hooks

Combine hooks para funcionalidades complexas:

```tsx
export function useTripDetails(tripId: string) {
  const { trip, isLoading: isTripLoading } = useTrips(tripId);
  const { activities, isLoading: isActivitiesLoading } = useActivities(tripId);
  const { participants, isLoading: isParticipantsLoading } = useParticipants(tripId);
  
  const isLoading = isTripLoading || isActivitiesLoading || isParticipantsLoading;
  
  return {
    trip,
    activities,
    participants,
    isLoading
  };
}
```
