# 🚀 Guia de Início Rápido

Guia prático para começar a desenvolver no frontend do Plann.er.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Editor de código (recomendado: VS Code)
- Backend rodando em `http://localhost:3333`

## ⚡ Setup Inicial

### 1. Instalar Dependências

```bash
cd front-planner
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3333
```

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🎯 Primeiros Passos

### Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── routes.tsx         # Definição de rotas
│   └── providers.tsx      # Providers globais
│
├── design-system/         # Sistema de design
│   ├── components/ui/     # Componentes base
│   └── tokens/            # Design tokens
│
├── features/              # Features por domínio
│   └── trips/            # Feature de viagens
│       ├── components/   # Componentes específicos
│       ├── hooks/        # Custom hooks
│       ├── modals/       # Modais
│       ├── pages/        # Páginas
│       ├── services/     # API calls
│       └── types/        # Tipos TypeScript
│
└── shared/               # Código compartilhado
    ├── hooks/           # Hooks reutilizáveis
    ├── utils/           # Utilitários
    └── types/           # Tipos compartilhados
```

## 🛠️ Tarefas Comuns

### Criar um Novo Componente

1. Crie o arquivo em `design-system/components/ui/` ou `features/[feature]/components/`

```tsx
// design-system/components/ui/card.tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
```

2. Exporte no `index.ts`

```tsx
// design-system/components/ui/index.ts
export { Card } from './card';
```

3. Use o componente

```tsx
import { Card } from '@/design-system';

<Card title="Meu Card">
  <p>Conteúdo do card</p>
</Card>
```

### Adicionar uma Nova Página

1. Crie o componente da página

```tsx
// features/trips/pages/MyNewPage.tsx
export function MyNewPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">Minha Nova Página</h1>
    </div>
  );
}
```

2. Adicione a rota

```tsx
// app/routes.tsx
import { MyNewPage } from '@/features/trips/pages/MyNewPage';

const router = createBrowserRouter([
  // ... rotas existentes
  {
    path: "/my-new-page",
    element: <MyNewPage />,
  },
]);
```

### Fazer uma Chamada à API

1. Use o cliente Axios configurado

```tsx
import { api } from '@/shared/utils/api';
import { useToast } from '@/design-system';

