# 🎨 Design System

Sistema de design completo do Plann.er, com componentes reutilizáveis e tokens de design consistentes.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Design Tokens](#design-tokens)
- [Componentes UI](#componentes-ui)
- [Uso e Exemplos](#uso-e-exemplos)

## 🎯 Visão Geral

O Design System do Plann.er foi construído para garantir consistência visual e facilitar o desenvolvimento de novas features. Todos os componentes são:

- **Acessíveis**: Seguem padrões de acessibilidade
- **Tipados**: TypeScript para segurança de tipos
- **Reutilizáveis**: Podem ser usados em qualquer parte da aplicação
- **Consistentes**: Seguem os design tokens definidos

## 🎨 Design Tokens

### Colors

Paleta de cores baseada em Zinc com suporte a tema escuro.

```typescript
export const colors = {
  // Background
  background: '#09090b',      // zinc-950
  surface: '#18181b',         // zinc-900
  
  // Borders
  border: '#27272a',          // zinc-800
  
  // Text
  textPrimary: '#fafafa',     // zinc-50
  textSecondary: '#a1a1aa',   // zinc-400
  
  // Brand
  primary: '#bef264',         // lime-300
  primaryHover: '#a3e635',    // lime-400
  
  // Status
  success: '#22c55e',         // green-500
  error: '#ef4444',           // red-500
  warning: '#f59e0b',         // amber-500
  info: '#3b82f6',            // blue-500
}
```

### Spacing

Sistema de espaçamento baseado em múltiplos de 4px.

```typescript
export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
}
```

### Typography

Hierarquia tipográfica consistente.

```typescript
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
}
```

### Shadows

Sombras para elevação e profundidade.

```typescript
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  shape: '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1)',
}
```

## 🧩 Componentes UI

### Button

Botão com variantes e tamanhos.

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'default' | 'full';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Variantes:**
- `primary` - Ação principal (fundo lime-300)
- `secondary` - Ação secundária (fundo zinc-800)
- `danger` - Ação destrutiva (fundo red-500)

**Exemplo:**
```tsx
<Button variant="primary" onClick={handleSubmit}>
  Confirmar viagem
</Button>

<Button variant="secondary" size="full">
  Cancelar
</Button>

<Button variant="danger" disabled={isLoading}>
  Remover
</Button>
```

### Input

Campo de entrada com suporte a ícones.

**Props:**
```typescript
interface InputProps {
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
```

**Exemplo:**
```tsx
<Input
  icon={<MapPin className="size-5" />}
  type="text"
  placeholder="Para onde você vai?"
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
/>

<Input
  icon={<Mail className="size-5" />}
  type="email"
  placeholder="Digite o e-mail do convidado"
/>
```

### Modal

Modal acessível com overlay.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}
```

**Exemplo:**
```tsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Cadastrar atividade"
  description="Todos os convidados podem visualizar as atividades."
>
  <div className="space-y-3">
    {/* Conteúdo do modal */}
  </div>
</Modal>
```

**Características:**
- Fecha ao clicar no overlay
- Fecha com tecla ESC
- Previne scroll do body quando aberto
- Animação de entrada/saída

### Toast

Sistema de notificações temporárias.

**Hook useToast:**
```typescript
const { addToast } = useToast();

addToast({
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string,
  duration?: number  // padrão: 5000ms
});
```

**Exemplo:**
```tsx
// Sucesso
addToast({
  type: 'success',
  title: 'Viagem criada!',
  message: 'Sua viagem foi criada com sucesso.'
});

// Erro
addToast({
  type: 'error',
  title: 'Erro ao salvar',
  message: 'Não foi possível salvar as alterações.'
});

// Aviso
addToast({
  type: 'warning',
  title: 'Atenção',
  message: 'Preencha todos os campos obrigatórios.'
});
```

**Características:**
- Posicionado no topo direito
- Auto-dismiss após 5 segundos
- Empilhamento de múltiplos toasts
- Ícones por tipo
- Animação de entrada/saída

### Tag

Tag para exibir status ou categorias.

**Props:**
```typescript
interface TagProps {
  variant?: 'default' | 'success' | 'pending';
  children: React.ReactNode;
}
```

**Exemplo:**
```tsx
<Tag variant="success">Confirmado</Tag>
<Tag variant="pending">Pendente</Tag>
<Tag variant="default">Organizador</Tag>
```

### Notification

Notificação inline para mensagens importantes.

**Props:**
```typescript
interface NotificationProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  message: string;
}
```

**Exemplo:**
```tsx
<Notification
  type="info"
  title="Importante"
  message="Todos os convidados podem visualizar as atividades."
/>

<Notification
  type="warning"
  message="Você precisa confirmar sua presença na viagem."
/>
```

### Divider

Separador visual entre seções.

**Exemplo:**
```tsx
<Divider />
```

## 📦 Uso e Exemplos

### Importação

Todos os componentes podem ser importados do design-system:

```tsx
import { 
  Button, 
  Input, 
  Modal, 
  useToast,
  Tag,
  Notification,
  Divider 
} from '@/design-system';
```

### Exemplo Completo: Formulário com Modal

```tsx
import { useState } from 'react';
import { Button, Input, Modal, useToast } from '@/design-system';
import { Mail } from 'lucide-react';

export function InviteGuestForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  async function handleSubmit() {
    if (!email) {
      addToast({
        type: 'error',
        title: 'Campo obrigatório',
        message: 'Por favor, digite um e-mail.'
      });
      return;
    }

    try {
      // Lógica de envio
      addToast({
        type: 'success',
        title: 'Convite enviado!',
        message: `Convite enviado para ${email}`
      });
      setIsOpen(false);
      setEmail('');
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao enviar',
        message: 'Não foi possível enviar o convite.'
      });
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Convidar pessoa
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Convidar pessoa"
        description="Digite o e-mail da pessoa que você deseja convidar."
      >
        <div className="space-y-3">
          <Input
            icon={<Mail className="size-5" />}
            type="email"
            placeholder="Digite o e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Button variant="primary" size="full" onClick={handleSubmit}>
            Enviar convite
          </Button>
        </div>
      </Modal>
    </>
  );
}
```

## 🎯 Boas Práticas

### 1. Use os Componentes do Design System

❌ **Evite:**
```tsx
<button className="bg-lime-300 text-lime-950 px-4 py-2 rounded-lg">
  Confirmar
</button>
```

✅ **Prefira:**
```tsx
<Button variant="primary">
  Confirmar
</Button>
```

### 2. Feedback ao Usuário

Sempre forneça feedback para ações do usuário:

```tsx
async function handleAction() {
  try {
    await api.post('/endpoint');
    addToast({
      type: 'success',
      title: 'Sucesso!',
      message: 'Ação realizada com sucesso.'
    });
  } catch {
    addToast({
      type: 'error',
      title: 'Erro',
      message: 'Não foi possível realizar a ação.'
    });
  }
}
```

### 3. Estados de Loading

Desabilite botões durante operações assíncronas:

```tsx
<Button 
  variant="primary" 
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Salvando...' : 'Salvar'}
</Button>
```

### 4. Acessibilidade

- Use labels descritivos
- Forneça feedback visual e textual
- Garanta navegação por teclado
- Use cores com contraste adequado

## 🔄 Extensão

Para adicionar novos componentes ao Design System:

1. Crie o componente em `design-system/components/ui/`
2. Exporte em `design-system/components/ui/index.ts`
3. Documente props e exemplos
4. Siga os design tokens existentes
5. Garanta acessibilidade
