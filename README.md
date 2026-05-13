# Desafio 30 Dias Sem Glúten — Página de Vendas

Página de vendas estática do **Desafio 30 Dias Sem Glúten** da Chef Luciene Marques / Chef GlutenFree.  
Stack: HTML5 · CSS3 (custom properties, clamp, grid) · JavaScript vanilla — zero dependências, carregamento ultrarrápido.

---

## Estrutura de Pastas

```
desafio-30-dias-sem-gluten/
├── index.html                  # Página principal (única)
├── css/
│   └── style.css               # Todos os estilos (~1900 linhas)
├── js/
│   └── main.js                 # Scripts: nav, slider, countdown, lazy load
├── assets/
│   ├── images/
│   │   ├── logo-desafio.png
│   │   ├── chef-luciene.jpg
│   │   ├── receita-1.jpg
│   │   ├── receita-2.jpg
│   │   ├── produto-mix1.jpg
│   │   ├── produto-mix2.jpg
│   │   └── depoimentos/
│   │       ├── dep-1.jpg
│   │       ├── dep-2.jpg
│   │       ├── dep-3.jpg
│   │       └── dep-4.jpg
│   └── icons/
│       └── favicon.ico
├── .gitignore
├── netlify.toml
└── README.md
```

---

## Como Rodar Localmente

### Opção 1 — VS Code Live Server (recomendado)

1. Instale a extensão **Live Server** no VS Code
2. Abra a pasta do projeto no VS Code
3. Clique com botão direito em `index.html` → **Open with Live Server**
4. Acesse `http://127.0.0.1:5500`

### Opção 2 — Python (sem instalação extra)

```bash
# Na pasta do projeto:
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

---

## Como Fazer Deploy no Netlify

### Pré-requisito: repositório no GitHub

Siga os **Comandos Git** da seção abaixo antes de continuar.

### Passo a passo — Netlify → GitHub (deploy automático)

1. Acesse [app.netlify.com](https://app.netlify.com) e faça login com sua conta GitHub
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha **"Deploy with GitHub"**
4. Clique em **"Authorize Netlify"** para permitir acesso aos seus repositórios
5. Selecione o repositório `desafio-30-dias-sem-gluten`
6. Na tela de configuração de build, preencha:
   - **Branch to deploy:** `main`
   - **Base directory:** *(deixe vazio)*
   - **Build command:** *(deixe vazio — site estático sem build)*
   - **Publish directory:** `.`
7. Clique em **"Deploy site"**
8. Em ~30 segundos o site estará no ar com uma URL como `https://nome-aleatorio.netlify.app`

> A partir daí, todo `git push` para `main` aciona um novo deploy automaticamente.

---

## Como Substituir as Imagens Placeholder

Adicione os arquivos reais em `assets/images/` mantendo **exatamente os mesmos nomes de arquivo**:

| Arquivo | Onde aparece | Dimensão recomendada |
|---|---|---|
| `logo-desafio.png` | Header (navbar) | alt. 38px, fundo transparente |
| `chef-luciene.jpg` | Seção Chef | 840 × 1050 px (proporção 4:5) |
| `receita-1.jpg` | Cards Dia 1 e Dia 15 | 800 × 560 px |
| `receita-2.jpg` | Cards Dia 8 e Dia 22 | 800 × 560 px |
| `produto-mix1.jpg` | Seção Mixes — Mix 1 | 680 × 520 px |
| `produto-mix2.jpg` | Seção Mixes — Mix 2 | 680 × 520 px |
| `depoimentos/dep-1.jpg` | Slider — Card 1 | 128 × 128 px (rosto) |
| `depoimentos/dep-2.jpg` | Slider — Card 2 | 128 × 128 px |
| `depoimentos/dep-3.jpg` | Slider — Card 3 | 128 × 128 px |
| `depoimentos/dep-4.jpg` | Slider — Card 4 | 128 × 128 px |

Após substituir as imagens:

```bash
git add assets/
git commit -m "feat: add real product and testimonial images"
git push
```

O Netlify detecta o push e republica em ~30 segundos.

### Atualizar textos dos depoimentos

No `index.html`, busque por `[NOME DA PESSOA` para localizar os 4 cards do slider e substitua:

- `[NOME DA PESSOA X]` → nome real da pessoa
- `[Cidade] — adicionar depois` → cidade real
- `"Depoimento X — adicionar depois"` → texto real do depoimento
- `Ex: Perdeu 4kg em 30 dias` → resultado real obtido

---

## Como Trocar o Link de Pagamento

