# 📚 Índice da Documentação

Navegação rápida por toda a documentação do frontend Plann.er.

## 🎯 Por Onde Começar?

### 👋 Novo no Projeto?
Comece por aqui:
1. **[🚀 Guia de Início Rápido](./quick-start.md)** - Setup e primeiros passos
2. **[📖 Documentação Principal](./README.md)** - Visão geral da arquitetura
3. **[🎨 Design System](./design-system.md)** - Componentes disponíveis

### 💻 Desenvolvedor Experiente?
Vá direto para:
- **[🗺️ Feature: Trips](./features/trips.md)** - Documentação completa da feature
- **[🔌 Serviços](./services.md)** - API e comunicação
- **[🪝 Hooks](./hooks.md)** - Custom hooks

## 📑 Documentação Completa

### 📖 Fundamentos

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[README.md](./README.md)** | Visão geral, arquitetura e guias | Entender a estrutura do projeto |
| **[quick-start.md](./quick-start.md)** | Setup inicial e tarefas comuns | Começar a desenvolver rapidamente |

### 🎨 Design e UI

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[design-system.md](./design-system.md)** | Componentes UI e design tokens | Criar interfaces consistentes |
| **[components.md](./components.md)** | Guia de componentes e padrões | Criar ou usar componentes |

### 🛠️ Desenvolvimento

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[hooks.md](./hooks.md)** | Custom hooks e padrões | Criar lógica reutilizável |
| **[services.md](./services.md)** | API, endpoints e comunicação | Integrar com backend |

### 🗺️ Features

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[features/trips.md](./features/trips.md)** | Feature completa de viagens | Trabalhar com viagens |

## 🔍 Busca Rápida

### Por Tópico

