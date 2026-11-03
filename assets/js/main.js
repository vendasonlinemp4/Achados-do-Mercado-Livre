/* ============================================================
   ACHADOS DO MERCADO LIVRE — comportamento do site
   ============================================================ */

(function () {
  "use strict";

  const produtos = window.PRODUTOS || [];
  const categorias = window.CATEGORIAS || [];
  const site = window.SITE || {};

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const fmtBRL = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  const esc = (str) =>
    String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const semAcento = (str) =>
    String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const PLACEHOLDER = "assets/img/placeholder.svg";

  const desconto = (p) => {
    if (!p.precoDe || p.precoDe <= p.preco) return 0;
    return Math.floor((1 - p.preco / p.precoDe) * 100);
  };

  const nomeCategoria = (id) => {
    const cat = categorias.find((c) => c.id === id);
    return cat ? cat.nome : id;
  };

  /* ------------------------------------------------------------
     Filtros
     ------------------------------------------------------------ */
  function renderFiltros() {
    const wrap = $("#filters");
    if (!wrap) return;

    wrap.innerHTML = categorias
      .map((cat) => {
        const total =
          cat.id === "todos"
            ? produtos.length
            : produtos.filter((p) => p.categoria === cat.id).length;
        return `<button class="filter${cat.id === "todos" ? " is-active" : ""}"
                  data-cat="${esc(cat.id)}" role="tab"
                  aria-selected="${cat.id === "todos"}">
                  ${esc(cat.nome)}<small>${total}</small>
                </button>`;
      })
      .join("");

    $$(".filter", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter", wrap).forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        renderProdutos(btn.dataset.cat);
      });
    });
  }

  /* ------------------------------------------------------------
     Cartões de produto
     ------------------------------------------------------------ */
  function cardHTML(p, index) {
    const off = desconto(p);
    const selo = p.selo
      ? `<span class="card-selo${/vendido|preço|preco/i.test(p.selo) ? " card-selo--hot" : ""}">${esc(p.selo)}</span>`
      : "";

    const precoAntigo = p.precoDe
      ? `<span class="price-old">${fmtBRL(p.precoDe)}</span>`
      : "";

    return `
      <article class="card" style="animation-delay:${Math.min(index * 70, 420)}ms">
        <div class="card-media">
          ${selo}
          <img src="${esc(p.imagem || PLACEHOLDER)}"
               alt="${esc(p.nome)}"
               loading="lazy" decoding="async"
               data-zoom="1"
               data-title="${esc(p.nome)}"
               onerror="this.onerror=null;this.src='${PLACEHOLDER}';this.style.opacity='.75'" />
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="card-brand">${esc(p.marca || "")}</span>
            <span class="card-cat">${esc(nomeCategoria(p.categoria))}</span>
          </div>
          <h3 class="card-title">${esc(p.nome)}</h3>
          <p class="card-desc">${esc(p.descricao || "")}</p>

          <div class="card-price">
            <div>
              <span class="price-label">A partir de</span>
              <span class="price-value">
                ${fmtBRL(p.preco)}
                ${precoAntigo}
                ${p.condicao ? `<span class="price-cond">${esc(p.condicao)}</span>` : ""}
              </span>
              ${p.extra ? `<span class="price-extra">${esc(p.extra)}</span>` : ""}
            </div>
            ${off > 0 ? `<span class="card-off">−${off}%</span>` : ""}
          </div>

          <a class="card-cta" href="${esc(p.link)}" target="_blank"
             rel="nofollow sponsored noopener" data-produto="${esc(p.nome)}">
            Ver oferta no Mercado Livre
            <span class="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </article>`;
  }

  function renderProdutos(cat) {
    const grid = $("#grid");
    if (!grid) return;

    const lista = (cat && cat !== "todos")
      ? produtos.filter((p) => p.categoria === cat)
      : produtos.slice();

    grid.innerHTML = lista.map(cardHTML).join("");
    ligarZoom();
  }

  /* ------------------------------------------------------------
     Lightbox (ampliar foto)
     ------------------------------------------------------------ */
  function ligarZoom() {
    const dlg = $("#lightbox");
    if (!dlg) return;

    $$("[data-zoom]").forEach((img) => {
      img.addEventListener("click", () => {
        $("#lightboxImg").src = img.currentSrc || img.src;
        $("#lightboxImg").alt = img.alt;
        $("#lightboxCaption").textContent = img.dataset.title || img.alt;
        if (typeof dlg.showModal === "function") dlg.showModal();
      });
    });
  }

  function initLightbox() {
    const dlg = $("#lightbox");
    if (!dlg) return;

    const fechar = () => dlg.close();
    $("#lightboxClose").addEventListener("click", fechar);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) fechar();
    });
  }

  /* ------------------------------------------------------------
     Header + menu mobile + revelações
     ------------------------------------------------------------ */
  function initHeader() {
    const header = $("#header");
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("#navToggle");
    const nav = $("#nav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const aberto = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
        toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
      });
      $$("a", nav).forEach((a) =>
        a.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }
  }

  function initReveal() {
    const alvos = $$(".reveal");
    if (!alvos.length) return;

    if (!("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );

    alvos.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------
     Dados dinâmicos (contadores, data, SEO)
     ------------------------------------------------------------ */
  function initDados() {
    const statTotal = $("#statTotal");
    if (statTotal) statTotal.textContent = String(produtos.length);

    const updated = $("#updatedAt");
    if (updated && site.atualizadoEm) updated.textContent = site.atualizadoEm;

    const ano = $("#year");
    if (ano) ano.textContent = String(new Date().getFullYear());

    // Instagram (só aparece se estiver configurado em products.js)
    if (site.instagram) {
      const nav = $("#nav");
      if (nav) {
        const a = document.createElement("a");
        a.href = site.instagram;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "Instagram";
        nav.insertBefore(a, nav.querySelector(".nav-cta"));
      }
    }

    // Dados estruturados para busca (JSON-LD)
    const ld = document.getElementById("structured-data");
    if (ld) {
      const itemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: site.nome || "Achados do Mercado Livre",
        numberOfItems: produtos.length,
        itemListElement: produtos.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.nome,
            description: p.descricao,
            image: p.imagem,
            brand: { "@type": "Brand", name: p.marca || "" },
            offers: {
              "@type": "Offer",
              price: p.preco.toFixed(2),
              priceCurrency: "BRL",
              url: p.link,
              availability: "https://schema.org/InStock"
            }
          }
        }))
      };
      ld.textContent = JSON.stringify(itemList);
    }
  }

  /* ------------------------------------------------------------
     Inicialização
     ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderFiltros();
    renderProdutos("todos");
    initLightbox();
    initHeader();
    initReveal();
    initDados();
  });
})();
