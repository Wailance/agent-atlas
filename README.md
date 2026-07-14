# Ворончихин Евгений — каталог OSS

Личный каталог open-source проектов на GitHub. Поиск, фильтры, сравнение до 3 репозиториев.

## Быстрый старт

```bash
cd agent-atlas
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Источник данных

**Только GitHub.** У каждого проекта поле `pricing`: `free`, `freemium` или `paid`. На главной — вкладки **Все / Бесплатные / Freemium+Платные** (freemium = self-host бесплатно, cloud/enterprise платно).

## Структура

```
data/
  tools.json       # основной каталог
  pending.json     # очередь repo на review перед добавлением
  taxonomy.json    # категории
  seed-repos.json  # начальный bulk-import (разовый seed)
scripts/
  import-repos.ts      # bulk-import списка GitHub repo
  enrich-github.ts     # обогащение через GitHub API
  validate-tools.ts    # проверка схемы
```

## Добавить проект

1. Добавьте запись в `data/tools.json`:

```json
{
  "id": "my-tool",
  "name": "My Tool",
  "repo": "owner/repo",
  "url": "https://github.com/owner/repo",
  "description": {
    "ru": "Описание на русском",
    "en": "English description"
  },
  "categories": ["coding-agents"],
  "tags": ["typescript"],
  "featured": false,
  "addedAt": "2026-07-14"
}
```

2. `npm run enrich:github` — подтянуть stars/topics
3. `npm run validate` — проверить схему

## Bulk-import списка repo

```bash
npm run import:repos -- data/seed-repos.json
npm run enrich:github -- --promote-pending
```

Формат `repos.json`:

```json
[{ "repo": "owner/name", "note": "optional curator note" }]
```

## Сравнение

```
/compare?ids=goose,ragflow,deer-flow
```

## Деплой

```bash
npm run build
npx vercel
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run validate` | Проверка tools.json |
| `npm run import:repos -- <file>` | Import repo list → pending.json |
| `npm run enrich:github` | GitHub API enrich |
