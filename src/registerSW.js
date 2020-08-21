export default function init() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.pwaInstallPrompt = e;
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          // console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
