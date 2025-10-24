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
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M12 4l-7 7h4v6h6v-6h4z"/>
    </svg>
  `;

  // Estilos inline de fallback para garantir posição/tamanho mesmo se o CSS não carregar
  const baseStyle = [
    'position:fixed',
    'right:16px',
    'bottom:16px',
    'width:42px',
    'height:42px',
    'border-radius:50%','display:flex','align-items:center','justify-content:center',
    'background:#388e3c','color:#fff','border:2px solid #a5d6a7',
    'box-shadow:0 4px 12px rgba(0,0,0,0.25)',
    'z-index:1040',
    'opacity:0','transform:translateY(8px) scale(0.96)',
    'transition:opacity .35s cubic-bezier(0.22,1,0.36,1),transform .35s cubic-bezier(0.22,1,0.36,1),background .2s ease',
    'pointer-events:none',
    'cursor:pointer'
  ].join(';');
  btn.style.cssText = baseStyle;

  function applySizing() {
    const isMobile = window.matchMedia('(max-width: 576px)').matches;
    const size = isMobile ? 40 : 42;
    const icon = isMobile ? 19 : 20;
    btn.style.width = size + 'px';
    btn.style.height = size + 'px';
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', String(icon));
      svg.setAttribute('height', String(icon));
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(btn);
    applySizing();
    // Avalia visibilidade inicial após montar o botão
    onScroll();
  });

  // Mostra/esconde o botão conforme rolagem
  const getThreshold = () => (window.matchMedia('(max-width: 576px)').matches ? 120 : 300);
  let threshold = getThreshold(); // px
  const onScroll = () => {
    if (window.scrollY > threshold) {
      btn.classList.add('show');
      // Fallback inline se o CSS não aplicar .show
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.classList.remove('show');
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(8px) scale(0.96)';
      btn.style.pointerEvents = 'none';
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
    applySizing();
    onScroll();
  });
  window.addEventListener('orientationchange', () => {
    threshold = getThreshold();
    applySizing();
    onScroll();
  });

  // Clique para subir suavemente
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
