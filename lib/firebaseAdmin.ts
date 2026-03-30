import * as admin from 'firebase-admin';

// Initialize only if we have the environment variables, to prevent build-time crashes
if (!admin.apps.length && process.env.ADMIN_PROJECT_ID) {
  try {
    // Handling cases where private key contains escaped newlines
    let privateKey = process.env.ADMIN_PRIVATE_KEY;
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.ADMIN_PROJECT_ID,
        clientEmail: process.env.ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// Check if app is initialized before instantiating firestore
// In development/build without env vars, this avoids "default Firebase app does not exist" errors
export const adminDb = admin.apps.length > 0 ? admin.firestore() : null as unknown as admin.firestore.Firestore;