No `index.html`, localize o botão principal pelo atributo `id="ctaMain"`:

```html
<!-- ANTES -->
<a href="#" class="btn btn--hero oferta__cta" id="ctaMain">

<!-- DEPOIS — substitua pelo seu link de checkout -->
<a href="https://pay.hotmart.com/SEU_PRODUTO" class="btn btn--hero oferta__cta" id="ctaMain">
```

> Os demais botões CTA com `href="#oferta"` apontam para a seção de oferta (comportamento correto) e **não precisam ser alterados**.

### Trocar número do WhatsApp

Busque por `wa.me/5500000000000` no `index.html` — há **2 ocorrências** (botão flutuante + link no FAQ). Substitua pelo número real com DDI:

```html
href="https://wa.me/5511999999999"
```

---

## Como Configurar Domínio Customizado

### No Netlify

1. No painel do site, clique em **"Domain settings"** → **"Add a domain"**
2. Digite seu domínio (ex: `desafio30diassemugluten.com.br`)
3. O Netlify exibe os registros DNS a configurar

### No seu registrador de domínio

Para domínio **apex** (`seudominio.com.br`), adicione registros tipo A:

```
75.2.60.5
99.83.190.102
```

Para o subdomínio `www`, adicione registro CNAME:

```
[nome-do-seu-site].netlify.app
```

Após a propagação DNS (até 24h), o Netlify provisiona o **certificado SSL gratuito** (Let's Encrypt) automaticamente.

---

## Comandos Git — Inicialização do Repositório

Execute no terminal dentro da pasta do projeto:

```bash
# 1. Inicializar repositório Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Commit inicial
git commit -m "feat: initial page setup - Desafio 30 Dias Sem Glúten"

# 4. Renomear branch para main
git branch -M main

# 5. Conectar ao repositório remoto (substitua pela URL do seu repositório)
git remote add origin https://github.com/SEU_USUARIO/desafio-30-dias-sem-gluten.git

# 6. Enviar para o GitHub
git push -u origin main
```

> **Atalho com GitHub CLI** (requer [gh](https://cli.github.com) instalado):
> ```bash
> gh repo create desafio-30-dias-sem-gluten --public --source=. --remote=origin --push
> ```
> Isso cria o repositório no GitHub e já faz o primeiro push em um único comando.

---

## Fluxo de Atualização (após o primeiro deploy)

```bash
# Sempre que fizer uma alteração:
git add .
git commit -m "fix: descrição clara da mudança"
git push
# → Netlify detecta o push e republica em ~30 segundos
```

---

## Checklist — Antes de Lançar

### Conteúdo
- [ ] Substituir todas as imagens placeholder por fotos reais
- [ ] Preencher os 4 depoimentos (nomes, cidades, textos, resultados)
- [ ] Atualizar `href="#"` do botão `#ctaMain` com link do checkout real
- [ ] Atualizar número do WhatsApp (2 lugares: float + FAQ)
- [ ] Confirmar preços: **R$ 497** à vista e **12x R$ 46,44**
- [ ] Confirmar prazo de acesso: **12 meses**
- [ ] Confirmar links sociais: YouTube `@chefglutenfree`, Instagram `@chef.glutenfree`, Telegram `@trintadiassemgluten`

### Técnico
- [ ] Testar em mobile (Chrome DevTools → modo responsivo)
- [ ] Testar em Safari iOS
- [ ] Verificar countdown timer: persiste ao recarregar, conta regressiva real
- [ ] Testar slider de depoimentos: swipe, setas, dots, autoplay
- [ ] Testar FAQ accordion: abre/fecha, fecha outros ao abrir
- [ ] Verificar botão "Voltar ao topo" aparece após scroll
- [ ] Adicionar favicon real em `assets/icons/favicon.ico`

### SEO / Compartilhamento
- [ ] Adicionar tags Open Graph no `<head>` (`og:title`, `og:description`, `og:image`)
- [ ] Criar imagem de compartilhamento social (1200 × 630 px)

### Legal (obrigatório LGPD)
- [ ] Criar e publicar Política de Privacidade
- [ ] Criar e publicar Termos de Uso
- [ ] Linkar as páginas nos rodapés (substituir `href="#"` dos links legais)

### Analytics
- [ ] Adicionar Google Analytics 4 ou Plausible antes do `</head>`
- [ ] Configurar evento de conversão no clique do botão `#ctaMain`
- [ ] Adicionar pixel do Facebook/Meta (se usar tráfego pago)

---

*Desenvolvido com HTML5, CSS3 e JavaScript vanilla — zero dependências, sem frameworks.*
