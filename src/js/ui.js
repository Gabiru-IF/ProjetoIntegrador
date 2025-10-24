(function preloadBackground() {
  function markReady() {
    document.body.classList.add('bg-ready');
  }

  function getBgUrl() {
    const bg = getComputedStyle(document.body).backgroundImage;
    const match = bg && bg.match(/url\((['\"]?)(.*?)\1\)/i);
    return match ? match[2] : null;
  }

  function waitForBgUrl(maxWait = 1500, interval = 100) {
    return new Promise((resolve) => {
      const start = Date.now();
      const tick = () => {
        const url = getBgUrl();
        if (url || Date.now() - start >= maxWait) {
          resolve(url || null);
        } else {
          setTimeout(tick, interval);
        }
      };
      tick();
    });
  }

  function preload(url, timeoutMs = 4000) {
    return new Promise((resolve) => {
      if (!url) {
        resolve();
        return;
      }
      const img = new Image();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      img.onload = finish;
      img.onerror = finish;
      img.src = url;
      setTimeout(finish, timeoutMs); // fallback
    });
  }

  function start() {
    waitForBgUrl().then((url) => preload(url)).then(markReady);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

(function () {
  // Cria o botão e injeta no body
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Voltar ao topo');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 4l-7 7h4v6h6v-6h4z"/>
    </svg>
  `;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(btn);
    // Avalia visibilidade inicial após montar o botão
    onScroll();
  });

  // Mostra/esconde o botão conforme rolagem
  const getThreshold = () => (window.matchMedia('(max-width: 576px)').matches ? 120 : 300);
  let threshold = getThreshold(); // px
  const onScroll = () => {
    if (window.scrollY > threshold) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };

  // Melhor performance de scroll
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Recalcula o limiar em mudanças de viewport/orientação
  window.addEventListener('resize', () => {
    threshold = getThreshold();
    onScroll();
  });
  window.addEventListener('orientationchange', () => {
    threshold = getThreshold();
    onScroll();
  });

  // Clique para subir suavemente
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
