# 📁 Estrutura de Pastas - Frontend

Estrutura organizada seguindo padrões e boas práticas do mercado.

## 🏗️ Estrutura

```
src/
├── design-system/        # Sistema de design
│   ├── components/       # Componentes base
│   ├── tokens/          # Tokens de design
│   └── README.md
├── features/            # Features da aplicação
│   └── trips/           # Feature de viagens
│       ├── components/  # Componentes específicos
│       ├── pages/       # Páginas da feature
│       └── hooks/       # Hooks específicos
├── shared/              # Código compartilhado
│   ├── types/           # Interfaces TypeScript
│   ├── utils/           # Utilitários (API, helpers)
│   └── hooks/           # Hooks compartilhados
├── pages/               # Páginas principais (será migrado)
└── components/          # Componentes globais (será migrado)
```

## 📋 Padrões

### Features
- Cada feature tem sua própria pasta
- Componentes, páginas e hooks organizados por feature
- Facilita manutenção e escalabilidade

### Shared
- Código reutilizável entre features
- Types, utils e hooks compartilhados
- API e configurações globais

### Design System
- Componentes base padronizados
- Tokens de design centralizados
- Documentação própria

## 🔄 Migração

1. Mover componentes específicos para `features/trips/components/`
2. Mover páginas para `features/trips/pages/`
3. Atualizar imports para nova estrutura
4. Centralizar types em `shared/types/`