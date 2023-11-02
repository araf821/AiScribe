import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aixscribe.firebaseapp.com",
  projectId: "aixscribe",
  storageBucket: "aixscribe.appspot.com",
  messagingSenderId: "814322826349",
  appId: "1:814322826349:web:fb6f710268236f79a4d364",
  measurementId: "G-ZKKJLM26ZR",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToFirebase(imageUrl: string, name: String) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const fileName = name.replace(" ", "") + Date.now() + ".jpeg";
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });

    const firebaseUrl = await getDownloadURL(storageRef);
    return firebaseUrl;
  } catch (error) {
    console.log("ERROR UPLOADING TO FIREBASE", error);
  }
}
