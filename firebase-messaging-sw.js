// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyByZP2nx1eXgNVNdZnQSmQOX61YZ3Rwft0",
  authDomain: "studentverse-975d1.firebaseapp.com",
  projectId: "studentverse-975d1",
  storageBucket: "studentverse-975d1.firebasestorage.app",
  messagingSenderId: "1091332338004",
  appId: "1:1091332338004:web:49289c553a2d1ff61d98c1",
  measurementId: "G-NJW7J0F39L"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.data?.title || payload.notification?.title || 'StudentVerse Notification';
  const notificationOptions = {
    body: payload.data?.body || payload.notification?.body || 'You have a new message.',
    icon: '/student_verse/pwa-icon.png',
    data: {
      url: payload.data?.url || '/'
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Click event for notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
