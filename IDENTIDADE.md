# Identidade visual — como trocar a pele do site

Este arquivo é o contrato entre a estrutura (que não muda) e a identidade
(que muda). Se você está implementando uma direção visual, leia isto antes
de tocar em qualquer componente.

## Regra número um

**Nenhum componente escolhe cor, raio ou família de fonte.** Todos consomem
tokens semânticos. Se você precisou escrever um hex dentro de um `.tsx`,
parou no lugar errado: o valor pertence a `app/globals.css`.

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Valores da paleta, raios, sombras | bloco `@theme` em `app/globals.css` |
| Variáveis de pele (painel, grão, brilho de cursor) | bloco `:root` em `app/globals.css` |
| Famílias de fonte carregadas | `app/layout.tsx` (`next/font`) |
| Utilitários de superfície (`.panel`, `.bg-hero`, `.label-meta`) | `app/globals.css` |

## Os papéis da paleta

Cada token é um PAPEL, não uma cor. O contrato de contraste (mínimo AA,
4.5:1) está embutido no nome:

- `surface` / `surface-2` / `surface-3` / `surface-inset` — fundos. Sempre
  com texto `ink`.
- `inverse` / `inverse-2` — o bloco de contraste (hoje a seção "O Problema",
  o rodapé e o CTA final). Texto em cima: `on-inverse`.
- `ink` / `ink-2` / `ink-soft` — texto sobre `surface`.
- `line` / `line-strong` — fios, bordas, réguas.
- `accent` — **superfície** de acento; carrega texto `ink`.
- `accent-deep` — **texto e preenchimento** de acento; carrega `on-accent`.
- `accent-soft` — tinta decorativa. Nunca carrega texto.
- `support` / `support-deep` — o acento de apoio; carrega `on-support`.
- `signal` / `signal-deep` — prazos, urgência, contagem; carrega `on-signal`.
- `danger` — erro de formulário.

Trocar a identidade = trocar os VALORES desses tokens. O nome permanece.

## Tipografia: no máximo três slots

- `--font-display` — títulos.
- `--font-body` — leitura.
- `--font-mono` — **só dado**: data, prazo, contador, cidade. É o terceiro
  slot e só se justifica por ser funcional.

`--font-editorial` e `--font-script` são resquícios da identidade anterior.
Cada direção decide se algum deles sobrevive — mas o teto continua sendo
duas vozes + a mono funcional. Se sua direção não usa um deles, remova o
import correspondente em `app/layout.tsx`.

## Forma

`--radius-card` (cartões), `--radius-panel` (painéis), `--radius-control`
(botões), `--radius-input`, `--radius-tag` / `--radius-pill`. As classes
correspondentes são `rounded-card`, `rounded-panel`, etc. Uma direção que
quer cantos retos zera os valores; nenhum componente precisa saber.

## Variáveis de pele (`:root`)

- `--panel-bg`, `--panel-border`, `--panel-filter`, `--panel-glow-bg` —
  definem o que `.panel` é: vidro fosco, papel chapado ou painel de borda.
- `--grain-opacity`, `--grain-blend` — a textura de fundo. `0` desliga.
- `--cursor-glow-color`, `--cursor-glow-blend` — o brilho que segue o
  cursor. `transparent` desliga o efeito.

## Proibições desta rodada

1. **Nenhum gradiente suave de fundo.** Sem mesh, sem orbs desfocados, sem
   overlay radial. Fundos são chapados; a textura vem do grão.
2. A badge do herói e o ícone de sparkle da seção "A Solução" saíram e não
   voltam.
3. Não alterar copy, dados, estrutura de seções ou funcionalidade.

## O painel de prazos

`components/home/season-panel.tsx` é o objeto central do herói. Ele resolve
dado, ordem, acessibilidade e pendência; **a pele vem de fora**, por
`classNames` (cada parte é um slot nomeado) ou, quando a direção quer um
layout completamente diferente, por `renderRow` / `renderHeader` /
`renderFooter`.

### ⚠️ Datas são dado pendente

`lib/companies.ts` **não tem campo de data**. O que existe é `status`
("aberta" | "em-breve"), o texto livre `opensWhen` e `duration`. Por isso
`SeasonEntry.window` é sempre `null` hoje, e o painel mostra o texto da
própria empresa ou o marcador "Data a confirmar".

**Não invente prazos.** Quando `Company` ganhar `applicationOpens` /
`applicationCloses`, basta preencher `window` em `lib/season.ts` — o painel
passa a exibir as datas sozinho, e `seasonHasDates` vira `true`, o que
esconde o rodapé de pendência automaticamente.

## Acessibilidade — inegociável

- Contraste AA (4.5:1 texto normal, 3:1 texto grande) em toda combinação nova.
- Foco visível: use `.focus-ring` em tudo que é interativo.
- `prefers-reduced-motion` respeitado (já tratado em `globals.css` e em
  `lib/motion.ts`; não introduza animação que escape disso).
- Mobile-first: o site tem que funcionar a partir de ~360px de largura.
