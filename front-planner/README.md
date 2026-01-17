# 🎨 Plann.er Frontend

Interface moderna e responsiva para planejamento colaborativo de viagens, construída com React 19 e Tailwind CSS.

## 🚀 Stack Tecnológica

- **React 19** - Biblioteca UI com recursos mais recentes
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento SPA
- **Axios** - Cliente HTTP
- **Lucide React** - Biblioteca de ícones
- **React Day Picker** - Componente de calendário
- **Tailwind Variants** - Variantes de componentes
- **Tailwind Merge** - Merge de classes CSS

## 🎯 Funcionalidades

### 🏠 Página Inicial (Criação de Viagem)
- **Formulário em etapas** para criação de viagens
- **Seleção de destino e datas** com validação
- **Sistema de convites** para participantes
- **Modal de confirmação** com resumo da viagem

### 🧳 Página de Detalhes da Viagem
- **Header informativo** com destino e período
- **Gerenciamento de atividades** por data
- **Lista de participantes** com status
- **Links importantes** organizados
- **Modais interativos** para criação de conteúdo

### ✅ Página de Confirmação de Presença
- **Confirmação via link do email** enviado aos participantes
- **Interface responsiva** com feedback visual
- **Estados de loading** com spinner animado
- **Tratamento de erros** para casos edge
- **Redirecionamento automático** após confirmação
- **Verificação de status** para participantes já confirmados

## 🎨 Design System

### Componentes Base
- **Button** - Componente de botão com variantes
- **Modals** - Sistema de modais reutilizáveis
- **Forms** - Formulários com validação
- **Date Picker** - Seletor de datas customizado

### Padrões Visuais
- **Cores** - Paleta consistente com tons de verde
- **Tipografia** - Hierarquia clara e legível
- **Espaçamentos** - Sistema baseado em Tailwind
- **Responsividade** - Mobile-first approach
- **Animações** - Transições suaves

## 📱 Páginas e Rotas

```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
  {
    path: "/participants/:participantId/confirm",
    element: <ConfirmParticipantPage />,
  },
]);
```

### `/` - Criação de Viagem
- **Step 1**: Destino e período da viagem
- **Step 2**: Lista de convidados
- **Modal**: Confirmação e finalização

### `/trips/:tripId` - Detalhes da Viagem
- **Header**: Informações da viagem
- **Atividades**: Cronograma por data
- **Participantes**: Lista com confirmações
- **Links**: Recursos importantes

### `/participants/:participantId/confirm` - Confirmação de Presença
- **Página dedicada** para confirmação via link do email
- **Estados visuais** de loading, sucesso e erro
- **Redirecionamento automático** para a página da viagem
- **Feedback em tempo real** do processo de confirmação

## 🛠️ Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   └── button.tsx    # Componente de botão base
├── pages/            # Páginas da aplicação
│   ├── create-trip/  # Página de criação
│   │   ├── index.tsx
│   │   ├── confirm-trip-modal.tsx
│   │   ├── invite-guests-modal.tsx
│   │   └── steps/    # Etapas do formulário
│   │       ├── destination-and-date-step.tsx
│   │       ├── invite-guests-step.tsx
│   │       └── date-picker.css
│   ├── trip-details/ # Página de detalhes
│   │   ├── index.tsx
│   │   ├── activities.tsx
│   │   ├── create-activity-modal.tsx
│   │   ├── destination-and-date-header.tsx
│   │   ├── guests.tsx
│   │   └── important-links.tsx
│   └── confirm-participant/ # Página de confirmação
│       └── index.tsx
├── lib/              # Configurações
│   └── axios.ts      # Cliente HTTP
├── app.tsx           # Configuração de rotas
├── main.tsx          # Entry point
└── globals.css       # Estilos globais
```

## 🎨 Customização do Tailwind

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cores customizadas do projeto
      },
      fontFamily: {
        // Fontes personalizadas
      }
    }
  }
}
```

## 📦 Dependências Principais

### Produção
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.11.0",
  "axios": "^1.13.2",
  "tailwindcss": "^4.1.18",
  "lucide-react": "^0.562.0",
  "react-day-picker": "^9.13.0"
}
```

### Desenvolvimento
```json
{
  "vite": "^7.2.4",
  "typescript": "~5.9.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1"
}
```

## 🔧 Configuração do Vite

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
})
```

## 📱 Responsividade

- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints** - Sistema responsivo do Tailwind
- **Touch Friendly** - Elementos adequados para toque
- **Performance** - Otimizado para diferentes dispositivos

## 🎯 UX/UI Features

- **Loading States** - Feedback visual durante carregamento
- **Error Handling** - Tratamento elegante de erros
- **Form Validation** - Validação em tempo real
- **Smooth Transitions** - Animações fluidas
- **Accessibility** - Componentes acessíveis

## 📚 Documentação Completa

Para informações detalhadas sobre a arquitetura, componentes e desenvolvimento, consulte a documentação completa:

- **[📖 Documentação Principal](./docs/README.md)** - Visão geral e arquitetura
- **[🎨 Design System](./docs/design-system.md)** - Componentes e tokens de design
- **[🗺️ Feature: Trips](./docs/features/trips.md)** - Documentação da feature de viagens
- **[🧩 Componentes](./docs/components.md)** - Guia de componentes
- **[🪝 Hooks](./docs/hooks.md)** - Custom hooks e padrões
- **[🔌 Serviços](./docs/services.md)** - API e comunicação

### Guias Rápidos

- [Como adicionar uma nova feature](./docs/README.md#adicionando-uma-nova-feature)
- [Como criar um novo componente](./docs/README.md#criando-um-novo-componente)
- [Como usar o sistema de notificações](./docs/design-system.md#toast)
- [Como fazer chamadas à API](./docs/services.md#endpoints)