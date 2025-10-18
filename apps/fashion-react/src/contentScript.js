// Injects a sidebar container into the page for the React app
(function() {
  if (document.getElementById('fashion-extension-sidebar')) return;
  const sidebar = document.createElement('div');
  sidebar.id = 'fashion-extension-sidebar';
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = '0';
  sidebar.style.width = '380px';
  sidebar.style.height = '100vh';
  sidebar.style.zIndex = '2147483647';
  sidebar.style.boxShadow = '-4px 0 20px rgba(0,0,0,0.15)';
  sidebar.style.display = 'flex';
  sidebar.style.flexDirection = 'column';
  sidebar.style.transition = 'transform 0.3s';
  sidebar.style.transform = 'translateX(0)';
  sidebar.style.fontFamily = 'inherit';
  document.body.appendChild(sidebar);

  // Add root for React app
  const root = document.createElement('div');
  root.id = 'fashion-extension-root';
  root.style.width = '100%';
  root.style.height = '100%';
  sidebar.appendChild(root);

  // Inject sidebar.js (bundled React app)
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('sidebar.js');
  script.type = 'text/javascript';
  script.onload = function() { this.remove(); };
  document.body.appendChild(script);
})();