export function MyComponent() {
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchData() {
    setIsLoading(true);
    
    try {
      const response = await api.get('/endpoint');
      setData(response.data);
      
      addToast({
        type: 'success',
        title: 'Sucesso!',
        message: 'Dados carregados com sucesso.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível carregar os dados.'
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  
  if (isLoading) return <div>Carregando...</div>;
  
  return <div>{/* Renderizar dados */}</div>;
}
```

### Criar um Custom Hook

1. Crie o hook

```tsx
// features/trips/hooks/useMyHook.ts
import { useState, useEffect } from 'react';
import { api } from '@/shared/utils/api';

export function useMyHook(param: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/endpoint/${param}`);
        setData(response.data);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [param]);
  
  return { data, isLoading };
}
```

2. Use o hook

```tsx
import { useMyHook } from '@/features/trips/hooks/useMyHook';

export function MyComponent() {
  const { data, isLoading } = useMyHook('param-value');
  
  if (isLoading) return <div>Carregando...</div>;
  
  return <div>{/* Usar data */}</div>;
}
```

### Adicionar um Modal

1. Crie o componente do modal

```tsx
// features/trips/modals/MyModal.tsx
import { Modal, Button, Input } from '@/design-system';
import { useState } from 'react';

interface MyModalProps {
  closeModal: () => void;
}

export function MyModal({ closeModal }: MyModalProps) {
  const [value, setValue] = useState('');
  
  function handleSubmit() {
    // Lógica de submit
    closeModal();
  }
  
  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      title="Meu Modal"
      description="Descrição do modal"
    >
      <div className="space-y-3">
        <Input
          placeholder="Digite algo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        
        <Button variant="primary" size="full" onClick={handleSubmit}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}
```

2. Use o modal

```tsx
import { useState } from 'react';
import { MyModal } from './modals/MyModal';

export function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Abrir Modal
      </button>
      
      {isModalOpen && (
        <MyModal closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
```

## 🎨 Usando o Design System

### Botões

```tsx
import { Button } from '@/design-system';

// Botão primário
<Button variant="primary" onClick={handleClick}>
  Confirmar
</Button>

// Botão secundário
<Button variant="secondary" onClick={handleClick}>
  Cancelar
</Button>

// Botão de perigo
<Button variant="danger" onClick={handleDelete}>
  Remover
</Button>

// Botão full width
<Button variant="primary" size="full">
  Salvar
</Button>

// Botão desabilitado
<Button disabled={isLoading}>
  {isLoading ? 'Carregando...' : 'Enviar'}
</Button>
```

### Inputs

```tsx
import { Input } from '@/design-system';
import { Mail, MapPin } from 'lucide-react';

// Input simples
<Input
  type="text"
  placeholder="Digite algo"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Input com ícone
<Input
  icon={<Mail className="size-5" />}
  type="email"
  placeholder="Digite seu email"
/>

// Input desabilitado
<Input
  disabled
  placeholder="Campo desabilitado"
/>
```

### Notificações (Toast)

```tsx
import { useToast } from '@/design-system';

const { addToast } = useToast();

// Sucesso
addToast({
  type: 'success',
  title: 'Sucesso!',
  message: 'Operação realizada com sucesso.'
});

// Erro
addToast({
  type: 'error',
  title: 'Erro',
  message: 'Algo deu errado.'
});

// Aviso
addToast({
  type: 'warning',
  title: 'Atenção',
  message: 'Verifique os dados.'
});

// Info
addToast({
  type: 'info',
  title: 'Informação',
  message: 'Dados atualizados.'
});
```

### Tags

```tsx
import { Tag } from '@/design-system';

<Tag variant="success">Confirmado</Tag>
<Tag variant="pending">Pendente</Tag>
<Tag variant="default">Organizador</Tag>
```

## 🐛 Debug e Troubleshooting

### React DevTools

Instale a extensão React DevTools no navegador para inspecionar componentes.

### Console Logs

Use console.log estrategicamente:

```tsx
console.log('Estado atual:', state);
console.log('Props recebidas:', props);
console.log('Resposta da API:', response.data);
```

### Erros Comuns

#### Erro: "Cannot read property of undefined"

**Causa:** Tentando acessar propriedade de objeto nulo/undefined

**Solução:** Use optional chaining
```tsx
// ❌ Evitar
const name = user.name;

// ✅ Usar
const name = user?.name;
```

#### Erro: "Hook called outside of component"

**Causa:** Hooks sendo chamados fora de componentes React

**Solução:** Mova o hook para dentro do componente
```tsx
// ❌ Evitar
const { addToast } = useToast();

export function MyComponent() {
  // ...
}

// ✅ Usar
export function MyComponent() {
  const { addToast } = useToast();
  // ...
}
```

#### Erro: "Too many re-renders"

**Causa:** Estado sendo atualizado infinitamente

**Solução:** Verifique dependências do useEffect
```tsx
// ❌ Evitar
useEffect(() => {
  setState(newValue); // Causa loop infinito
});

// ✅ Usar
useEffect(() => {
  setState(newValue);
}, [dependency]); // Adicione dependências
```

## 📚 Recursos Úteis

### Documentação

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/en/main)

### Extensões VS Code Recomendadas

- **ES7+ React/Redux/React-Native snippets** - Snippets úteis
- **Tailwind CSS IntelliSense** - Autocomplete para Tailwind
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Auto Rename Tag** - Renomear tags HTML
- **Path Intellisense** - Autocomplete de paths

### Atalhos Úteis

```bash
# Criar componente rapidamente (snippet)
rfc + Tab  # React Function Component

# Importar automaticamente
Ctrl + Space  # Autocomplete de imports

# Formatar código
Shift + Alt + F  # Formatar documento

# Renomear símbolo
F2  # Renomear em todos os arquivos
```

## 🎯 Próximos Passos

1. ✅ Explore a [documentação completa](./README.md)
2. ✅ Leia sobre o [Design System](./design-system.md)
3. ✅ Entenda a [Feature Trips](./features/trips.md)
4. ✅ Pratique criando componentes simples
5. ✅ Contribua com melhorias!

## 💡 Dicas de Produtividade

### 1. Use Snippets

Crie snippets personalizados no VS Code para componentes frequentes.

### 2. Organize Imports

Use imports absolutos com `@/`:
```tsx
import { Button } from '@/design-system';
import { useTrips } from '@/features/trips/hooks/useTrips';
```

### 3. Componentes Pequenos

Mantenha componentes focados e pequenos (< 200 linhas).

### 4. Reutilize Código

Extraia lógica repetida para hooks customizados.

### 5. Teste no Navegador

Use React DevTools e console do navegador para debug.

## 🤝 Contribuindo

1. Siga os padrões de código existentes
2. Use TypeScript para tipagem
3. Documente componentes complexos
4. Teste suas alterações
5. Faça commits descritivos

---

**Pronto para começar!** 🚀

Se tiver dúvidas, consulte a [documentação completa](./README.md) ou peça ajuda à equipe.
