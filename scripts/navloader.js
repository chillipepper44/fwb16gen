fetch('components/nav.html')
  .then(res => res.text())
  .then(html => {
    const navContainer = document.getElementById('side-nav-placeholder');
    if (navContainer) navContainer.innerHTML = html;
  });