#### 🎨 Design System
- [Componentes disponíveis](./design-system.md#componentes-ui)
- [Design tokens](./design-system.md#design-tokens)
- [Cores](./design-system.md#colors)
- [Tipografia](./design-system.md#typography)
- [Espaçamento](./design-system.md#spacing)

#### 🧩 Componentes
- [Button](./design-system.md#button)
- [Input](./design-system.md#input)
- [Modal](./design-system.md#modal)
- [Toast](./design-system.md#toast)
- [Tag](./design-system.md#tag)
- [Notification](./design-system.md#notification)

#### 🪝 Hooks
- [useToast](./hooks.md#usetoast)
- [useTrips](./hooks.md#usetrips)
- [useActivities](./hooks.md#useactivities)
- [useDebounce](./hooks.md#usedebounce)
- [Criar custom hook](./hooks.md#criando-custom-hooks)

#### 🔌 API
- [Configuração](./services.md#configuração)
- [Endpoints de Trips](./services.md#trips-viagens)
- [Endpoints de Participants](./services.md#participants-participantes)
- [Endpoints de Activities](./services.md#activities-atividades)
- [Endpoints de Links](./services.md#links)
- [Tratamento de erros](./services.md#tratamento-de-erros)

#### 🗺️ Feature: Trips
- [Páginas](./features/trips.md#páginas)
- [Componentes](./features/trips.md#componentes)
- [Modais](./features/trips.md#modais)
- [Fluxos de uso](./features/trips.md#fluxos-de-uso)

### Por Tarefa

#### Criar Novo...
- [Componente](./quick-start.md#criar-um-novo-componente)
- [Página](./quick-start.md#adicionar-uma-nova-página)
- [Hook](./quick-start.md#criar-um-custom-hook)
- [Modal](./quick-start.md#adicionar-um-modal)

#### Usar...
- [Design System](./quick-start.md#usando-o-design-system)
- [Botões](./quick-start.md#botões)
- [Inputs](./quick-start.md#inputs)
- [Notificações](./quick-start.md#notificações-toast)
- [Tags](./quick-start.md#tags)

#### Integrar...
- [API](./quick-start.md#fazer-uma-chamada-à-api)
- [Endpoints](./services.md#endpoints)
- [Tratamento de erros](./services.md#tratamento-de-erros)

## 📊 Estrutura Visual

```
📁 Plann.er Frontend
│
├── 📖 README.md ..................... Visão geral e arquitetura
├── 🚀 quick-start.md ................ Setup e primeiros passos
│
├── 🎨 Design
│   ├── design-system.md ............. Componentes e tokens
│   └── components.md ................ Guia de componentes
│
├── 🛠️ Desenvolvimento
│   ├── hooks.md ..................... Custom hooks
│   └── services.md .................. API e serviços
│
└── 🗺️ Features
    └── trips.md ..................... Feature de viagens
```

## 🎯 Fluxos de Trabalho

### 1. Criar Nova Feature

```
1. Leia: README.md > "Adicionando uma Nova Feature"
2. Estruture: features/[nome-feature]/
3. Crie: components/, hooks/, services/, types/
4. Documente: Adicione à documentação
```

### 2. Adicionar Componente ao Design System

```
1. Leia: design-system.md > "Extensão"
2. Crie: design-system/components/ui/[componente].tsx
3. Exporte: design-system/components/ui/index.ts
4. Documente: Adicione ao design-system.md
```

### 3. Integrar com API

```
1. Leia: services.md > "Endpoints"
2. Configure: shared/utils/api.ts
3. Crie: services/[feature].service.ts
4. Use: Em hooks ou componentes
```

### 4. Criar Custom Hook

```
1. Leia: hooks.md > "Criando Custom Hooks"
2. Crie: features/[feature]/hooks/use[Nome].ts
3. Teste: Em componente
4. Documente: Se for reutilizável
```

## 🔗 Links Externos Úteis

### Tecnologias
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/en/main)
- [Axios Docs](https://axios-http.com/docs/intro)

### Bibliotecas
- [Lucide Icons](https://lucide.dev/icons/)
- [React Day Picker](https://react-day-picker.js.org/)
- [date-fns](https://date-fns.org/docs/Getting-Started)

### Ferramentas
- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 📝 Convenções

### Nomenclatura
- **Componentes:** PascalCase (ex: `TripHeader`)
- **Arquivos:** PascalCase (ex: `TripHeader.tsx`)
- **Hooks:** camelCase com `use` (ex: `useTrips`)
- **Funções:** camelCase (ex: `handleClick`)
- **Constantes:** UPPER_SNAKE_CASE (ex: `API_URL`)

### Estrutura de Arquivos
```tsx
// 1. Imports
import { useState } from 'react';
import { Button } from '@/design-system';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Component
export function MyComponent({ title }: MyComponentProps) {
  // 3.1. Hooks
  const [state, setState] = useState();
  
  // 3.2. Handlers
  function handleClick() {}
  
  // 3.3. Effects
  useEffect(() => {}, []);
  
  // 3.4. Render
  return <div>{title}</div>;
}
```

## 🆘 Precisa de Ajuda?

### Por Tipo de Problema

| Problema | Onde Procurar |
|----------|---------------|
| Setup inicial | [quick-start.md](./quick-start.md) |
| Componente não funciona | [components.md](./components.md) |
| Erro na API | [services.md](./services.md#tratamento-de-erros) |
| Hook não funciona | [hooks.md](./hooks.md#boas-práticas) |
| Estilo não aplica | [design-system.md](./design-system.md) |
| Erro de TypeScript | Verifique tipos em `/types` |

### Debug Checklist

- [ ] Li a documentação relevante?
- [ ] Verifiquei os exemplos de código?
- [ ] Consultei as boas práticas?
- [ ] Revisei erros comuns?
- [ ] Testei em ambiente limpo?

## 🎓 Aprendizado Progressivo

### Nível 1: Iniciante
1. ✅ [Guia de Início Rápido](./quick-start.md)
2. ✅ [Design System - Componentes Básicos](./design-system.md#componentes-ui)
3. ✅ [Criar Primeiro Componente](./quick-start.md#criar-um-novo-componente)

### Nível 2: Intermediário
1. ✅ [Arquitetura do Projeto](./README.md#arquitetura)
2. ✅ [Custom Hooks](./hooks.md)
3. ✅ [Integração com API](./services.md)

### Nível 3: Avançado
1. ✅ [Feature Completa: Trips](./features/trips.md)
2. ✅ [Padrões de Componentes](./components.md#padrões-de-componentes)
3. ✅ [Boas Práticas Avançadas](./hooks.md#boas-práticas)

---

**Última atualização:** Janeiro 2025

**Contribua:** Encontrou algo desatualizado? Abra uma issue ou PR!
