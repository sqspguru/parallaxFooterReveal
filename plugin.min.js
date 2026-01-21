function parallaxFooter({ disableMobileParallax = true } = {}) {
  const footer = document.getElementById('footer-sections');
  const page = document.getElementById('page');
  if (!footer || !page) return;

  const PARALLAX_CLASS = 'footer-parallax-active';
  const MOBILE_BREAKPOINT = 768;
  let currentOffset = 0;
  let footerHeight = footer.offsetHeight;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function updateLayout() {
    footerHeight = footer.offsetHeight;
    if (disableMobileParallax && isMobile()) {
      document.body.classList.remove(PARALLAX_CLASS);
      page.style.marginBottom = footerHeight + 'px';
      footer.style.transform = 'unset';
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
      footer.style.left = '0';
      footer.style.width = '100%';
      return false;
    } else {
      document.body.classList.add(PARALLAX_CLASS);
      page.style.marginBottom = Math.ceil(footerHeight - currentOffset) + 'px';
      footer.style.position = 'fixed';
      footer.style.bottom = '0';
      footer.style.left = '0';
      footer.style.width = '100%';
      return true;
    }
  }

  function updateParallax() {
    if (!document.body.classList.contains(PARALLAX_CLASS)) return;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const distanceFromBottom = docHeight - windowHeight - scrollY;
    const progress = Math.min(Math.max(1 - distanceFromBottom / footerHeight, 0), 1);
    const multiplier = 0.4;
    const targetOffset = footerHeight * multiplier * (1 - progress);
    currentOffset += (targetOffset - currentOffset) * 0.1;
    footer.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
    page.style.marginBottom = Math.ceil(footerHeight - currentOffset) + 'px';
  }

  function onScroll() {
    if (disableMobileParallax && isMobile()) return;
    window.requestAnimationFrame(updateParallax);
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', () => {
    updateLayout();
    updateParallax();
  });

  updateLayout();
  updateParallax();
}
