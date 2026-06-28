# Observatório Brasileiro de Governo Digital

Portal público e interativo de monitoramento da transformação digital no setor público brasileiro. Reúne dados e indicadores estratégicos apresentados de forma acessível para gestores públicos, acadêmicos e cidadãos.

**Parceiros institucionais:** Insper/CGPP · Movimento Brasil Competitivo (MBC) · Ministério da Gestão e Inovação em Serviços Públicos (MGI)

---

## Sobre o projeto

O Observatório Brasileiro de Governo Digital monitora de forma sistemática, transparente e orientada por evidências os avanços e desafios da transformação digital no setor público brasileiro — federal, estadual e municipal.

Está alinhado à **Estratégia Nacional de Governo Digital (ENGD)**, instituída pelo Decreto nº 12.069/2024, e à Portaria SGD/MGI nº 4.248/2024. Os indicadores são compatíveis com padrões internacionais como o E-Government Development Index (EGDI/ONU), o OECD Digital Government Index (nota 0,79 — acima da média da OCDE) e o GovTech Maturity Index (Banco Mundial).

### Os 10 objetivos da ENGD monitorados

| # | Objetivo |
|---|---|
| 1 | Governança do Governo Digital |
| 2 | Qualidade dos Serviços Digitais |
| 3 | Identificação Única |
| 4 | Segurança e LGPD |
| 5 | Dados e Interoperabilidade |
| 6 | Infraestrutura |
| 7 | Inovação e Tecnologias Emergentes |
| 8 | Eficiência e Processos |
| 9 | Transparência e Participação |
| 10 | Competências em Governo Digital |

Cada objetivo recebe um sub-índice de 0 a 100. A média simples dos sub-índices compõe o **Índice OBGD** de cada ente federativo (nacional, estadual ou municipal).

### Fontes de dados

- TIC Governo Eletrônico e TIC Domicílios (CETIC.br)
- Painéis SGD (Secretaria de Governo Digital/MGI)
- ABEP-TIC (estados)
- IBGE Munic e IBGE Estadic
- PNAD Contínua (módulos específicos)

---

## Equipe

**Coordenação:** Prof. Ivar Hartmann (Insper/CGPP) — coordenador inicial; Prof.ª Maria Carolina Foss (Insper, Direito) — coordenadora subsequente.

**Pesquisa e dados:** Suelane Garcia Fontes (Centro de Dados e IA, Insper) · Prof. Rodolfo Avelino (Engenharia, Insper) · pesquisadores com formação em engenharia, direito, jornalismo e ciência da computação.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **UI:** Tailwind CSS v4 + shadcn/ui 
- **Animações:** Framer Motion
- **Linter/Formatter:** Biome
- **Hospedagem inicial:** Insper → migração futura para AWS (MBC)

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Qualidade de código

O projeto usa [Biome](https://biomejs.dev/) para lint, formatação e organização de imports, e [Lefthook](https://lefthook.dev/) para rodar checagens automaticamente no pre-commit.

### Scripts disponíveis

```bash
npm run lint    # verifica lint, formatação e imports em todo o projeto
npm run format  # formata arquivos manualmente (sem lint)
```

### Git hooks (pre-commit)

Após `npm install`, o script `prepare` instala os hooks do Lefthook. Em cada commit, o Biome roda **apenas nos arquivos staged**, aplica correções seguras (`check --write`) e re-adiciona os arquivos corrigidos ao stage.

Se os hooks não estiverem ativos (por exemplo, após clonar o repositório sem rodar `npm install`), execute:

```bash
npx lefthook install
```

Para testar o hook manualmente, sem commitar:

```bash
npx lefthook run pre-commit
```

Se o commit for bloqueado, corrija os erros reportados pelo Biome ou rode `npm run lint` para inspecionar o projeto inteiro.

---

## Roadmap

| Marco | Prazo |
|---|---|
| Primeira versão pública | novembro 2026 |
| Operação completa (ENGD/EFGD) | até dezembro 2027 |
