function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(() => console.log('SW REGISTERED'));
  }
}
export default register;
