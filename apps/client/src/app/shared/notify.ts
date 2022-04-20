export function notify() {
  const audio = new Audio('../../assets/notification_2.wav');
  audio.play().catch(() => {
    console.log('failed to play');
  });
}
