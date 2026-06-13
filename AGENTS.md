<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Convenções do Projeto

## Nomenclatura de arquivos
Use **kebab-case** para todos os arquivos de componentes, hooks e utilitários:
- ✅ `hero-slider.tsx`, `stats-counter.tsx`, `app-breadcrumb.tsx`, `navbar.tsx`
- ❌ `HeroSlider.tsx`, `StatsCounter.tsx`, `AppBreadcrumb.tsx`, `Navbar.tsx`

O nome do componente exportado continua em PascalCase; apenas o nome do arquivo usa kebab-case.
