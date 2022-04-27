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

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission().then((response) => {
    if (response === 'granted') console.log('notification permission granted!');
  });
}
function isLocalhost() {
  return location.hostname.indexOf('localhost') >= 0;
}
