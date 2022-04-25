/* eslint-disable no-restricted-globals */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'reflect-metadata';
import App from './app/app';
import { store } from './app/store/store';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
const notificationButton = document.createElement('button');
notificationButton.classList.add('notification-button');
notificationButton.innerHTML = 'Enable Notifications';
document.body.appendChild(notificationButton);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((swreg) => {
    console.log('SW REGISTERED');
  });
}
const button = document.querySelector('.notification-button');
if ('Notification' in window && Notification.permission !== 'granted') {
  button?.addEventListener('click', () => {
    Notification.requestPermission().then((response) => {
      if (response === 'granted') button.remove();
    });
    button.remove();
  });
} else {
  button?.remove();
}
function isLocalhost() {
  return location.hostname.indexOf('localhost') >= 0;
}
