# 🔌 Serviços e API

Documentação da comunicação com a API e serviços do frontend.

## 📋 Índice

- [Configuração](#configuração)
- [Endpoints](#endpoints)
- [Tratamento de Erros](#tratamento-de-erros)
- [Interceptors](#interceptors)
- [Boas Práticas](#boas-práticas)

## ⚙️ Configuração

### Cliente Axios

**Localização:** `shared/utils/api.ts`

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});
```

**Variáveis de Ambiente:**

```env
VITE_API_URL=http://localhost:3333
```

**Configuração com env:**
```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
});
```

## 📡 Endpoints

### Trips (Viagens)

#### Criar Viagem

```typescript
POST /trips

// Request
{
  destination: string;
  starts_at: string; // ISO 8601
  ends_at: string;   // ISO 8601
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
}

// Response
{
  tripId: string;
}

// Exemplo
const response = await api.post('/trips', {
  destination: 'Florianópolis, SC',
  starts_at: '2024-07-17T00:00:00.000Z',
  ends_at: '2024-07-20T00:00:00.000Z',
  emails_to_invite: ['john@example.com', 'jane@example.com'],
  owner_name: 'João Silva',
  owner_email: 'joao@example.com'
});

const { tripId } = response.data;
```

#### Buscar Viagem

```typescript
GET /trips/:tripId

// Response
{
  trip: {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_confirmed: boolean;
    created_at: string;
  }
}

// Exemplo
const response = await api.get(`/trips/${tripId}`);
const trip = response.data.trip;
```

#### Atualizar Viagem

```typescript
PUT /trips/:tripId

// Request
{
  destination: string;
  starts_at: string;
  ends_at: string;
}

// Response
{
  tripId: string;
}

// Exemplo
await api.put(`/trips/${tripId}`, {
  destination: 'Rio de Janeiro, RJ',
  starts_at: '2024-08-01T00:00:00.000Z',
  ends_at: '2024-08-05T00:00:00.000Z'
});
```

#### Confirmar Viagem

```typescript
GET /trips/:tripId/confirm

// Response
{
  tripId: string;
}

// Exemplo
await api.get(`/trips/${tripId}/confirm`);
```

### Participants (Participantes)

#### Listar Participantes

```typescript
GET /trips/:tripId/participants

// Response
{
  participants: [
    {
      id: string;
      name: string | null;
      email: string;
      is_confirmed: boolean;
      is_owner: boolean;
    }
  ]
}

// Exemplo
const response = await api.get(`/trips/${tripId}/participants`);
const participants = response.data.participants;
```

#### Convidar Participante

```typescript
POST /trips/:tripId/invites

// Request
{
  email: string;
}

// Response
{
  participantId: string;
}

// Exemplo
await api.post(`/trips/${tripId}/invites`, {
  email: 'novo@example.com'
});
```

#### Remover Participante

```typescript
DELETE /trips/:tripId/participants/:participantId

// Response
204 No Content

// Exemplo
await api.delete(`/trips/${tripId}/participants/${participantId}`);
```

#### Confirmar Participante

```typescript
PATCH /participants/:participantId/confirm

// Request
{
  name: string;
}

// Response
{
  participantId: string;
}

// Exemplo
await api.patch(`/participants/${participantId}/confirm`, {
  name: 'João Silva'
});
```

### Activities (Atividades)

#### Listar Atividades

```typescript
GET /trips/:tripId/activities

// Response
{
  activities: [
    {
      id: string;
      title: string;
      occurs_at: string;
      trip_id: string;
    }
  ]
}

// Exemplo
const response = await api.get(`/trips/${tripId}/activities`);
const activities = response.data.activities;
```

#### Criar Atividade

```typescript
POST /trips/:tripId/activities

// Request
{
  title: string;
  occurs_at: string; // ISO 8601
}

// Response
{
  activityId: string;
}

// Exemplo
await api.post(`/trips/${tripId}/activities`, {
  title: 'Academia em grupo',
  occurs_at: '2024-07-17T08:00:00.000Z'
});
```

### Links

#### Listar Links

```typescript
GET /trips/:tripId/links

// Response
{
  links: [
    {
      id: string;
      title: string;
      url: string;
      trip_id: string;
    }
  ]
}

// Exemplo
const response = await api.get(`/trips/${tripId}/links`);
const links = response.data.links;
```

#### Criar Link

```typescript
POST /trips/:tripId/links

// Request
{
  title: string;
  url: string;
}

// Response
{
  linkId: string;
}

// Exemplo
await api.post(`/trips/${tripId}/links`, {
  title: 'Reserva do Hotel',
  url: 'https://booking.com/reservation/123'
});
```

## 🚨 Tratamento de Erros

### Estrutura de Erro da API

```typescript
{
  error: string;
  message: string;
  statusCode: number;
}
```

### Try-Catch Pattern

```typescript
import { useToast } from '@/design-system';

async function createActivity(data: CreateActivityData) {
  const { addToast } = useToast();
  
  try {
    const response = await api.post(`/trips/${tripId}/activities`, data);
    
    addToast({
      type: 'success',
      title: 'Atividade criada!',
      message: 'A atividade foi adicionada à viagem.'
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    
    addToast({
      type: 'error',
      title: 'Erro ao criar atividade',
      message: 'Não foi possível criar a atividade. Tente novamente.'
    });
    
    throw error;
  }
}
```

### Tratamento por Status Code

```typescript
async function fetchTrip(tripId: string) {
  try {
    const response = await api.get(`/trips/${tripId}`);
    return response.data.trip;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      
      switch (status) {
        case 404:
          addToast({
            type: 'error',
            title: 'Viagem não encontrada',
            message: 'A viagem que você procura não existe.'
          });
          break;
          
        case 401:
          addToast({
            type: 'error',
            title: 'Não autorizado',
            message: 'Você não tem permissão para acessar esta viagem.'
          });
          break;
          
        case 500:
          addToast({
            type: 'error',
            title: 'Erro no servidor',
            message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.'
          });
          break;
          
        default:
          addToast({
            type: 'error',
            title: 'Erro',
            message: 'Ocorreu um erro inesperado.'
          });
      }
    }
    
    throw error;
  }
}
```

## 🔧 Interceptors

### Request Interceptor

Adicionar headers ou tokens em todas as requisições:

```typescript
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log de requisições em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### Response Interceptor

Tratar respostas globalmente:

```typescript
api.interceptors.response.use(
  (response) => {
    // Log de respostas em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`[API] Response:`, response.data);
    }
    
    return response;
  },
  (error) => {
    // Tratamento global de erros
    if (error.response?.status === 401) {
      // Redirecionar para login
      window.location.href = '/login';
    }
    
    if (error.response?.status === 500) {
      // Log de erros do servidor
      console.error('[API] Server Error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);
```

## ✅ Boas Práticas

### 1. Centralizar Chamadas de API

Crie funções específicas para cada endpoint:

```typescript
// services/trips.service.ts
export const tripsService = {
  async create(data: CreateTripData) {
    const response = await api.post('/trips', data);
    return response.data;
  },
  
  async getById(tripId: string) {
    const response = await api.get(`/trips/${tripId}`);
    return response.data.trip;
  },
  
  async update(tripId: string, data: UpdateTripData) {
    const response = await api.put(`/trips/${tripId}`, data);
    return response.data;
  },
  
  async delete(tripId: string) {
    await api.delete(`/trips/${tripId}`);
  }
};

// Uso
const trip = await tripsService.getById(tripId);
```

### 2. Tipagem de Respostas

Use TypeScript para tipar respostas:

```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
}

async function fetchTrip(tripId: string): Promise<Trip> {
  const response = await api.get<ApiResponse<{ trip: Trip }>>(
    `/trips/${tripId}`
  );
  return response.data.data.trip;
}
```

### 3. Cancelamento de Requisições

Use AbortController para cancelar requisições:

```typescript
useEffect(() => {
  const controller = new AbortController();
  
  async function fetchData() {
    try {
      const response = await api.get(`/trips/${tripId}`, {
        signal: controller.signal
      });
      setTrip(response.data.trip);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Erro ao buscar viagem:', error);
      }
    }
  }
  
  fetchData();
  
  return () => {
    controller.abort();
  };
}, [tripId]);
```

### 4. Retry Logic

Implementar retry para requisições falhadas:

```typescript
async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetcher();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}

// Uso
const trip = await fetchWithRetry(() => 
  api.get(`/trips/${tripId}`).then(res => res.data.trip)
);
```

### 5. Loading States

Gerencie estados de loading adequadamente:

```typescript
async function fetchTrip(tripId: string) {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await api.get(`/trips/${tripId}`);
    setTrip(response.data.trip);
  } catch (error) {
    setError(error as Error);
  } finally {
    setIsLoading(false);
  }
}
```

### 6. Validação de Dados

Valide dados antes de enviar:

```typescript
import { z } from 'zod';

const createTripSchema = z.object({
  destination: z.string().min(3, 'Destino deve ter no mínimo 3 caracteres'),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  emails_to_invite: z.array(z.string().email()).min(1),
  owner_name: z.string().min(2),
  owner_email: z.string().email()
});

async function createTrip(data: unknown) {
  try {
    const validData = createTripSchema.parse(data);
    const response = await api.post('/trips', validData);
    return response.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Tratar erros de validação
      console.error('Dados inválidos:', error.errors);
    }
    throw error;
  }
}
```

### 7. Cache de Requisições

Implemente cache simples para evitar requisições duplicadas:

```typescript
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  
  return data;
}

// Uso
const trip = await fetchWithCache(
  `trip-${tripId}`,
  () => api.get(`/trips/${tripId}`).then(res => res.data.trip)
);
```

### 8. Transformação de Dados

Transforme dados da API para o formato esperado:

```typescript
interface ApiTrip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
}

interface Trip {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
}

function transformTrip(apiTrip: ApiTrip): Trip {
  return {
    id: apiTrip.id,
    destination: apiTrip.destination,
    startDate: new Date(apiTrip.starts_at),
    endDate: new Date(apiTrip.ends_at)
  };
}

async function fetchTrip(tripId: string): Promise<Trip> {
  const response = await api.get(`/trips/${tripId}`);
  return transformTrip(response.data.trip);
}
```

## 🔒 Segurança

### 1. Sanitização de Dados

Sempre sanitize dados do usuário:

```typescript
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, ''); // Remove caracteres perigosos
}

const destination = sanitizeInput(userInput);
```

### 2. Validação de URLs

Valide URLs antes de usar:

```typescript
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

if (!isValidUrl(linkUrl)) {
  addToast({
    type: 'error',
    message: 'URL inválida'
  });
  return;
}
```

### 3. Rate Limiting

Implemente rate limiting no frontend:

```typescript
class RateLimiter {
  private requests: number[] = [];
  
  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}
  
  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}

const limiter = new RateLimiter(10, 60000); // 10 requisições por minuto

async function fetchData() {
  if (!limiter.canMakeRequest()) {
    addToast({
      type: 'warning',
      message: 'Muitas requisições. Aguarde um momento.'
    });
    return;
  }
  
  const response = await api.get('/endpoint');
  return response.data;
}
```
