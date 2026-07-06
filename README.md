# Site de Memórias — Guia Rápido

Este site foi feito para reunir memórias de um jeito bonito e pessoal.
Você só precisa editar alguns textos e trocar arquivos de imagem/áudio —
tudo já está conectado.

## Estrutura

```
index.html              -> página inicial (pede o nome)
css/style.css            -> estilo da página inicial
js/script.js              -> partículas + detecção de nome + transição
js/common.js               -> funções compartilhadas (lightbox, player, scroll)
css/common.css              -> estilo compartilhado dos componentes

pages/
  maria.html            -> tema gótico feliz
  gabriel.html          -> tema moody/minimalista
  yasmin.html           -> tema vintage academia
  ana.html              -> tema romântico
  nao-encontrado.html   -> página exibida se o nome não corresponder
  css/*.css             -> estilo (cores e tipografia) de cada tema
  js/*.js                -> efeito visual exclusivo de cada página

assets/
  images/               -> coloque hero.jpg, foto1.jpg, foto2.jpg, foto3.jpg, foto4.jpg
  music/                -> coloque musica.mp3
```

## Como editar os textos

Abra o arquivo `.html` da pessoa dentro de `pages/` e procure pelos
comentários em maiúsculas, por exemplo:

```html
<!-- TEXTO PRINCIPAL -->
<p class="...">Escreva aqui o texto principal...</p>
```

Basta substituir o texto dentro da tag `<p>` (ou `<h1>`, `<li>` etc.)
logo abaixo do comentário.

## Como adicionar fotos e música

Veja os arquivos `LEIA-ME.txt` dentro de `assets/images/` e
`assets/music/`. Resumindo: os nomes dos arquivos já estão conectados
no HTML — é só colocar os arquivos com o nome certo na pasta certa.

Enquanto isso, o site mostra automaticamente um espaço reservado
elegante (nunca um ícone de imagem quebrada).

## Como testar localmente

Basta abrir `index.html` no navegador. Se preferir rodar um servidor
local (recomendado para o áudio funcionar sem restrições do navegador):

```bash
# na pasta do projeto
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Como o redirecionamento funciona

Na página inicial, quando a pessoa digita o nome, o texto é comparado
(sem diferenciar maiúsculas/minúsculas e sem acentos) com: `maria`,
`gabriel`, `yasmin`, `ana`. Se o nome digitado *contiver* uma dessas
palavras, a pessoa é redirecionada para a página correspondente. Caso
contrário, vê a página "não foi feita para você".

Para adicionar mais pessoas, edite `js/script.js` (array `routes`) e
crie uma nova página em `pages/`.
