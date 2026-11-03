# Achados do Mercado Livre

Site de vitrine (link na bio do Instagram) com a curadoria de produtos do Mercado Livre.
Design editorial escuro com detalhes em ouro, 100% estático — sem servidor, sem banco de dados,
sem custo de hospedagem.

---

## 1. Como publicar (link para colocar no Instagram)

O jeito mais rápido é o **GitHub Pages**, que já vem pronto neste repositório:

1. Abra o repositório no GitHub → **Settings** → **Pages**.
2. Em *Build and deployment* → **Source: Deploy from a branch**.
3. Escolha a branch **`main`** e a pasta **`/ (root)`** → **Save**.
4. Em 1–2 minutos o link fica no ar:
   `https://vendasonlinemp4.github.io/Achados-do-Mercado-Livre/`

Esse é o link que você cola no Instagram (bio, stories, link da descrição dos vídeos).

> Sempre que um produto novo for adicionado, o site atualiza sozinho no mesmo link — não precisa
> criar um link novo.

---

## 2. Como adicionar um produto novo

Abra o arquivo **`assets/js/products.js`** e cole um bloco dentro da lista `PRODUTOS`:

```js
{
  id: "nome-curto-sem-espacos",          // identificador único
  nome: "Nome do produto",                // aparece grande no cartão
  descricao: "Uma ou duas frases com os detalhes principais.",
  categoria: "cordas",                    // "cordas" | "notebooks"
  marca: "Giannini",
  imagem: "https://http2.mlstatic.com/....webp",
  preco: 19.40,                           // número, com ponto (não use milhar)
  precoDe: 25.74,                         // preço riscado (opcional)
  condicao: "no Pix",                     // opcional: "no Pix" | "à vista" | ""
  extra: "ou R$ 21,09 em outros meios",   // opcional
  selo: "Mais vendido",                   // ou "Melhor preço", "Novidade" ou null
  link: "https://meli.la/SEU_LINK"        // seu link de afiliado
}
```

Pronto. O desconto (`−25%`), o preço formatado em reais e o filtro por categoria são calculados
automaticamente.

### Criando uma categoria nova

Em `CATEGORIAS` (mesmo arquivo), adicione:

```js
{ id: "perifericos", nome: "Periféricos" }
```

A aba nova aparece sozinha no site.

### Outros ajustes rápidos

No fim do mesmo arquivo, em `SITE`:

```js
const SITE = {
  nome: "Achados do Mercado Livre",
  instagram: "https://instagram.com/seuperfil", // aparece no menu
  atualizadoEm: "03/11/2026"                    // data mostrada abaixo da grade
};
```

---

## 3. Estrutura do projeto

```
index.html                 → página única (hero, ofertas, curadoria, como funciona, rodapé)
assets/
  css/styles.css           → todo o visual (tema escuro + ouro)
  js/products.js           → ★ catálogo de produtos (é aqui que você edita)
  js/main.js               → renderização, filtros, zoom da foto, animações
  img/favicon.svg          → ícone da aba
  img/placeholder.svg      → imagem de reserva caso uma foto não carregue
.nojekyll                  → evita processamento do Jekyll no GitHub Pages
```

Para testar na sua máquina: abra o `index.html` no navegador ou rode
`python3 -m http.server 8000` na pasta do projeto e acesse `http://localhost:8000`.

---

## 4. Sobre as fotos

As imagens são carregadas direto do servidor do Mercado Livre (os mesmos arquivos da página do
produto). Se um dia alguma foto sair do ar, o site mostra automaticamente a imagem de reserva —
nesse caso é só atualizar o campo `imagem` do produto.

Se quiser, dá para guardar as fotos dentro de `assets/img/` e usar caminhos locais
(ex.: `assets/img/giannini.jpg`): o site funciona igual e as fotos nunca quebram.

---

## 5. Aviso importante

O site já traz no rodapé o aviso de **Programa de Afiliados do Mercado Livre** e a informação de
que preços e disponibilidade podem mudar. Mantenha esse texto — ele é exigido pelas boas práticas
de divulgação de links de afiliado.
