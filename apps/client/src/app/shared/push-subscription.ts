import { environment } from '../../environments/environment';
import { http } from '../data';

function initializePushSubscription() {
  navigator.serviceWorker.ready.then((swreg) => {
    swreg.pushManager.getSubscription().then((sub) => {
      if (!sub) {
        swreg.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(environment.vapidKey)
          })
          .then((sub) => {
            http.postWithAuth('/subscribe', sub).then((res) => {
              console.log('subscription saved', res);
            });
          });
      }
    });
  });
}
export const PushSubscriptionService = {
  initializePushSubscription
};
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
