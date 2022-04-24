function playAudio() {
  const audio = new Audio('../../assets/notification.mp3');
  audio.play().catch(() => {
    console.log('failed to play');
  });
}
export const NotificationService = {
  playAudio
};
