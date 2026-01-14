# Design System - Plann.er

Sistema de design baseado nos padrões existentes do projeto Plann.er.

## 🎨 Tokens

### Cores
- **Zinc**: Tons escuros para backgrounds e textos
- **Lime**: Cor de destaque para ações primárias
- **Black/60**: Overlay para modais

### Tipografia
- **Font Family**: Inter
- **Sizes**: sm (14px), md (16px), lg (18px)
- **Weights**: medium (500), semibold (600)

### Espaçamentos
- Sistema baseado em rem seguindo padrões do Tailwind
- Border radius: md, lg, xl

## 🧩 Componentes

### Button
```tsx
<Button variant="primary" size="full">
  Salvar
</Button>
```

### Modal
```tsx
<Modal 
  isOpen={true} 
  onClose={() => {}} 
  title="Título" 
  description="Descrição"
>
  Conteúdo
</Modal>
```

### Input
```tsx
<Input 
  icon={<AtSign />} 
  placeholder="Email" 
  type="email" 
/>
```

### Tag
```tsx
<Tag 
  variant="existing" 
  onRemove={() => {}}
>
  email@example.com
</Tag>
```

### Notification
```tsx
<Notification variant="success">
  Operação realizada com sucesso!
</Notification>
```

### Divider
```tsx
<Divider />
```

## 📦 Uso

```tsx
import { Button, Modal, Input } from '../../design-system';
```

## 🔄 Migração

Para migrar componentes existentes:

1. Substitua imports individuais pelo design system
2. Use os componentes padronizados
3. Mantenha a funcionalidade existente
4. Aproveite as variants para customização