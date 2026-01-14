# 📱 Plann.er Frontend - Documentação

Documentação completa do frontend da aplicação Plann.er, uma plataforma de planejamento colaborativo de viagens.

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Design System](#design-system)
5. [Features](#features)
6. [Fluxo da Aplicação](#fluxo-da-aplicação)
7. [Guias de Desenvolvimento](#guias-de-desenvolvimento)

## 🎯 Visão Geral

O frontend do Plann.er é uma aplicação React moderna construída com TypeScript, focada em proporcionar uma experiência fluida para planejamento de viagens colaborativas.

### Tecnologias Principais

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **React Day Picker** - Seleção de datas
- **Lucide React** - Ícones

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular baseada em features, com separação clara de responsabilidades:

```
src/
├── app/                    # Configuração da aplicação
├── design-system/          # Sistema de design reutilizável
├── features/               # Features organizadas por domínio
├── shared/                 # Código compartilhado
└── styles/                 # Estilos globais
```

### Princípios Arquiteturais

1. **Feature-Based**: Código organizado por funcionalidade, não por tipo de arquivo
2. **Component Composition**: Componentes pequenos e reutilizáveis
3. **Separation of Concerns**: Lógica de negócio separada da apresentação
4. **Type Safety**: TypeScript em todo o código
5. **Design System**: Componentes UI consistentes e reutilizáveis

## 📁 Estrutura de Pastas

### `/src/app`
Configuração central da aplicação.

- `main.tsx` - Entry point da aplicação
- `App.tsx` - Componente raiz
- `routes.tsx` - Definição de rotas
- `providers.tsx` - Providers globais (Toast, Router)

### `/src/design-system`
Sistema de design completo e documentado.

```
design-system/
├── components/ui/          # Componentes UI base
│   ├── button.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   ├── toast.tsx
│   └── ...
└── tokens/                 # Design tokens
    ├── colors.ts
    ├── spacing.ts
    ├── typography.ts
    └── shadows.ts
```

[Ver documentação completa do Design System](./design-system.md)

### `/src/features/trips`
Feature principal da aplicação - gerenciamento de viagens.

```
trips/
├── components/             # Componentes específicos
├── hooks/                  # Custom hooks
├── modals/                 # Modais da feature
├── pages/                  # Páginas
├── services/               # Comunicação com API
├── types/                  # Tipos TypeScript
└── styles/                 # Estilos específicos
```

[Ver documentação completa da Feature Trips](./features/trips.md)

### `/src/shared`
Código compartilhado entre features.

- `hooks/` - Hooks reutilizáveis (useDebounce)
- `utils/` - Utilitários (configuração Axios)
- `types/` - Tipos compartilhados

## 🎨 Design System

O Plann.er possui um design system completo com componentes reutilizáveis e tokens de design.

### Componentes Disponíveis

- **Button** - Botões com variantes (primary, secondary, danger)
- **Input** - Campos de entrada com ícones
- **Modal** - Modais acessíveis
- **Toast** - Notificações temporárias
- **Tag** - Tags de status
- **Divider** - Separadores visuais
- **Notification** - Notificações inline

### Design Tokens

- **Colors** - Paleta de cores baseada em Zinc
- **Spacing** - Sistema de espaçamento consistente
- **Typography** - Hierarquia tipográfica
- **Shadows** - Sombras e elevações

[Ver documentação completa do Design System](./design-system.md)

## ✨ Features

### Trips (Viagens)

Feature principal que gerencia todo o ciclo de vida de uma viagem.

**Funcionalidades:**
- Criação de viagens com destino e datas
- Convite de participantes por email
- Confirmação de viagem
- Gerenciamento de atividades
- Links importantes
- Atualização de informações da viagem
- Remoção de participantes

[Ver documentação completa da Feature Trips](./features/trips.md)

## 🔄 Fluxo da Aplicação

### 1. Criação de Viagem

```
CreateTripPage
├── DestinationAndDateStep (destino + datas)
└── InviteGuestsStep (convite de participantes)
    └── ConfirmTripModal (confirmação e email do criador)
        → Redireciona para TripDetailsPage
```

### 2. Detalhes da Viagem

```
TripDetailsPage
├── TripHeader (informações + ações)
│   ├── UpdateTripModal
│   └── ManageGuestsModal
│       ├── InviteGuestsModal
│       └── ConfirmRemoveParticipantModal
├── ActivitiesList
│   └── CreateActivityModal
├── ImportantLinks
│   └── CreateLinkModal
└── GuestsList
```

### 3. Fluxo de Dados

```
Componente → Hook → Service → API
                ↓
            Toast (feedback)
```

## 🛠️ Guias de Desenvolvimento

### Adicionando uma Nova Feature

1. Crie a estrutura de pastas em `/src/features/[nome-feature]`
2. Organize em: `components/`, `hooks/`, `services/`, `types/`, `pages/`
3. Exporte através de `index.ts`
4. Adicione rotas em `app/routes.tsx`

### Criando um Novo Componente

1. Use TypeScript para props
2. Siga o padrão de nomenclatura PascalCase
3. Exporte através de `index.ts`
4. Documente props complexas

```tsx
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return <div>{title}</div>;
}
```

### Comunicação com API

Use o serviço configurado em `shared/utils/api.ts`:

```tsx
import { api } from '@/shared/utils/api';

const response = await api.get('/endpoint');
const data = await api.post('/endpoint', payload);
```

### Gerenciamento de Estado

- **Estado Local**: `useState` para estado de componente
- **Estado Compartilhado**: Custom hooks (ex: `useTrips`)
- **Cache de Dados**: Hooks com lógica de fetch

### Notificações

Use o hook `useToast` para feedback ao usuário:

```tsx
import { useToast } from '@/design-system';

const { addToast } = useToast();

addToast({
  type: 'success',
  title: 'Sucesso!',
  message: 'Operação realizada com sucesso.'
});
```

### Estilização

- Use Tailwind CSS para estilos
- Siga os tokens do design system
- Classes customizadas em arquivos `.css` quando necessário

### Validação

- Validação no frontend para UX
- Backend valida com Zod (fonte da verdade)
- Feedback imediato ao usuário

## 📖 Documentação Adicional

- [Design System](./design-system.md)
- [Feature: Trips](./features/trips.md)
- [Componentes](./components.md)
- [Hooks](./hooks.md)
- [Serviços](./services.md)

## 🔗 Links Úteis

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev/guide/)
